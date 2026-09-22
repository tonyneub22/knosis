import { motion } from 'motion/react'
import Logo from '../Logo'
import { layer1 } from '../../data/layer1Factors'

const ease = [0.22, 1, 0.36, 1] as const

/** The existing level-page header (Logo · "Level 01" · title), plus the Layer 1 subtitle. */
export default function Layer1Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease }}
      className="relative flex flex-col items-center text-center"
    >
      <Logo size={56} />
      <span className="mt-12 font-body text-[11px] uppercase tracking-[0.35em] text-gold/70">
        Level {String(layer1.number).padStart(2, '0')}
      </span>
      <h1
        className="mt-5 font-display font-light leading-tight tracking-[0.06em] text-ivory"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
      >
        {layer1.title}
      </h1>
      <p className="mt-4 max-w-2xl font-display text-lg font-light leading-snug tracking-[0.04em] text-ivory-dim sm:text-xl">
        {layer1.subtitle}
      </p>
    </motion.header>
  )
}
