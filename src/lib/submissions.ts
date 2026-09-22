/**
 * Submissions data-access module.
 *
 * One interface (`SubmissionsStore`), two adapters:
 *  - localStorage — the whole flow works offline.
 *  - Supabase — reads/writes the already-provisioned `submissions` table and
 *    `submissions_public` view. Column access is restricted at the database level (see the
 *    comments in the Supabase section below); this file never selects a column it isn't allowed
 *    to read, and never uses `select('*')` against `submissions`.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { localStore } from './storage'

export type CaseId = 'case-1' | 'case-2'
export type SeverityValue = 1 | 2 | 3 | 4

export const roles = [
  'Physician',
  'Nurse',
  'Billing specialist',
  'Patient advocate',
  'Patient',
  'Researcher',
  'Other',
] as const
export type Role = (typeof roles)[number]

export type Submission = {
  id: string
  /** ISO-8601 timestamp */
  createdAt: string
  /** Which pyramid layer this response belongs to, e.g. "structural-conditions". */
  layer: string
  caseId: CaseId
  severityLevel: SeverityValue
  /**
   * Free-text notes the reader kept while reading the case. Write-only for the Supabase adapter —
   * `submissions_public` does not expose this column, so a value read back from Supabase is
   * always `''`. Never rendered anywhere today, so that placeholder is safe.
   */
  notes: string
  feedback: {
    title: string
    levelDescriptions: string
    actionSteps: string
  }
  respondent: {
    role: Role
    roleOther?: string
    anonymous: boolean
    /**
     * Write-only for the Supabase adapter — `respondent_name` is not in `submissions_public`'s
     * readable column set, so a value read back from Supabase is always `undefined`.
     */
    name?: string
    mayContact: boolean
    /** Write-only for the Supabase adapter — not in `submissions_public`. */
    contactMethod?: string
    coAuthor: boolean
  }
  coverage: {
    familiarity: string
    contacts: string
    pilotSites: string
    /** Write-only for the Supabase adapter — not in `submissions_public`. */
    suggestion: 'unknown' | 'named'
    /** Write-only for the Supabase adapter — not in `submissions_public`. */
    suggestedContact?: string
    canIntroduce: boolean
  }
}

export type SubmissionInput = Omit<Submission, 'id' | 'createdAt'>

export interface SubmissionsStore {
  saveSubmission(input: SubmissionInput): Promise<Submission>
  listSubmissions(): Promise<Submission[]>
  /** Called with the full list whenever it changes. Returns an unsubscribe function. */
  subscribe(callback: (all: Submission[]) => void): () => void
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

/* ------------------------------------------------------------------ */
/* localStorage adapter                                                */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = 'knosis:submissions:v1'

export function createLocalStorageStore(): SubmissionsStore {
  const listeners = new Set<(all: Submission[]) => void>()

  const read = (): Submission[] => {
    const list = localStore.getJSON<Submission[]>(STORAGE_KEY, [])
    return Array.isArray(list) ? list : []
  }

  const emit = () => {
    const all = read()
    listeners.forEach((cb) => cb(all))
  }

  // Cross-tab updates arrive through the `storage` event.
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY || e.key === null) emit()
    })
  }

  return {
    async saveSubmission(input) {
      const record: Submission = { id: makeId(), createdAt: new Date().toISOString(), ...input }
      const next = [...read(), record]
      localStore.setJSON(STORAGE_KEY, next)
      emit()
      return record
    },
    async listSubmissions() {
      return read()
    },
    subscribe(callback) {
      listeners.add(callback)
      return () => {
        listeners.delete(callback)
      }
    },
  }
}

/* ------------------------------------------------------------------ */
/* Supabase adapter                                                    */
/* ------------------------------------------------------------------ */

export type SupabaseConfig = { url: string; anonKey: string }

const SUBMISSIONS_TABLE = 'submissions'
const SUBMISSIONS_VIEW = 'submissions_public'

