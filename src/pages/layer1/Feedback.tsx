import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import Button from '../../components/ui/Button'
import Checkbox from '../../components/ui/Checkbox'
import RadioGroup from '../../components/ui/RadioGroup'
import Toggle from '../../components/ui/Toggle'
import { SelectField, TextField } from '../../components/ui/Field'
import PageIntro from './PageIntro'
import { caseLabel } from '../../content/cases'
import { readNotes } from '../../lib/notes'
import { clearSeverity, readSeverity } from '../../lib/severitySelection'
import { roles, store, type Role, type SubmissionInput } from '../../lib/submissions'
import { useCaseParam } from './useCaseParam'

const ease = [0.22, 1, 0.36, 1] as const

function Section({ letter, title, children }: { letter: string; title: string; children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease }}
      className="card-specular rounded-[28px] p-8 sm:p-10"
      data-active="false"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-body text-[11px] tracking-[0.3em] text-gold/80">{letter}</span>
        <h2 className="font-display text-[1.6rem] font-light leading-tight tracking-[0.03em] text-ivory">{title}</h2>
      </div>
      <div className="mt-8 flex flex-col gap-8">{children}</div>
    </motion.section>
  )
}

function Reveal({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.6, ease }}
          className="overflow-hidden"
        >
          <div className="pt-1">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const introNote =
  'To make the best of the opportunity, we will prioritize these survey responses. Please reach out directly to our team so that we can ensure prompt responses and meeting availability.'

