import { useCallback, useState } from 'react'
import { motion } from 'motion/react'
import Layer1Header from '../../components/layer1/Layer1Header'
import FactorCard from '../../components/layer1/FactorCard'
import FactorDrawer from '../../components/layer1/FactorDrawer'
import Button from '../../components/ui/Button'
import { layer1, layer1Factors } from '../../data/layer1Factors'

const ease = [0.22, 1, 0.36, 1] as const

export default function Overview() {
  const [openCode, setOpenCode] = useState<string | null>(null)
  const open = layer1Factors.find((f) => f.code === openCode) ?? null
  const close = useCallback(() => setOpenCode(null), [])

  return (
    <main className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-16 sm:pt-24">
      <Layer1Header />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease }}
        className="mx-auto mt-24 flex flex-col items-center text-center lg:mt-32"
      >
        <p className="font-body text-[11px] uppercase tracking-[0.3em] text-gold/80">Four factors</p>
        <p className="mt-3 max-w-xl font-body text-[13px] font-light leading-relaxed text-ivory-dim">
          {layer1.band} {layer1.scope} Open a factor to read the mechanism, the best available estimate, and the strength of the evidence.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {layer1Factors.map((f, i) => (
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
        <Button to="/structural-conditions/cases">Continue</Button>
        <Button to="/structural-conditions/results" variant="ghost" arrow="none">
          Live results
        </Button>
      </motion.div>

      <FactorDrawer factor={open} onClose={close} />
    </main>
  )
}
