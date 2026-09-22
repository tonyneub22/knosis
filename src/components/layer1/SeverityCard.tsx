import { motion } from 'motion/react'
import Card from '../ui/Card'
import type { SeverityLevel } from '../../data/severityLevels'

const ease = [0.22, 1, 0.36, 1] as const

type Props = { level: SeverityLevel; selected: boolean; onSelect: () => void; index: number }

export default function SeverityCard({ level, selected, onSelect, index }: Props) {
  return (
    <Card as="button" index={index} active={selected} onClick={onSelect} ariaPressed={selected} className="flex h-full w-full flex-col p-8 sm:p-9">
      <span className="flex items-center justify-between">
        <motion.span
          initial={false}
          animate={{ textShadow: selected ? '0 0 18px rgba(212,195,154,0.45)' : '0 0 0px rgba(212,195,154,0)', opacity: selected ? 1 : 0.85 }}
          transition={{ duration: 0.45, ease }}
          className="font-display text-[1.9rem] font-light leading-none tracking-[0.04em] text-ivory"
        >
          {level.title}
        </motion.span>
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{
            borderColor: selected ? 'rgba(212,195,154,0.9)' : 'rgba(242,237,228,0.2)',
            backgroundColor: selected ? 'rgba(212,195,154,0.18)' : 'rgba(242,237,228,0)',
            boxShadow: selected ? '0 0 18px rgba(212,195,154,0.5)' : '0 0 0px rgba(212,195,154,0)',
          }}
          transition={{ duration: 0.45, ease }}
          className="flex h-6 w-6 items-center justify-center rounded-full border"
        >
          <motion.span initial={false} animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }} transition={{ duration: 0.4, ease }} className="h-2 w-2 rounded-full bg-gold" />
        </motion.span>
      </span>
      <span className="mt-6 block font-body text-[11px] uppercase tracking-[0.28em] text-gold/75">{level.prompt}</span>
      <ul className="mt-4 flex flex-col gap-3">
        {level.bullets.map((b) => (
          <li key={b} className="flex gap-3 font-body text-[14px] font-light leading-relaxed text-ivory/80">
            <span aria-hidden="true" className="mt-[0.8em] block h-px w-3 shrink-0 bg-gold/60" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
