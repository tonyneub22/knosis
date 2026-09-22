/**
 * Submissions data-access module.
 *
 * One interface (`SubmissionsStore`), two adapters:
 *  - localStorage (implemented) — the whole flow works offline today.
 *  - Supabase (stub) — drop in once the project URL and anon key exist.
 *    Do NOT add the @supabase/supabase-js dependency until then.
 */
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
  caseId: CaseId
  severityLevel: SeverityValue
  /** Free-text notes the reader kept while reading the case. */
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
    name?: string
    mayContact: boolean
    contactMethod?: string
    coAuthor: boolean
  }
  coverage: {
    familiarity: string
    contacts: string
    pilotSites: string
    suggestion: 'unknown' | 'named'
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

/* ------------------------------------------------------------------ */
/* localStorage adapter                                                */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = 'knosis:submissions:v1'

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

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
/* Supabase adapter — stub                                             */
/* ------------------------------------------------------------------ */

export type SupabaseConfig = { url: string; anonKey: string; table?: string }

/**
 * TODO(next step): implement with @supabase/supabase-js.
 *  - saveSubmission → insert into `submissions` (jsonb columns for feedback/respondent/coverage)
 *  - listSubmissions → select * order by created_at
 *  - subscribe → channel('submissions').on('postgres_changes', …) plus an initial list
 */
export function createSupabaseStore(_config: SupabaseConfig): SubmissionsStore {
  const notConfigured = () =>
    new Error('Supabase adapter is not implemented yet. Provide the project URL and anon key.')
  return {
    async saveSubmission() {
      throw notConfigured()
    },
    async listSubmissions() {
      throw notConfigured()
    },
    subscribe() {
      return () => {}
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
        anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
      })
    : createLocalStorageStore()
