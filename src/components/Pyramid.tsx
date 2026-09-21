import { useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router'
import { levels } from '../data/levels'
import PyramidSvg, { PYRAMID_H, PYRAMID_W } from './PyramidSvg'

const ease = [0.22, 1, 0.36, 1] as const

export default function Pyramid() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-28 lg:py-40">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease }}
        className="mx-auto mb-16 flex flex-col items-center text-center lg:mb-24"
      >
        <p className="font-body text-lg uppercase tracking-[0.3em] text-gold/80 sm:text-xl">
          Six levels
        </p>
        <p className="mt-4 font-body text-[11px] uppercase tracking-[0.3em] text-ivory-dim">
          Based on Peer-Reviewed Research
        </p>
        <p className="text-sweep mt-3 font-body text-[13px] uppercase tracking-[0.3em]">
          Choose a Level On the Pyramid to Learn and Practice
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease }}
        className="grid grid-cols-1 items-stretch gap-14 lg:grid-cols-2 lg:gap-20"
      >
        {/* left: pyramid */}
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <div style={{ aspectRatio: `${PYRAMID_W} / ${PYRAMID_H}` }}>
            <PyramidSvg levels={levels} hovered={hovered} onHover={setHovered} />
          </div>
        </div>

        {/* right: six rows, one per band */}
        <ol className="flex flex-col lg:h-full">
          {levels.map((level, i) => {
            const active = hovered === level.id
            return (
              <li key={level.id} className="flex min-h-0 lg:flex-1">
                <Link
                  to={level.path}
                  className="group flex w-full items-center border-b border-ivory/[0.08] py-6 outline-none lg:py-0"
                  onMouseEnter={() => setHovered(level.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(level.id)}
                  onBlur={() => setHovered(null)}
                >
                  <motion.span
                    initial={false}
                    animate={{ opacity: active ? 0.9 : 0.35 }}
                    transition={{ duration: 0.45, ease }}
                    className="mr-6 w-7 shrink-0 font-body text-[11px] tracking-[0.25em] text-gold"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </motion.span>
                  <span className="flex flex-col">
                    <motion.span
                      initial={false}
                      animate={{
                        opacity: active ? 1 : 0.42,
                        textShadow: active
                          ? '0 0 18px rgba(212,195,154,0.45)'
                          : '0 0 0px rgba(212,195,154,0)',
                      }}
                      transition={{ duration: 0.45, ease }}
                      className="font-display text-[1.5rem] font-light leading-tight tracking-[0.04em] text-ivory md:text-[1.7rem]"
                    >
                      {level.title}
                    </motion.span>
                    {level.subtitle && (
                      <motion.span
                        initial={false}
                        animate={{ opacity: active ? 0.7 : 0.3 }}
                        transition={{ duration: 0.45, ease }}
                        className="mt-1 font-body text-[13px] text-ivory"
                      >
                        {level.subtitle}
                      </motion.span>
                    )}
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      </motion.div>
    </section>
  )
}
