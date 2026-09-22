import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import SeverityCard from '../../components/layer1/SeverityCard'
import Button from '../../components/ui/Button'
import PageIntro from './PageIntro'
import { severityLevels } from '../../data/severityLevels'
import { readSeverity, saveSeverity } from '../../lib/severitySelection'
import type { SeverityValue } from '../../lib/submissions'
import { caseLabel } from '../../content/cases'
import { useCaseParam } from './useCaseParam'

const ease = [0.22, 1, 0.36, 1] as const

export default function Severity() {
  const doc = useCaseParam()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<SeverityValue | null>(() => (doc ? readSeverity(doc.id) : null))
  if (!doc) return null

  const next = () => {
    if (!selected) return
    saveSeverity(doc.id, selected)
    navigate(`/structural-conditions/cases/${doc.id}/feedback`)
  }

  return (
    <main className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-12 sm:pt-20">
      <PageIntro eyebrow={caseLabel(doc)} title="Level of severity">
        Having read the case, which level best describes it? Choose one.
      </PageIntro>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 lg:gap-6">
        {severityLevels.map((l, i) => (
          <SeverityCard key={l.level} level={l} index={i} selected={selected === l.level} onSelect={() => setSelected(l.level)} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="mt-16 flex flex-col items-center gap-4"
      >
        <Button onClick={next} disabled={selected === null}>
          Continue
        </Button>
        <span aria-live="polite" className="font-body text-[11px] uppercase tracking-[0.25em] text-ivory/35">
          {selected ? `Level ${selected} selected` : 'Select a level to continue'}
        </span>
      </motion.div>
    </main>
  )
}
