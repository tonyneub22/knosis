import { useState, type RefObject } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'

type Props = { target: RefObject<HTMLElement | null> }

/**
 * Reading progress for the case. Desktop: thin vertical bar fixed on the far left that
 * fills top-to-bottom, with a small percentage. Mobile: thin bar across the top.
 */
export default function ReadingProgress({ target }: Props) {
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end end'] })
  const [pct, setPct] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setPct(Math.round(Math.min(1, Math.max(0, v)) * 100)))

  return (
    <>
      {/* desktop: vertical */}
      <div className="pointer-events-none fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex xl:left-10" aria-hidden="true">
        <div className="relative h-[52vh] w-px overflow-hidden bg-ivory/10">
          <motion.div
            className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-gold/40 via-gold to-gold"
            style={{ scaleY: scrollYProgress, height: '100%' }}
          />
          <motion.div
            className="absolute left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-md"
            style={{ top: `${pct}%` }}
          />
        </div>
        <span className="font-body text-[10px] tabular-nums tracking-[0.25em] text-ivory/50">{String(pct).padStart(2, '0')}%</span>
      </div>
      {/* mobile: horizontal */}
      <div className="fixed inset-x-0 top-0 z-40 h-[2px] bg-ivory/10 lg:hidden" aria-hidden="true">
        <motion.div className="h-full origin-left bg-gradient-to-r from-gold/50 to-gold" style={{ scaleX: scrollYProgress }} />
      </div>
      <span className="sr-only" aria-live="polite">
        {pct}% read
      </span>
    </>
  )
}
