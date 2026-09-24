import { motion } from 'motion/react'
import Button from '../components/ui/Button'
import PageIntro from './layer1/PageIntro'

const ease = [0.22, 1, 0.36, 1] as const

const layers: { title: string; body: string }[] = [
  {
    title: 'Structural conditions',
    body: 'Before a patient ever walks through a door, some are already less likely to be believed. Who a person is, where they live, and what care they can reach all shape how their symptoms are heard — and almost none of it is counted.',
  },
  {
    title: 'The work system',
    body: 'The building on a given night: a crowded department, a clinician eleven hours into a shift, a screen full of alerts. Good people make harder calls in hard conditions.',
  },
  {
    title: 'Continuity and transitions',
    body: 'What gets lost between visits. A test result no one followed up on. A handoff that dropped one important detail. A patient with no regular doctor to notice the pattern forming.',
  },
  {
    title: 'The encounter',
    body: 'One visit, one conversation. Minutes to hear a history, examine, and decide what to test — sometimes across a language barrier, sometimes with a patient too sick or too frightened to tell it well.',
  },
  {
    title: 'The case itself',
    body: 'Some illnesses hide. They arrive looking like something common, or they are rare enough that few clinicians have ever seen one. And once a patient carries a label from an earlier visit, it can be hard to see past it.',
  },
  {
    title: 'The reasoning moment',
    body: 'And finally, the tip: the moment a clinician decides they know the answer and stops looking. This is where roughly three in four diagnostic errors are found — rarely from a lack of knowledge, and more often because every layer above has already narrowed what could be seen.',
  },
]

function P({ children }: { children: string }) {
  return <p className="mt-5 font-body text-[15.5px] font-light leading-[1.8] text-ivory/85">{children}</p>
}

function LayerBlock({ index, title, body }: { index: number; title: string; body: string }) {
  const width = 100 - index * 6
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease, delay: index * 0.05 }}
      className="card-specular relative z-10 mx-auto rounded-[24px] p-7 sm:p-8"
      style={{ maxWidth: `${width}%` }}
      data-active="false"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-body text-[11px] tracking-[0.3em] text-gold/80">{String(index + 1).padStart(2, '0')}</span>
        <h2 className="font-display text-[1.35rem] font-light leading-tight tracking-[0.03em] text-ivory">{title}</h2>
      </div>
      <p className="mt-4 font-body text-[14.5px] font-light leading-[1.75] text-ivory-dim">{body}</p>
    </motion.div>
  )
}

export default function About() {
  return (
    <main className="relative mx-auto w-full max-w-3xl px-6 pb-28 pt-12 sm:pt-20">
      <PageIntro eyebrow="About" title="About Knosis" />

      <div className="mt-10">
        <P>
          Every diagnosis begins as a story someone tells about how they feel. Knosis exists for the stories that
          weren't understood the first time — or the second, or the fifth.
        </P>
        <P>
          In one large survey of people living with rare diseases, the road to a diagnosis took nearly five years on
          average, and most were first told it was something else: another illness, stress, anxiety, or nothing at
          all. Behind each of those years is a person who kept coming back, and clinicians who were doing their best
          inside a system that made the answer hard to see.
        </P>
        <P>We built Knosis to look at that system honestly, from its widest view to its narrowest moment.</P>
      </div>

      <div className="relative mt-16 flex flex-col gap-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-px -translate-x-1/2"
          style={{ background: 'linear-gradient(180deg, rgba(212,195,154,0.32), rgba(212,195,154,0.03))' }}
        />
        {layers.map((l, i) => (
          <LayerBlock key={l.title} index={i} title={l.title} body={l.body} />
        ))}
      </div>

      <div className="mt-16">
        <P>
          Knosis asks one small question at that moment: how sure am I? We believe that naming uncertainty honestly,
          instead of hiding it inside a single diagnosis code, is where better care begins. For patients, it means
          being taken seriously for longer. For clinicians, it means permission to say "not yet."
        </P>
        <P>
          This work is in progress, and it is being built with physicians, nurses, patient advocates, and people who
          have lived the long road to a diagnosis. If you have seen this problem from any side, we would like to
          hear from you.
        </P>
      </div>

      <div className="mt-16 flex justify-center">
        <Button to="/contact">Get in touch</Button>
      </div>
    </main>
  )
}