/** Exact flat shape of a row inserted into `submissions`. Never includes `id`/`created_at`. */
type SubmissionInsertRow = {
  layer: string
  case_id: string
  severity_level: number
  notes: string
  feedback_title: string
  feedback_level_descriptions: string
  feedback_action_steps: string
  role: string
  role_other: string | null
  is_anonymous: boolean
  respondent_name: string | null
  contact_ok: boolean
  contact_method: string | null
  wants_coauthor: boolean
  region_familiarity: string
  region_contacts: string
  region_pilot_site: string
  pilot_contact_known: boolean
  pilot_contact_details: string | null
  can_facilitate_intro: boolean
}

/**
 * Exact readable column set of `submissions_public`. Kept as one explicit list so both the
 * `.select()` call and the row mapper stay in lockstep with what the database actually exposes to
 * the anonymous role.
 */
const READABLE_COLUMNS = [
  'id',
  'created_at',
  'layer',
  'case_id',
  'severity_level',
  'feedback_title',
  'feedback_level_descriptions',
  'feedback_action_steps',
  'role',
  'role_other',
  'is_anonymous',
  'contact_ok',
  'wants_coauthor',
  'can_facilitate_intro',
  'region_familiarity',
  'region_contacts',
  'region_pilot_site',
] as const
const READABLE_COLUMNS_SELECT = READABLE_COLUMNS.join(', ')

type SubmissionPublicRow = {
  id: string
  created_at: string
  layer: string
  case_id: string
  severity_level: number
  feedback_title: string | null
  feedback_level_descriptions: string | null
  feedback_action_steps: string | null
  role: string
  role_other: string | null
  is_anonymous: boolean
  contact_ok: boolean
  wants_coauthor: boolean
  can_facilitate_intro: boolean
  region_familiarity: string | null
  region_contacts: string | null
  region_pilot_site: string | null
}

function toInsertRow(input: SubmissionInput): SubmissionInsertRow {
  return {
    layer: input.layer,
    case_id: input.caseId,
    severity_level: input.severityLevel,
    notes: input.notes,
    feedback_title: input.feedback.title,
    feedback_level_descriptions: input.feedback.levelDescriptions,
    feedback_action_steps: input.feedback.actionSteps,
    role: input.respondent.role,
    role_other: input.respondent.roleOther ?? null,
    is_anonymous: input.respondent.anonymous,
    respondent_name: input.respondent.name ?? null,
    contact_ok: input.respondent.mayContact,
    contact_method: input.respondent.contactMethod ?? null,
    wants_coauthor: input.respondent.coAuthor,
    region_familiarity: input.coverage.familiarity,
    region_contacts: input.coverage.contacts,
    region_pilot_site: input.coverage.pilotSites,
    pilot_contact_known: input.coverage.suggestion === 'named',
    pilot_contact_details: input.coverage.suggestedContact ?? null,
    can_facilitate_intro: input.coverage.canIntroduce,
  }
}

function fromPublicRow(row: SubmissionPublicRow): Submission {
  return {
    id: row.id,
    createdAt: row.created_at,
    layer: row.layer,
    caseId: row.case_id as CaseId,
    severityLevel: row.severity_level as SeverityValue,
    // Not readable via submissions_public — inert placeholder, never rendered.
    notes: '',
    feedback: {
      title: row.feedback_title ?? '',
      levelDescriptions: row.feedback_level_descriptions ?? '',
      actionSteps: row.feedback_action_steps ?? '',
    },
    respondent: {
      role: row.role as Role,
      roleOther: row.role_other ?? undefined,
      anonymous: row.is_anonymous,
      // name/contactMethod are not readable via submissions_public — inert placeholders.
      name: undefined,
      mayContact: row.contact_ok,
      contactMethod: undefined,
      coAuthor: row.wants_coauthor,
    },
    coverage: {
      familiarity: row.region_familiarity ?? '',
      contacts: row.region_contacts ?? '',
      pilotSites: row.region_pilot_site ?? '',
      // Not readable — inert placeholder, never rendered.
      suggestion: 'unknown',
      suggestedContact: undefined,
      canIntroduce: row.can_facilitate_intro,
    },
  }
}

