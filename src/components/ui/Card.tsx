import type { ReactNode, KeyboardEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

type Props = {
  children: ReactNode
  /** Persistent selected/active state — full specular border and glow. */
  active?: boolean
  onClick?: () => void
  className?: string
  /** Rendered element — 'button' for selectable cards, 'div' for static panels. */
  as?: 'button' | 'div'
  ariaPressed?: boolean
  ariaLabel?: string
  /** Index-based stagger for reveal on scroll. */
  index?: number
  reveal?: boolean
}

/**
 * Rounded rectangle with a thin specular border (see .card-specular in index.css),
 * echoing the pyramid bands. Hover/active adds the gold glow from the landing rows.
 */
export default function Card({
  children,
  active = false,
  onClick,
  className = '',
  as = 'div',
  ariaPressed,
  ariaLabel,
  index = 0,
  reveal = true,
}: Props) {
  const reduce = useReducedMotion()
  const interactive = as === 'button' || Boolean(onClick)

  const revealProps = reveal
    ? {
        initial: reduce ? false : { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-60px' },
      }
    : {}

  const shadow = active ? '0 0 48px rgba(212,195,154,0.2)' : '0 0 0px rgba(212,195,154,0)'

  const cls = `card-specular rounded-[28px] text-left outline-none ${
    interactive ? 'cursor-pointer hover:shadow-[0_0_44px_rgba(212,195,154,0.16)] focus-visible:shadow-[0_0_44px_rgba(212,195,154,0.16)]' : ''
  } transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`

  const onKey = (e: KeyboardEvent) => {
    if (as === 'div' && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  if (as === 'button') {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        aria-pressed={ariaPressed}
        aria-label={ariaLabel}
        data-active={active ? 'true' : 'false'}
        className={cls}
        {...revealProps}
        animate={{ boxShadow: shadow }}
        transition={{ duration: 0.7, ease, delay: reveal ? index * 0.08 : 0 }}
      >
        {children}
      </motion.button>
    )
  }

  return (
    <motion.div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onKey}
      aria-label={ariaLabel}
      data-active={active ? 'true' : 'false'}
      className={cls}
      {...revealProps}
      animate={{ boxShadow: shadow }}
      transition={{ duration: 0.7, ease, delay: reveal ? index * 0.08 : 0 }}
    >
      {children}
    </motion.div>
  )
}
