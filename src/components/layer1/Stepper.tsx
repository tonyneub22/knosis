import { motion } from 'motion/react'
import { useLocation } from 'react-router'
import { steps, stepFromPath } from '../../lib/steps'

const ease = [0.22, 1, 0.36, 1] as const

/** Progress across the Layer 1 flow. Current node glows gold; completed nodes are gold; upcoming are dim. */
export default function Stepper() {
  const { pathname } = useLocation()
  const current = stepFromPath(pathname)
  if (!current) return null
  const currentIndex = steps.findIndex((s) => s.id === current)

  return (
    <nav aria-label="Progress" className="flex items-center">
      <ol className="flex items-center gap-2 sm:gap-3">
        {steps.map((s, i) => {
          const state = i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'todo'
          return (
            <li key={s.id} className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2.5">
                <motion.span
                  aria-hidden="true"
                  className="block h-1.5 w-1.5 rounded-full"
                  initial={false}
                  animate={{
                    backgroundColor:
                      state === 'todo' ? 'rgba(242,237,228,0.22)' : state === 'done' ? 'rgba(212,195,154,0.6)' : '#d4c39a',
                    boxShadow: state === 'current' ? '0 0 12px rgba(212,195,154,0.8)' : '0 0 0px rgba(212,195,154,0)',
                    scale: state === 'current' ? 1.25 : 1,
                  }}
                  transition={{ duration: 0.6, ease }}
                />
                <span
                  aria-current={state === 'current' ? 'step' : undefined}
                  className={`font-body text-[10px] uppercase tracking-[0.28em] transition-colors duration-500 ${
                    state === 'current' ? 'text-ivory' : state === 'done' ? 'text-gold/70' : 'text-ivory/30'
                  } ${state === 'current' ? '' : 'hidden md:inline'}`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`hidden h-px w-5 sm:block lg:w-8 ${i < currentIndex ? 'bg-gold/40' : 'bg-ivory/10'}`}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