export default function Feedback() {
  const doc = useCaseParam()
  const navigate = useNavigate()
  // Read the chosen level once; it is cleared from session storage after a successful save.
  const [severity] = useState(() => (doc ? readSeverity(doc.id) : null))
  const inFlight = useRef(false)

  // Deep link without a severity choice → go back and choose one.
  useEffect(() => {
    if (doc && severity === null) navigate(`/structural-conditions/cases/${doc.id}/severity`, { replace: true })
  }, [doc, severity, navigate])

  // A. Feedback
  const [fbTitle, setFbTitle] = useState('')
  const [fbLevels, setFbLevels] = useState('')
  const [fbActions, setFbActions] = useState('')
  // B. Who
  const [role, setRole] = useState<'' | Role>('')
  const [roleOther, setRoleOther] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [name, setName] = useState('')
  const [mayContact, setMayContact] = useState(false)
  const [contactMethod, setContactMethod] = useState('')
  const [coAuthor, setCoAuthor] = useState(false)
  // C. Coverage
  const [familiarity, setFamiliarity] = useState('')
  const [contacts, setContacts] = useState('')
  const [pilotSites, setPilotSites] = useState('')
  const [suggestion, setSuggestion] = useState<'unknown' | 'named'>('unknown')
  const [suggestedContact, setSuggestedContact] = useState('')
  const [canIntroduce, setCanIntroduce] = useState(false)

  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!doc || severity === null) return null

  const roleValid = role !== '' && (role !== 'Other' || roleOther.trim() !== '')

  const submit = async () => {
    if (!roleValid || inFlight.current) return
    inFlight.current = true
    setSubmitting(true)
    setError(null)
    const input: SubmissionInput = {
      layer: 'structural-conditions',
      caseId: doc.id,
      severityLevel: severity,
      notes: readNotes(doc.id),
      feedback: { title: fbTitle.trim(), levelDescriptions: fbLevels.trim(), actionSteps: fbActions.trim() },
      respondent: {
        role: role as Role,
        roleOther: role === 'Other' ? roleOther.trim() : undefined,
        anonymous,
        name: anonymous ? undefined : name.trim() || undefined,
        mayContact,
        contactMethod: mayContact ? contactMethod.trim() || undefined : undefined,
        coAuthor,
      },
      coverage: {
        familiarity: familiarity.trim(),
        contacts: contacts.trim(),
        pilotSites: pilotSites.trim(),
        suggestion,
        suggestedContact: suggestion === 'named' ? suggestedContact.trim() || undefined : undefined,
        canIntroduce,
      },
    }
    try {
      await store.saveSubmission(input)
      clearSeverity(doc.id)
      setDone(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong while saving.')
    } finally {
      inFlight.current = false
      setSubmitting(false)
    }
  }

  return (
    <main className="relative mx-auto w-full max-w-3xl px-6 pb-28 pt-12 sm:pt-20">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease }}
            className="flex min-h-[50vh] flex-col items-center justify-center text-center"
          >
            <span className="font-body text-[11px] uppercase tracking-[0.35em] text-gold/70">Received</span>
            <h1 className="mt-5 font-display font-light leading-tight tracking-[0.05em] text-ivory" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
              Thank you.
            </h1>
            <p className="mt-5 max-w-md font-body text-[15px] font-light leading-[1.8] text-ivory-dim">
              Your perspective on {caseLabel(doc)} has been recorded, at Level {severity}, with your notes.
            </p>
            <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
              <Button to="/structural-conditions/results">View live results</Button>
              <Button to="/" variant="ghost" arrow="left">
                Back to Knosis
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.6, ease }}>
            <PageIntro eyebrow={`${caseLabel(doc)} · Level ${severity}`} title="Feedback">
              Three short sections. Only your role is required; everything else is welcome.
            </PageIntro>

            <form
              className="mt-16 flex flex-col gap-8"
              onSubmit={(e) => {
                e.preventDefault()
                void submit()
              }}
              noValidate
            >
              <Section letter="A" title="Feedback">
                <TextField id="fb-title" label="Feedback on the title" value={fbTitle} onChange={setFbTitle} multiline rows={3} />
                <TextField id="fb-levels" label="Feedback on the level descriptions" value={fbLevels} onChange={setFbLevels} multiline rows={4} />
                <TextField id="fb-actions" label="Feedback on the action steps" value={fbActions} onChange={setFbActions} multiline rows={4} />
              </Section>

              <Section letter="B" title="Who is providing this perspective">
                <SelectField id="role" label="Role" value={role} onChange={(v) => setRole(v as Role)} options={roles} placeholder="Choose a role" required />
                <Reveal show={role === 'Other'}>
                  <TextField id="role-other" label="Please describe your role" value={roleOther} onChange={setRoleOther} required />
                </Reveal>
                <Toggle id="anonymous" label="Remain anonymous (role only)" checked={anonymous} onChange={setAnonymous} />
                <Reveal show={!anonymous}>
                  <TextField id="name" label="Name" value={name} onChange={setName} placeholder="Optional" />
                </Reveal>
                <Checkbox id="may-contact" label="You may contact me with a clarifying question" checked={mayContact} onChange={setMayContact} />
                <Reveal show={mayContact}>
                  <TextField id="contact-method" label="Preferred way to reach you" hint="Email, WhatsApp, LinkedIn, etc." value={contactMethod} onChange={setContactMethod} />
                </Reveal>
                <Checkbox id="co-author" label="I would like to co-author" checked={coAuthor} onChange={setCoAuthor} />
              </Section>

              <Section letter="C" title="Global coverage">
                <TextField
                  id="familiarity"
                  label="Where in the world do you have familiarity with how people are able to seek healthcare?"
                  hint="List as many places as apply."
                  value={familiarity}
                  onChange={setFamiliarity}
                  multiline
                  rows={2}
                />
                <TextField
                  id="contacts"
                  label="Where in the world do you have contacts who could help us learn contextual details?"
                  value={contacts}
                  onChange={setContacts}
                  multiline
                  rows={2}
                />
                <TextField
                  id="pilot-sites"
                  label="Where in the world do you know of a possible pilot site (hospital, healthcare system)?"
                  value={pilotSites}
                  onChange={setPilotSites}
                  multiline
                  rows={2}
                />
                <RadioGroup
                  name="suggestion"
                  label="Who would you suggest we contact?"
                  value={suggestion}
                  onChange={setSuggestion}
                  options={[
                    { value: 'unknown', label: "I don't know" },
                    { value: 'named', label: 'Name / Title / Role' },
                  ]}
                />
                <Reveal show={suggestion === 'named'}>
                  <TextField id="suggested-contact" label="Name / Title / Role" value={suggestedContact} onChange={setSuggestedContact} />
                </Reveal>
                <Checkbox id="can-introduce" label="I can facilitate an introduction" checked={canIntroduce} onChange={setCanIntroduce} />
                <Reveal show={canIntroduce}>
                  <div className="rounded-[20px] border border-gold/30 bg-[linear-gradient(180deg,rgba(212,195,154,0.09),rgba(212,195,154,0.02))] px-6 py-5 shadow-[0_0_40px_rgba(212,195,154,0.08)]">
                    <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/85">A note from the team</p>
                    <p className="mt-3 font-display text-[1.15rem] italic leading-[1.6] text-ivory/90">{introNote}</p>
                  </div>
                </Reveal>
              </Section>

              <div className="mt-6 flex flex-col items-center gap-4">
                <Button type="submit" disabled={!roleValid || submitting}>
                  {submitting ? 'Saving' : 'Submit'}
                </Button>
                <span aria-live="polite" className="font-body text-[11px] uppercase tracking-[0.25em] text-ivory/35">
                  {error ?? (roleValid ? 'Ready to submit' : 'Choose a role to submit')}
                </span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
