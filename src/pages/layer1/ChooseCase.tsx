import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import Card from '../../components/ui/Card'
import PageIntro from './PageIntro'
import { cases } from '../../content/cases'

const ease = [0.22, 1, 0.36, 1] as const

export default function ChooseCase() {
  const navigate = useNavigate()

  return (
    <main className="relative mx-auto w-full max-w-5xl px-6 pb-28 pt-12 sm:pt-20">
      <PageIntro eyebrow="Level 01 · Structural conditions" title="Diagnostic Uncertainty Severity Index (DUSI)">
        Choose a Case
      </PageIntro>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {cases.map((c, i) => (
          <Card
            key={c.id}
            as="button"
            index={i}
            onClick={() => navigate(`/structural-conditions/cases/${c.id}/instructions`)}
            ariaLabel={`Case ${c.number}`}
            className="group flex h-full w-full flex-col p-8 sm:p-10"
          >
            <motion.span
              className="block font-display text-[2.25rem] font-light leading-tight tracking-[0.03em] text-ivory md:text-[2.5rem]"
              initial={false}
              whileHover={{ textShadow: '0 0 18px rgba(212,195,154,0.45)' }}
              transition={{ duration: 0.45, ease }}
            >
              Case {c.number}
            </motion.span>
            <span className="mt-6 block font-display text-[1.1rem] italic leading-relaxed text-ivory/85">{c.teaser[0]}</span>
            <span className="mt-2 block font-body text-[13.5px] font-light leading-relaxed text-ivory-dim">{c.teaser[1]}</span>
            <span className="mt-8 flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.3em] text-ivory/40 transition-colors duration-500 group-hover:text-gold/80">
              Select
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
            </span>
          </Card>
        ))}
      </div>

      <motion.a
        href="https://www.r69initiative.org/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease }}
        whileHover={{ textShadow: '0 0 28px rgba(212,195,154,0.75)' }}
        className="mt-16 block text-center font-display text-[1.05rem] tracking-[0.18em] text-ivory-dim transition-colors duration-500 hover:text-gold/90"
        style={{ textShadow: '0 0 20px rgba(212,195,154,0.28)' }}
      >
        Powered by the R69 Initiative
      </motion.a>
    </main>
  )
}
