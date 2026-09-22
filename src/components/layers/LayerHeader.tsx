import { motion } from 'motion/react'
import Logo from '../Logo'
import type { LayerMeta } from '../../data/factorTypes'

const ease = [0.22, 1, 0.36, 1] as const

/** Logo · "Level 0N" eyebrow · title (display serif) · subtitle — shared by every layer's overview page. */
export default function LayerHeader({ layer }: { layer: LayerMeta }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease }}
      className="relative flex flex-col items-center text-center"
    >
      <Logo size={56} />
      <span className="mt-12 font-body text-[11px] uppercase tracking-[0.35em] text-gold/70">
        Level {String(layer.number).padStart(2, '0')}
      </span>
      <h1
        className="mt-5 font-display font-light leading-tight tracking-[0.06em] text-ivory"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
      >
        {layer.title}
      </h1>
      <p className="mt-4 max-w-2xl font-display text-lg font-light leading-snug tracking-[0.04em] text-ivory-dim sm:text-xl">
        {layer.subtitle}
      </p>
    </motion.header>
  )
}
