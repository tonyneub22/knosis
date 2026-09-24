import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Button from './ui/Button'
import { acknowledgePrivacyNotice, hasAcknowledgedPrivacyNotice } from '../lib/privacyNotice'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * First-visit notice, dismissed and remembered via localStorage (see lib/privacyNotice).
 * Never blocks the page — it can be dismissed at any time and never intercepts input.
 */
export default function PrivacyBanner() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(() => !hasAcknowledgedPrivacyNotice())

  const dismiss = () => {
    acknowledgePrivacyNotice()
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="region"
          aria-label="Privacy notice"
          initial={reduce ? { opacity: 0 } : { y: 40, opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          className="fixed inset-x-0 bottom-0 z-50"
        >
          <div className="relative border-t border-ivory/[0.1] bg-ink-2/95 backdrop-blur-md">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-50"
              style={{
                background:
                  'linear-gradient(90deg, rgba(242,237,228,0.05) 0%, rgba(242,237,228,0.8) 28%, rgba(212,195,154,0.6) 50%, rgba(242,237,228,0.8) 72%, rgba(242,237,228,0.05) 100%)',
              }}
            />
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 py-5 sm:flex-row sm:justify-between sm:gap-8">
              <p className="max-w-2xl text-center font-body text-[13px] font-light leading-relaxed text-ivory-dim sm:text-left">
                Knosis uses your browser's local storage to keep your reading notes on this device. Responses you
                choose to submit are stored securely with our database provider. We don't use advertising or
                tracking.
              </p>
              <div className="flex shrink-0 items-center gap-6">
                <Link
                  to="/privacy"
                  className="font-body text-[11px] uppercase tracking-[0.25em] text-ivory-dim transition-colors duration-500 hover:text-gold"
                >
                  Privacy Policy
                </Link>
                <Button onClick={dismiss} className="!px-6 !py-3" arrow="none">
                  Got it
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
