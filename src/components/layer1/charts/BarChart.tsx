import { motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

export type BarDatum = { label: string; value: number; sublabel?: string }

type Props = {
  data: BarDatum[]
  /** Shared maximum across sibling charts so bars are comparable. */
  max?: number
  ariaLabel: string
  emptyText?: string
}

/** Horizontal bars in the site palette — gold gradient fill on an ivory/8 track. */
export default function BarChart({ data, max, ariaLabel, emptyText = 'No responses yet' }: Props) {
  const top = Math.max(1, max ?? Math.max(...data.map((d) => d.value), 0))
  const total = data.reduce((a, d) => a + d.value, 0)

  return (
    <div role="img" aria-label={ariaLabel} className="flex flex-col gap-4">
      {total === 0 && <p className="font-body text-[12px] text-ivory/35">{emptyText}</p>}
      {data.map((d) => {
        const w = (d.value / top) * 100
        return (
          <div key={d.label} className="grid grid-cols-[minmax(4.5rem,9rem)_1fr_2.5rem] items-center gap-4">
            <div className="min-w-0">
              <span className="block truncate font-body text-[12px] text-ivory/80">{d.label}</span>
              {d.sublabel && <span className="block truncate font-body text-[10px] uppercase tracking-[0.2em] text-ivory/35">{d.sublabel}</span>}
            </div>
            <div className="relative h-[6px] overflow-hidden rounded-full bg-ivory/[0.08]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold/45 to-gold"
                initial={{ width: 0 }}
                animate={{ width: `${w}%`, boxShadow: d.value > 0 ? '0 0 14px rgba(212,195,154,0.45)' : 'none' }}
                transition={{ duration: 0.9, ease }}
              />
            </div>
            <span className="text-right font-display text-[1.15rem] tabular-nums leading-none text-ivory">{d.value}</span>
          </div>
        )
      })}
    </div>
  )
}
