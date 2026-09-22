import type { ReactNode } from 'react'
import { motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

type Props = { eyebrow: string; title: string; children?: ReactNode; align?: 'center' | 'left' }

/** Compact page header for the inner Layer 1 pages. */
export default function PageIntro({ eyebrow, title, children, align = 'center' }: Props) {
  const center = align === 'center'
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease }}
      className={`flex flex-col ${center ? 'items-center text-center' : 'items-start text-left'}`}
    >
      <span className="font-body text-[11px] uppercase tracking-[0.35em] text-gold/70">{eyebrow}</span>
      <h1 className="mt-5 font-display font-light leading-tight tracking-[0.05em] text-ivory" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
        {title}
      </h1>
      {children && <div className={`mt-5 max-w-2xl font-body text-[15px] font-light leading-[1.8] text-ivory-dim ${center ? '' : ''}`}>{children}</div>}
    </motion.header>
  )
}
