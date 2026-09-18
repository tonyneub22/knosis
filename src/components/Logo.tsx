import { motion, useReducedMotion } from 'motion/react'

type LogoProps = {
  /** Rendered width/height in px. */
  size?: number
  className?: string
  /** Set false to render a static emblem (no pulsing glow). */
  animate?: boolean
}

/**
 * Knosis emblem: a soft, glowing downward chevron.
 * Mirrors /public/logo.svg, rendered inline so the glow layer can breathe.
 */
export default function Logo({ size = 72, className = '', animate = true }: LogoProps) {
  const reduce = useReducedMotion()
  const pulse = animate && !reduce

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role="img"
      aria-label="Knosis emblem"
      className={`overflow-visible ${className}`}
    >
      <defs>
        <linearGradient id="logo-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f2ede4" />
          <stop offset="1" stopColor="#d4c39a" />
        </linearGradient>
        <radialGradient id="logo-halo" cx="0.5" cy="0.55" r="0.5">
          <stop offset="0" stopColor="#d4c39a" stopOpacity="0.22" />
          <stop offset="0.6" stopColor="#d4c39a" stopOpacity="0.05" />
          <stop offset="1" stopColor="#d4c39a" stopOpacity="0" />
        </radialGradient>
        <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>

      {/* halo */}
      <motion.circle
        cx="60"
        cy="64"
        r="52"
        fill="url(#logo-halo)"
        animate={pulse ? { opacity: [0.7, 1, 0.7], scale: [1, 1.06, 1] } : { opacity: 0.85 }}
        transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity }}
        style={{ transformOrigin: '60px 64px' }}
      />

      {/* blurred glow layer */}
      <motion.g
        filter="url(#logo-glow)"
        fill="none"
        stroke="#d4c39a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={pulse ? { opacity: [0.35, 0.75, 0.35], scale: [1, 1.04, 1] } : { opacity: 0.5 }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
        style={{ transformOrigin: '60px 60px' }}
      >
        <path d="M26 42 L60 78 L94 42" />
        <path d="M38 30 L60 53 L82 30" />
      </motion.g>

      {/* crisp emblem */}
      <g fill="none" stroke="url(#logo-stroke)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M26 42 L60 78 L94 42" strokeWidth="1.25" />
        <path d="M38 30 L60 53 L82 30" strokeWidth="1" opacity="0.55" />
      </g>

      {/* focal point beneath the apex */}
      <circle cx="60" cy="92" r="1.6" fill="#d4c39a" />
      <motion.circle
        cx="60"
        cy="92"
        r="4"
        fill="#d4c39a"
        animate={pulse ? { opacity: [0.1, 0.3, 0.1] } : { opacity: 0.18 }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, delay: 0.4 }}
      />
    </svg>
  )
}