export function createSupabaseStore(config: SupabaseConfig): SubmissionsStore {
  let client: SupabaseClient | null = null
  const getClient = (): SupabaseClient => {
    if (!config.url || !config.anonKey) {
      throw new Error(
        'Supabase is not configured — set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY (or VITE_SUPABASE_ANON_KEY).',
      )
    }
    if (!client) client = createClient(config.url, config.anonKey)
    return client
  }

  async function fetchAll(): Promise<Submission[]> {
    const { data, error } = await getClient()
      .from(SUBMISSIONS_VIEW)
      .select(READABLE_COLUMNS_SELECT)
      .order('created_at', { ascending: false })
    if (error) {
      console.error('[submissions] list failed', error)
      throw new Error('Could not load responses. Please try again.')
    }
    return ((data ?? []) as unknown as SubmissionPublicRow[]).map(fromPublicRow)
  }

  return {
    async saveSubmission(input) {
      const row = toInsertRow(input)
      // No .select() here on purpose: an implicit RETURNING would try to read columns the
      // anonymous role cannot read back (notes, respondent_name, contact_method,
      // pilot_contact_details, pilot_contact_known) and the insert would fail even though the
      // write itself succeeded.
      const { error } = await getClient().from(SUBMISSIONS_TABLE).insert(row)
      if (error) {
        console.error('[submissions] insert failed', error)
        throw new Error('Could not save your response. Please try again.')
      }
      // The real id/created_at are database-generated and unreadable back through this insert;
      // callers today only await success and discard the resolved value, so a locally-synthesized
      // record satisfies the interface without needing a second round-trip.
      return { id: makeId(), createdAt: new Date().toISOString(), ...input }
    },

    async listSubmissions() {
      return fetchAll()
    },

    subscribe(callback) {
      let stopped = false
      let pollTimer: ReturnType<typeof setInterval> | null = null

      const refetch = () => {
        fetchAll()
          .then((all) => {
            if (!stopped) callback(all)
          })
          .catch((e) => {
            // A transient failure on a background refresh shouldn't crash the dashboard; the
            // next realtime event or poll tick will retry.
            console.error('[submissions] background refresh failed', e)
          })
      }

      // Always poll every 30s as a safety net, in addition to realtime. A channel can report
      // SUBSCRIBED (a healthy websocket connection) while never actually receiving change events —
      // e.g. if the table isn't added to the project's realtime publication — with no client-visible
      // error to react to. Polling unconditionally is the only way to guarantee "fall back to
      // polling if realtime isn't available" actually holds in that case, not just on an explicit
      // CHANNEL_ERROR/TIMED_OUT/CLOSED.
      const startPolling = () => {
        if (pollTimer || stopped) return
        pollTimer = setInterval(refetch, 30000)
      }
      startPolling()

      const supabase = getClient()
      // A unique name per subscription — reusing one fixed channel name across multiple
      // subscribe() calls (e.g. React StrictMode's double-invoke in dev, or repeated
      // mount/unmount) makes the realtime client's channels collide and silently drop events.
      const channel = supabase
        .channel(`submissions-changes-${makeId()}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: SUBMISSIONS_TABLE }, () => {
          // Never trust the realtime payload's columns (it may carry restricted or partial data) —
          // always refetch the properly-redacted view instead.
          refetch()
        })
        .subscribe()

      return () => {
        stopped = true
        if (pollTimer) clearInterval(pollTimer)
        channel.unsubscribe()
        supabase.removeChannel(channel)
      }
    },
  }
}

/* ------------------------------------------------------------------ */
/* Active store                                                        */
/* ------------------------------------------------------------------ */

const adapter = import.meta.env.VITE_SUBMISSIONS_ADAPTER as string | undefined

export const store: SubmissionsStore =
  adapter === 'supabase'
    ? createSupabaseStore({
        url: import.meta.env.VITE_SUPABASE_URL ?? '',
        anonKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
      })
    : createLocalStorageStore()
