import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

type Props = { value: string; onChange: (v: string) => void; caseLabel: string }

/**
 * "Your notes" — a collapsible panel fixed on the right (desktop) and a bottom sheet (mobile).
 * State persists per case via useCaseNotes.
 */
export default function NotesPanel({ value, onChange, caseLabel }: Props) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(true)
  const [sheet, setSheet] = useState(false)

  const textarea = (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="What stands out? What would you have done at each visit?"
      aria-label="Your notes"
      className="field-input h-full min-h-[10rem] flex-1 resize-none rounded-[18px] bg-ivory/[0.025]"
    />
  )

  return (
    <>
      {/* ---------- desktop: right panel ---------- */}
      <div className="fixed bottom-6 right-0 top-24 z-30 hidden lg:block" aria-label="Notes">
        <AnimatePresence initial={false}>
          {open ? (
            <motion.aside
              key="panel"
              initial={reduce ? { opacity: 0 } : { x: 40, opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { x: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { x: 40, opacity: 0 }}
              transition={{ duration: 0.7, ease }}
              className="card-specular mr-6 flex h-full w-[320px] flex-col rounded-[28px] p-6 xl:mr-10"
              data-active="false"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-[11px] uppercase tracking-[0.3em] text-gold/80">Your notes</p>
                  <p className="mt-1 font-body text-[11px] text-ivory/35">{caseLabel} · saved on this device</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Collapse notes"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ivory-dim transition-all duration-500 hover:border hover:border-gold/40 hover:text-ivory"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className="mt-5 flex flex-1 flex-col">{textarea}</div>
            </motion.aside>
          ) : (
            <motion.button
              key="tab"
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.5, ease }}
              aria-label="Open notes"
              className="card-specular absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-3 rounded-l-[20px] rounded-r-none py-5 pl-4 pr-3 text-ivory-dim hover:text-ivory"
            >
              <span className="font-body text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Your notes</span>
              {value.trim() && <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(212,195,154,0.8)]" aria-hidden="true" />}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ---------- mobile: bottom sheet ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <motion.div
          initial={false}
          animate={{ height: sheet ? '58vh' : 56 }}
          transition={{ duration: reduce ? 0 : 0.6, ease }}
          className="mx-auto flex w-full max-w-2xl flex-col overflow-hidden rounded-t-[26px] border border-b-0 border-ivory/[0.12] bg-ink-2 shadow-[0_-30px_60px_rgba(0,0,0,0.5)]"
        >
          <button
            type="button"
            onClick={() => setSheet((s) => !s)}
            aria-expanded={sheet}
            aria-controls="mobile-notes"
            className="flex h-14 shrink-0 items-center justify-between px-6"
          >
            <span className="flex items-center gap-3">
              <span className="font-body text-[11px] uppercase tracking-[0.3em] text-gold/80">Your notes</span>
              {value.trim() && <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(212,195,154,0.8)]" aria-hidden="true" />}
            </span>
            <span className="h-1 w-10 rounded-full bg-ivory/20" aria-hidden="true" />
          </button>
          <div id="mobile-notes" className="flex flex-1 flex-col px-5 pb-6">
            {textarea}
          </div>
        </motion.div>
      </div>
    </>
  )
}
