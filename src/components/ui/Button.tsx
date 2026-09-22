import type { ReactNode, ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router'

type Variant = 'primary' | 'ghost'
type Arrow = 'right' | 'left' | 'none'

type Props = {
  children: ReactNode
  to?: string
  onClick?: () => void
  variant?: Variant
  arrow?: Arrow
  disabled?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  className?: string
}

/**
 * The site's button. Derived from the landing page's link idiom — 11px uppercase
 * tracked label, sliding arrow, gold hairline sweep. `primary` wraps that in a
 * rounded pill with a specular gold border and a soft glow on hover.
 */
export default function Button({
  children,
  to,
  onClick,
  variant = 'primary',
  arrow = 'right',
  disabled = false,
  type = 'button',
  className = '',
}: Props) {
  const base =
    'group inline-flex items-center justify-center gap-3 font-body text-[11px] uppercase tracking-[0.3em] outline-none select-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]'

  const primary =
    'rounded-full border border-gold/45 px-9 py-4 text-ivory hover:border-gold hover:text-ivory hover:shadow-[0_0_40px_rgba(212,195,154,0.22)] focus-visible:border-gold focus-visible:shadow-[0_0_40px_rgba(212,195,154,0.22)] bg-[linear-gradient(180deg,rgba(212,195,154,0.08),rgba(212,195,154,0.02))]'

  const ghost = 'relative text-ivory-dim hover:text-ivory pb-2'

  const disabledCls = disabled ? 'pointer-events-none opacity-35' : ''

  const cls = `${base} ${variant === 'primary' ? primary : ghost} ${disabledCls} ${className}`

  const arrowLeft = arrow === 'left' && (
    <span className="inline-block transition-transform duration-500 group-hover:-translate-x-1">←</span>
  )
  const arrowRight = arrow === 'right' && (
    <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
  )
  const underline = variant === 'ghost' && (
    <span className="absolute bottom-0 left-0 block h-px w-full origin-left scale-x-0 bg-gold/70 transition-transform duration-500 group-hover:scale-x-100" />
  )

  const inner = (
    <>
      {arrowLeft}
      <span>{children}</span>
      {arrowRight}
      {underline}
    </>
  )

  if (to && !disabled) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {inner}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} aria-disabled={disabled}>
      {inner}
    </button>
  )
}
