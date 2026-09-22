import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import BarChart from '../../components/layer1/charts/BarChart'
import Button from '../../components/ui/Button'
import PageIntro from './PageIntro'
import { cases, caseLabel } from '../../content/cases'
import { severityLevels } from '../../data/severityLevels'
import { roles, store, type Submission } from '../../lib/submissions'

const ease = [0.22, 1, 0.36, 1] as const

function Panel({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease }}
      className={`card-specular rounded-[28px] p-7 sm:p-8 ${className}`}
      data-active="false"
    >
      <h2 className="font-body text-[11px] uppercase tracking-[0.3em] text-gold/80">{title}</h2>
      <div className="mt-6">{children}</div>
    </motion.section>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card-specular flex flex-col rounded-[24px] px-6 py-6" data-active="false">
      <span className="font-display text-[2.6rem] font-light leading-none tracking-[0.02em] text-ivory tabular-nums">{value}</span>
      <span className="mt-3 font-body text-[10px] uppercase tracking-[0.28em] text-ivory/45">{label}</span>
    </div>
  )
}

/** Split a free-text "regions" answer into individual mentions and count them. */
function tally(values: string[]): { label: string; value: number }[] {
  const counts = new Map<string, number>()
  for (const v of values) {
    for (const raw of v.split(/[,;\n]+/)) {
      const t = raw.trim().replace(/\s+/g, ' ')
      if (!t) continue
      const key = t.toLowerCase()
      const existing = [...counts.keys()].find((k) => k.toLowerCase() === key)
      counts.set(existing ?? t, (counts.get(existing ?? t) ?? 0) + 1)
    }
  }
  return [...counts.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
}

function RegionList({ items }: { items: { label: string; value: number }[] }) {
  if (items.length === 0) return <p className="font-body text-[12px] text-ivory/35">Nothing mentioned yet</p>
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((r) => (
        <li key={r.label} className="flex items-center gap-2 rounded-full border border-ivory/[0.12] px-3.5 py-1.5 font-body text-[12.5px] font-light text-ivory/85">
          {r.label}
          {r.value > 1 && <span className="font-body text-[10px] tracking-[0.15em] text-gold/80">×{r.value}</span>}
        </li>
      ))}
    </ul>
  )
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}

function roleName(s: Submission) {
  return s.respondent.role === 'Other' && s.respondent.roleOther ? `Other · ${s.respondent.roleOther}` : s.respondent.role
}

