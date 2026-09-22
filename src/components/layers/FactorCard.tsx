import { useState } from 'react'
import { motion } from 'motion/react'
import Card from '../ui/Card'
import type { Factor } from '../../data/factorTypes'

const ease = [0.22, 1, 0.36, 1] as const

type Props = { factor: Factor; index: number; onOpen: (code: string) => void; open: boolean }

export default function FactorCard({ factor, index, onOpen, open }: Props) {
  const [hover, setHover] = useState(false)
  const lit = hover || open

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}>
      <Card
        as="button"
        index={index}
        active={open}
        onClick={() => onOpen(factor.code)}
        ariaLabel={factor.title}
        className="flex h-full w-full flex-col p-8 sm:p-10"
      >
        <span className="font-body text-[11px] uppercase tracking-[0.3em] text-gold/80">Factor {String(index + 1).padStart(2, '0')}</span>
        <motion.span
          initial={false}
          animate={{
            opacity: lit ? 1 : 0.78,
            textShadow: lit ? '0 0 18px rgba(212,195,154,0.45)' : '0 0 0px rgba(212,195,154,0)',
          }}
          transition={{ duration: 0.45, ease }}
          className="mt-4 block font-display text-[1.5rem] font-light leading-tight tracking-[0.03em] text-ivory md:text-[1.7rem]"
        >
          {factor.title}
        </motion.span>
        <span className="mt-5 block font-body text-[14px] font-light leading-relaxed text-ivory-dim">{factor.teaser}</span>
        <span className="mt-8 flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.3em] text-ivory/40 transition-colors duration-500 group-hover:text-gold/80">
          Read the evidence
          <motion.span initial={false} animate={{ x: lit ? 4 : 0, opacity: lit ? 1 : 0.6 }} transition={{ duration: 0.45, ease }}>
            →
          </motion.span>
        </span>
      </Card>
    </div>
  )
}
