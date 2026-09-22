import { motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

type Props = { id: string; label: string; checked: boolean; onChange: (v: boolean) => void }

export default function Checkbox({ id, label, checked, onChange }: Props) {
  return (
    <label htmlFor={id} className="group flex cursor-pointer select-none items-start gap-4">
      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer absolute inset-0 cursor-pointer opacity-0"
        />
        <span
          aria-hidden="true"
          className={`h-5 w-5 rounded-[6px] border transition-all duration-500 peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold/70 ${
            checked
              ? 'border-gold/80 bg-gold/15 shadow-[0_0_16px_rgba(212,195,154,0.25)]'
              : 'border-ivory/25 bg-ivory/[0.03] group-hover:border-ivory/45'
          }`}
        />
        <motion.svg
          aria-hidden="true"
          className="pointer-events-none absolute"
          width="11"
          height="9"
          viewBox="0 0 11 9"
          fill="none"
          initial={false}
          animate={{ opacity: checked ? 1 : 0, scale: checked ? 1 : 0.6 }}
          transition={{ duration: 0.4, ease }}
        >
          <path d="M1 4.5L4 7.5L10 1.5" stroke="#d4c39a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </span>
      <span className="font-body text-[13px] font-light leading-relaxed text-ivory/85">{label}</span>
    </label>
  )
}
