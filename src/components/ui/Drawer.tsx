import { useEffect, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

type Props = {
  open: boolean
  onClose: () => void
  title?: ReactNode
  eyebrow?: string
  children: ReactNode
  /** Accessible name for the dialog. */
  label: string
}

/**
 * Right-side panel. Closes on X, backdrop click, or Escape. Locks body scroll,
 * moves focus in on open and back to the opener on close.
 */
export default function Drawer({ open, onClose, title, eyebrow, children, label }: Props) {
  const reduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<Element | null>(null)

  useEffect(() => {
    if (!open) return
    openerRef.current = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => closeRef.current?.focus(), 60)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      const opener = openerRef.current
      if (opener instanceof HTMLElement) opener.focus()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" role="presentation">
          <motion.div
            className="absolute inset-0 bg-ink/70 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col border-l border-ivory/[0.08] bg-ink-2 shadow-[-40px_0_80px_rgba(0,0,0,0.45)]"
            initial={reduce ? { opacity: 0 } : { x: '100%' }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.7, ease }}
          >
            {/* specular edge */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-px"
              style={{
                background:
                  'linear-gradient(180deg, rgba(242,237,228,0.06), rgba(242,237,228,0.9) 28%, rgba(212,195,154,0.55) 50%, rgba(242,237,228,0.8) 72%, rgba(242,237,228,0.06))',
              }}
            />
            <div className="flex items-start justify-between gap-6 px-8 pt-8 sm:px-10">
              <div className="min-w-0">
                {eyebrow && (
                  <p className="font-body text-[11px] uppercase tracking-[0.3em] text-gold/80">{eyebrow}</p>
                )}
                {title && (
                  <h2 className="mt-3 font-display text-[1.7rem] font-light leading-tight tracking-[0.03em] text-ivory sm:text-[2rem]">
                    {title}
                  </h2>
                )}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="group -mr-2 -mt-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-transparent text-ivory-dim transition-all duration-500 hover:border-gold/40 hover:text-ivory hover:shadow-[0_0_24px_rgba(212,195,154,0.18)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="scrollbar-thin mt-6 flex-1 overflow-y-auto px-8 pb-12 sm:px-10">{children}</div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
