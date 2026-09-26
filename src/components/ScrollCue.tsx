import { motion, useReducedMotion } from 'motion/react'

export default function ScrollCue() {
  const reduce = useReducedMotion()
  return (
    <a
      href="https://www.podocyte-ai.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 select-none"
    >
      <span
        className="font-body text-[10px] uppercase tracking-[0.35em] text-ivory-dim transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-gold/90 group-hover:[text-shadow:0_0_16px_rgba(212,195,154,0.6)]"
        style={{ textShadow: '0 0 10px rgba(212,195,154,0.2)' }}
      >
        Scroll
      </span>
      <div className="relative h-12 w-px overflow-hidden bg-ivory/10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[filter:drop-shadow(0_0_6px_rgba(212,195,154,0.55))]">
        <motion.span
          className="absolute left-0 top-0 h-6 w-px bg-gradient-to-b from-transparent via-gold to-transparent"
          animate={reduce ? { y: 12, opacity: 0.6 } : { y: [-24, 48], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 }}
        />
      </div>
    </a>
  )
}
