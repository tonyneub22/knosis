import type { ReactNode } from 'react'

type Option<T extends string> = { value: T; label: string }

type Props<T extends string> = {
  name: string
  label: ReactNode
  value: T
  onChange: (v: T) => void
  options: Option<T>[]
}

export default function RadioGroup<T extends string>({ name, label, value, onChange, options }: Props<T>) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="font-body text-[13px] font-light leading-relaxed text-ivory/85">{label}</legend>
      <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:gap-8">
        {options.map((o) => {
          const id = `${name}-${o.value}`
          const active = value === o.value
          return (
            <label key={o.value} htmlFor={id} className="group flex cursor-pointer select-none items-center gap-3">
              <span className="relative flex h-5 w-5 items-center justify-center">
                <input
                  id={id}
                  type="radio"
                  name={name}
                  value={o.value}
                  checked={active}
                  onChange={() => onChange(o.value)}
                  className="peer absolute inset-0 cursor-pointer opacity-0"
                />
                <span
                  aria-hidden="true"
                  className={`h-5 w-5 rounded-full border transition-all duration-500 peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold/70 ${
                    active
                      ? 'border-gold/80 shadow-[0_0_16px_rgba(212,195,154,0.25)]'
                      : 'border-ivory/25 group-hover:border-ivory/45'
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute h-2 w-2 rounded-full bg-gold transition-all duration-400 ${
                    active ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                  }`}
                />
              </span>
              <span className="font-body text-[13px] font-light text-ivory/85">{o.label}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
