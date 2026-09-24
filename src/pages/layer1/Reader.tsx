import { useRef } from 'react'
import { motion } from 'motion/react'
import CaseRenderer from '../../components/layer1/CaseRenderer'
import NotesPanel from '../../components/layer1/NotesPanel'
import ReadingProgress from '../../components/layer1/ReadingProgress'
import Button from '../../components/ui/Button'
import { caseLabel } from '../../content/cases'
import { useCaseNotes } from '../../lib/notes'
import { useCaseParam } from './useCaseParam'

const ease = [0.22, 1, 0.36, 1] as const

export default function Reader() {
  const doc = useCaseParam()
  const articleRef = useRef<HTMLElement | null>(null)
  const [notes, setNotes] = useCaseNotes(doc?.id ?? 'unknown')
  if (!doc) return null

  return (
    <main className="relative w-full pb-32 pt-8 sm:pt-12 lg:pb-28">
      <ReadingProgress target={articleRef} />

      {/* Leave room for the notes panel on large screens so the column stays centred in the remaining space. */}
      <div className="px-6 lg:pl-20 lg:pr-[368px] xl:pr-[392px]">
        <motion.article
          ref={articleRef}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto w-full max-w-3xl"
          aria-label={caseLabel(doc)}
        >
          <CaseRenderer doc={doc} />

          <div className="mt-20 flex flex-col items-center gap-5 border-t border-ivory/[0.08] pt-14 text-center">
            <p className="font-body text-[11px] uppercase tracking-[0.3em] text-gold/80">End of case</p>
            <p className="max-w-md font-body text-[14px] font-light leading-relaxed text-ivory-dim">Next, rate the level of diagnostic severity. Your notes come with you.</p>
            <div className="mt-4">
              <Button to={`/structural-conditions/cases/${doc.id}/severity`}>Continue</Button>
            </div>
          </div>
        </motion.article>
      </div>

      <NotesPanel value={notes} onChange={setNotes} caseLabel={`Case ${doc.number}`} />
    </main>
  )
}