export default function Results() {
  const [rows, setRows] = useState<Submission[]>([])
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)

  useEffect(() => {
    let alive = true
    const apply = (all: Submission[]) => {
      if (!alive) return
      setRows([...all].sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
      setUpdatedAt(new Date())
    }
    void store.listSubmissions().then(apply)
    const unsubscribe = store.subscribe(apply)
    return () => {
      alive = false
      unsubscribe()
    }
  }, [])

  const stats = useMemo(() => {
    const perCase = cases.map((c) => ({
      c,
      data: severityLevels.map((l) => ({ label: l.title, value: rows.filter((r) => r.caseId === c.id && r.severityLevel === l.level).length })),
      total: rows.filter((r) => r.caseId === c.id).length,
    }))
    const severityMax = Math.max(1, ...perCase.flatMap((p) => p.data.map((d) => d.value)))
    const roleData = roles.map((r) => ({ label: r, value: rows.filter((s) => s.respondent.role === r).length }))
    return {
      total: rows.length,
      contactable: rows.filter((r) => r.respondent.mayContact).length,
      coAuthor: rows.filter((r) => r.respondent.coAuthor).length,
      canIntroduce: rows.filter((r) => r.coverage.canIntroduce).length,
      perCase,
      severityMax,
      roleData,
      familiarity: tally(rows.map((r) => r.coverage.familiarity)),
      contacts: tally(rows.map((r) => r.coverage.contacts)),
      pilotSites: tally(rows.map((r) => r.coverage.pilotSites)),
    }
  }, [rows])

  const caseName = (id: string) => {
    const c = cases.find((x) => x.id === id)
    return c ? caseLabel(c) : id
  }

  return (
    <main className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-12 sm:pt-20">
      <PageIntro eyebrow="Level 01 · Structural conditions" title="Live results">
        Every response recorded so far. Updates as new perspectives arrive.
        {updatedAt && (
          <span className="mt-3 block font-body text-[10px] uppercase tracking-[0.25em] text-ivory/35">Updated {updatedAt.toLocaleTimeString()}</span>
        )}
      </PageIntro>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        <Stat label="Total responses" value={stats.total} />
        <Stat label="Willing to be contacted" value={stats.contactable} />
        <Stat label="Would co-author" value={stats.coAuthor} />
        <Stat label="Can facilitate an intro" value={stats.canIntroduce} />
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {stats.perCase.map((p) => (
          <Panel key={p.c.id} title={`Severity · ${caseLabel(p.c)}`}>
            <p className="mb-5 font-body text-[12px] text-ivory/45">
              {p.total} {p.total === 1 ? 'response' : 'responses'}
            </p>
            <BarChart data={p.data} max={stats.severityMax} ariaLabel={`Severity level distribution for ${caseLabel(p.c)}`} />
          </Panel>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel title="Role breakdown">
          <BarChart data={stats.roleData} ariaLabel="Responses by role" />
        </Panel>
        <Panel title="Regions mentioned" className="lg:col-span-2">
          <div className="flex flex-col gap-7">
            <div>
              <p className="mb-3 font-body text-[10px] uppercase tracking-[0.25em] text-ivory/45">Familiarity with seeking care</p>
              <RegionList items={stats.familiarity} />
            </div>
            <div>
              <p className="mb-3 font-body text-[10px] uppercase tracking-[0.25em] text-ivory/45">Contacts for contextual details</p>
              <RegionList items={stats.contacts} />
            </div>
            <div>
              <p className="mb-3 font-body text-[10px] uppercase tracking-[0.25em] text-ivory/45">Possible pilot sites</p>
              <RegionList items={stats.pilotSites} />
            </div>
          </div>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel title="Free-text feedback">
          {rows.length === 0 ? (
            <p className="font-body text-[12px] text-ivory/35">No responses yet — complete a case to see feedback here.</p>
          ) : (
            <div className="scrollbar-thin -mx-2 max-h-[34rem] overflow-auto rounded-2xl border border-ivory/[0.08]">
              <table className="w-full min-w-[56rem] border-collapse font-body text-[13px] font-light">
                <thead className="sticky top-0 bg-ink-2">
                  <tr>
                    {['When', 'Case', 'Level', 'Role', 'On the title', 'On the level descriptions', 'On the action steps'].map((h) => (
                      <th key={h} scope="col" className="whitespace-nowrap border-b border-gold/25 px-4 py-3 text-left text-[10px] uppercase tracking-[0.22em] text-gold/85">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="align-top">
                      <td className="whitespace-nowrap border-b border-ivory/[0.08] px-4 py-3 text-ivory/60">{formatTime(r.createdAt)}</td>
                      <td className="min-w-[10rem] border-b border-ivory/[0.08] px-4 py-3 text-ivory">{caseName(r.caseId)}</td>
                      <td className="border-b border-ivory/[0.08] px-4 py-3 font-display text-[1.1rem] text-ivory">{r.severityLevel}</td>
                      <td className="min-w-[8rem] border-b border-ivory/[0.08] px-4 py-3 text-ivory/80">{roleName(r)}</td>
                      <td className="min-w-[14rem] border-b border-ivory/[0.08] px-4 py-3 leading-relaxed text-ivory/80">{r.feedback.title || <span className="text-ivory/30">—</span>}</td>
                      <td className="min-w-[14rem] border-b border-ivory/[0.08] px-4 py-3 leading-relaxed text-ivory/80">{r.feedback.levelDescriptions || <span className="text-ivory/30">—</span>}</td>
                      <td className="min-w-[14rem] border-b border-ivory/[0.08] px-4 py-3 leading-relaxed text-ivory/80">{r.feedback.actionSteps || <span className="text-ivory/30">—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </div>

      <div className="mt-16 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
        <Button to="/structural-conditions" variant="ghost" arrow="left">
          Back to Layer 1
        </Button>
        <Button to="/" variant="ghost" arrow="none">
          Back to Knosis
        </Button>
      </div>
    </main>
  )
}
