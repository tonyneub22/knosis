import { motion } from 'motion/react'
import Button from '../../components/ui/Button'
import PageIntro from './PageIntro'
import { caseLabel } from '../../content/cases'
import { useCaseParam } from './useCaseParam'

const ease = [0.22, 1, 0.36, 1] as const

const points = [
  {
    k: 'A simulated patient',
    v: 'The names, dates, and values are fictional. The clinical pattern is modeled on the published literature cited at the end of the case.',
  },
  {
    k: 'Several prior visits, none resolved',
    v: 'This patient has been seen before. Each earlier encounter reached a working diagnosis, and none of them was right. Read the case in the order it is presented — the prior visits, the examination, the studies, the assessment.',
  },
  {
    k: 'Keep notes as you go',
    v: 'The notes panel beside the case is yours. What you write there is saved on this device and travels with your response.',
  },
  {
    k: 'Then rate and reflect',
    v: 'When you reach the end, you will be asked to rate the level of severity and to give feedback on the framework itself.',
  },
]

export default function Instructions() {
  const doc = useCaseParam()
  if (!doc) return null

  return (
    <main className="relative mx-auto w-full max-w-3xl px-6 pb-28 pt-12 sm:pt-20">
      <PageIntro eyebrow={caseLabel(doc)} title="How to read the case" />

      <motion.ol
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
        className="mt-16 flex flex-col"
      >
        {points.map((p, i) => (
          <motion.li
            key={p.k}
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
            className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-ivory/[0.08] py-8 first:border-t-0 sm:grid-cols-[4rem_1fr]"
          >
            <span className="pt-1 font-body text-[11px] tracking-[0.25em] text-gold/70">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h2 className="font-display text-[1.45rem] font-light leading-tight tracking-[0.03em] text-ivory">{p.k}</h2>
              <p className="mt-3 font-body text-[15px] font-light leading-[1.8] text-ivory-dim">{p.v}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9, ease }} className="mt-16 flex justify-center">
        <Button to={`/structural-conditions/cases/${doc.id}/read`}>Begin reading</Button>
      </motion.div>
    </main>
  )
}
