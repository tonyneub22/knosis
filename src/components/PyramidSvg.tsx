import { motion } from 'motion/react'
import { Link } from 'react-router'
import type { Level } from '../data/levels'

/** Geometry shared with the text column so rows align with bands. */
export const PYRAMID_W = 400
export const PYRAMID_H = 460
const HALF_TOP = 180
const GAP = 2

type Band = { points: string; index: number }

function buildBands(count: number): Band[] {
  const bandH = PYRAMID_H / count
  const halfAt = (y: number) => (HALF_TOP * (PYRAMID_H - y)) / PYRAMID_H
  const cx = PYRAMID_W / 2

  return Array.from({ length: count }, (_, i) => {
    const top = i * bandH + (i === 0 ? 0 : GAP / 2)
    const bottom = (i + 1) * bandH - (i === count - 1 ? 0 : GAP / 2)
    const ht = halfAt(top)
    const hb = halfAt(bottom)
    const pts =
      i === count - 1
        ? [
            [cx - ht, top],
            [cx + ht, top],
            [cx, PYRAMID_H],
          ]
        : [
            [cx - ht, top],
            [cx + ht, top],
            [cx + hb, bottom],
            [cx - hb, bottom],
          ]
    return { index: i, points: pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ') }
  })
}

type Props = {
  levels: Level[]
  hovered: string | null
  onHover: (id: string | null) => void
}

export default function PyramidSvg({ levels, hovered, onHover }: Props) {
  const bands = buildBands(levels.length)
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <svg
      viewBox={`0 0 ${PYRAMID_W} ${PYRAMID_H}`}
      className="h-auto w-full overflow-visible"
      role="list"
      aria-label="Knosis pyramid of six levels"
    >
      <defs>
        {/* specular rim: light catching a glass edge */}
        <linearGradient id="band-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f2ede4" stopOpacity="0.06" />
          <stop offset="0.28" stopColor="#f2ede4" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#d4c39a" stopOpacity="0.55" />
          <stop offset="0.72" stopColor="#f2ede4" stopOpacity="0.85" />
          <stop offset="1" stopColor="#f2ede4" stopOpacity="0.06" />
        </linearGradient>
        {/* inner sheen */}
        <linearGradient id="band-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2ede4" stopOpacity="0.07" />
          <stop offset="0.55" stopColor="#f2ede4" stopOpacity="0.012" />
          <stop offset="1" stopColor="#f2ede4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="band-fill-hot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d4c39a" stopOpacity="0.16" />
          <stop offset="0.6" stopColor="#d4c39a" stopOpacity="0.04" />
          <stop offset="1" stopColor="#d4c39a" stopOpacity="0.01" />
        </linearGradient>
        <filter id="band-glow" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {bands.map((band) => {
        const level = levels[band.index]
        const active = hovered === level.id
        return (
          <Link
            key={level.id}
            to={level.path}
            role="listitem"
            aria-label={level.title}
            className="cursor-pointer outline-none"
            onMouseEnter={() => onHover(level.id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(level.id)}
            onBlur={() => onHover(null)}
          >
            {/* glow layer */}
            <motion.polygon
              points={band.points}
              fill="none"
              stroke="#d4c39a"
              strokeWidth={2.5}
              strokeLinejoin="round"
              filter="url(#band-glow)"
              initial={false}
              animate={{ opacity: active ? 0.9 : 0 }}
              transition={{ duration: 0.45, ease }}
              style={{ pointerEvents: 'none' }}
            />
            {/* hot fill */}
            <motion.polygon
              points={band.points}
              fill="url(#band-fill-hot)"
              stroke="none"
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: 0.45, ease }}
              style={{ pointerEvents: 'none' }}
            />
            {/* crisp band: sheen fill + specular stroke */}
            <motion.polygon
              points={band.points}
              fill="url(#band-fill)"
              stroke="url(#band-stroke)"
              strokeWidth={1}
              strokeLinejoin="round"
              initial={false}
              animate={{ strokeOpacity: active ? 1 : 0.32, fillOpacity: active ? 1 : 0.7 }}
              transition={{ duration: 0.45, ease }}
              style={{ pointerEvents: 'all' }}
            />
          </Link>
        )
      })}
    </svg>
  )
}
