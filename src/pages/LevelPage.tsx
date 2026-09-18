import { motion } from 'motion/react'
import { Link } from 'react-router'
import { levels, type Level } from '../data/levels'
import Logo from '../components/Logo'

const ease = [0.22, 1, 0.36, 1] as const

export default function LevelPage({ level }: { level: Level }) {
  const index = levels.findIndex((l) => l.id === level.id)

  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 40% at 50% 45%, rgba(212,195,154,0.06), transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease }}
        className="relative flex flex-col items-center"
      >
        <Logo size={56} />

        <span className="mt-12 font-body text-[11px] uppercase tracking-[0.35em] text-gold/70">
          Level {String(index + 1).padStart(2, '0')}
        </span>

        <h1
          className="mt-5 font-display font-light leading-tight tracking-[0.06em] text-ivory"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          {level.title}
        </h1>

        {level.subtitle && (
          <p className="mt-3 font-display text-lg text-ivory-dim tracking-[0.05em]">
            {level.subtitle}
          </p>
        )}

        <p className="mt-8 font-body text-[15px] font-light tracking-wide text-ivory-dim">
          Content coming soon
        </p>

        <Link
          to="/"
          className="group mt-16 font-body text-[11px] uppercase tracking-[0.3em] text-ivory-dim transition-colors duration-500 hover:text-ivory"
        >
          <span className="mr-3 inline-block transition-transform duration-500 group-hover:-translate-x-1">
            ←
          </span>
          Back to home
          <span className="mt-2 block h-px w-full origin-left scale-x-0 bg-gold/70 transition-transform duration-500 group-hover:scale-x-100" />
        </Link>
      </motion.div>
    </main>
  )
}
