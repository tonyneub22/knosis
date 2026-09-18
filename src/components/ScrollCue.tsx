import { motion, useReducedMotion } from 'motion/react'

export default function ScrollCue() {
  const reduce = useReducedMotion()
  return (
    <div
      className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 select-none"
      aria-hidden="true"
    >
      <span className="font-body text-[10px] uppercase tracking-[0.35em] text-ivory-dim">
        Scroll
      </span>
      <div className="relative h-12 w-px overflow-hidden bg-ivory/10">
        <motion.span
          className="absolute left-0 top-0 h-6 w-px bg-gradient-to-b from-transparent via-gold to-transparent"
          animate={reduce ? { y: 12, opacity: 0.6 } : { y: [-24, 48], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 }}
        />
      </div>
    </div>
  )
}
