import type { ReactNode } from 'react'

type LabelProps = { htmlFor?: string; children: ReactNode; hint?: string; required?: boolean }

export function FieldLabel({ htmlFor, children, hint, required }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="font-body text-[13px] font-light leading-relaxed text-ivory/85">
        {children}
        {required && <span className="ml-1 text-gold/80" aria-hidden="true">·</span>}
      </span>
      {hint && <span className="mt-1 block font-body text-[12px] text-ivory-dim">{hint}</span>}
    </label>
  )
}

type TextProps = {
  id: string
  label: ReactNode
  value: string
  onChange: (v: string) => void
  placeholder?: string
  hint?: string
  required?: boolean
  multiline?: boolean
  rows?: number
}

export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  hint,
  required,
  multiline = false,
  rows = 4,
}: TextProps) {
  return (
    <div className="flex flex-col gap-3">
      <FieldLabel htmlFor={id} hint={hint} required={required}>
        {label}
      </FieldLabel>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className="field-input resize-y"
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="field-input"
        />
      )}
    </div>
  )
}

type SelectProps = {
  id: string
  label: ReactNode
  value: string
  onChange: (v: string) => void
  options: readonly string[]
  placeholder?: string
  required?: boolean
}

export function SelectField({ id, label, value, onChange, options, placeholder, required }: SelectProps) {
  return (
    <div className="flex flex-col gap-3">
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="field-input"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}
