import { useCallback, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import LayerHeader from './LayerHeader'
import FactorCard from './FactorCard'
import FactorDrawer from './FactorDrawer'
import type { Factor, LayerMeta } from '../../data/factorTypes'

const ease = [0.22, 1, 0.36, 1] as const

type Props = {
  layer: LayerMeta
  factors: Factor[]
  /** Optional short paragraph between the subtitle and the factor cards (e.g. Layer 6's framing line). */
  intro?: ReactNode
  /** Action area below the cards — Continue/results buttons for Layer 1, a back-to-pyramid link for the rest. */
  footer: ReactNode
}

/**
 * Shared overview page for every pyramid layer: header, optional intro, factor cards, drawer,
 * footer action area. Owns which factor's drawer is open so every layer page stays a thin,
 * logic-free instantiation of this one component.
 */
export default function LayerOverviewPage({ layer, factors, intro, footer }: Props) {
  const [openCode, setOpenCode] = useState<string | null>(null)
  const open = factors.find((f) => f.code === openCode) ?? null
  const close = useCallback(() => setOpenCode(null), [])
  const gridCols = factors.length >= 4 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'

  return (
    <main className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-16 sm:pt-24">
      <LayerHeader layer={layer} />

      {intro && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto mt-24 flex flex-col items-center text-center lg:mt-32"
        >
          {intro}
        </motion.div>
      )}

      <div className={`grid grid-cols-1 gap-6 ${gridCols} lg:gap-8 ${intro ? 'mt-12' : 'mt-24 lg:mt-32'}`}>
        {factors.map((f, i) => (
          <FactorCard key={f.code} factor={f} index={i} open={openCode === f.code} onOpen={setOpenCode} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease }}
        className="mt-20 flex flex-col items-center gap-8"
      >
        {footer}
      </motion.div>

      <FactorDrawer factor={open} onClose={close} layer={layer} />
    </main>
  )
}
