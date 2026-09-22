import { motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

type Props = { id: string; label: string; checked: boolean; onChange: (v: boolean) => void; hint?: string }

/** Switch-style toggle. */
export default function Toggle({ id, label, checked, onChange, hint }: Props) {
  return (
    <div className="flex items-start gap-4">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full border transition-all duration-500 ${
          checked
            ? 'border-gold/70 bg-gold/20 shadow-[0_0_18px_rgba(212,195,154,0.25)]'
            : 'border-ivory/20 bg-ivory/[0.04] hover:border-ivory/35'
        }`}
      >
        <motion.span
          aria-hidden="true"
          className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full ${checked ? 'bg-gold' : 'bg-ivory/50'}`}
          initial={false}
          animate={{ left: checked ? 24 : 4 }}
          transition={{ duration: 0.45, ease }}
        />
      </button>
      <label htmlFor={id} className="cursor-pointer select-none">
        <span className="font-body text-[13px] font-light leading-relaxed text-ivory/85">{label}</span>
        {hint && <span className="mt-1 block font-body text-[12px] text-ivory-dim">{hint}</span>}
      </label>
    </div>
  )
}
