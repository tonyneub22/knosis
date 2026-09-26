import { motion, type Variants } from 'motion/react'
import Logo from './Logo'
import ScrollCue from './ScrollCue'

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.2 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* faint gold vignette behind the group */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 50%, rgba(212,195,154,0.07), transparent 70%)',
        }}
      />

      <motion.div
        variants={group}
        initial="hidden"
        animate="show"
        className="relative flex flex-col items-center"
      >
        <motion.h1
          variants={item}
          className="font-display font-light leading-none text-ivory tracking-[0.3em] pl-[0.3em]"
          style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
        >
          Knosis
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 font-display uppercase text-ivory-dim tracking-[0.28em] pl-[0.28em]"
          style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
        >
          Diagnosis Improvement Tool
        </motion.p>

        <motion.div variants={item} className="mt-14 mb-12">
          <Logo size={88} />
        </motion.div>

        <motion.a
          href="https://www.podocyte-ai.com"
          target="_blank"
          rel="noopener noreferrer"
          variants={item}
          className="font-display text-[0.95rem] text-ivory-dim tracking-[0.18em] pl-[0.18em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-gold/90 hover:[text-shadow:0_0_22px_rgba(212,195,154,0.6)]"
          style={{ textShadow: '0 0 14px rgba(212,195,154,0.25)' }}
        >
          Powered by Podocyte AI
        </motion.a>
      </motion.div>

      <ScrollCue />
    </section>
  )
}
