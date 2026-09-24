import type { ReactNode } from 'react'
import PageIntro from './layer1/PageIntro'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="font-display text-[1.5rem] font-light leading-tight tracking-[0.03em] text-ivory">
        <span className="mb-4 block h-px w-10 bg-gold/50" aria-hidden="true" />
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  )
}

function P({ children }: { children: ReactNode }) {
  return <p className="font-body text-[15px] font-light leading-[1.8] text-ivory-dim">{children}</p>
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((t, i) => (
        <li key={i} className="flex gap-4 font-body text-[15px] font-light leading-[1.75] text-ivory-dim">
          <span aria-hidden="true" className="mt-[0.85em] block h-px w-3 shrink-0 bg-gold/60" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Privacy() {
  return (
    <main className="relative mx-auto w-full max-w-3xl px-6 pb-28 pt-12 sm:pt-20">
      <PageIntro eyebrow="Legal" title="Privacy Policy">
        <span className="block text-center font-body text-[11px] uppercase tracking-[0.25em] text-ivory/40">
          Effective September 24, 2026
        </span>
      </PageIntro>

      <div className="mt-4">
        <Section title="Who we are">
          <P>
            Knosis is operated by Podocyte AI, LLC, based in Michigan, USA. Knosis is an educational and research
            tool about diagnostic uncertainty in healthcare. Every case on this site is a simulated patient case,
            constructed for teaching purposes — Knosis does not collect real patient medical records, and it is not
            a HIPAA-covered service.
          </P>
        </Section>

        <Section title="Information you give us">
          <P>
            When you complete a case and submit feedback, we collect what you choose to enter in the feedback form:
          </P>
          <Bullets
            items={[
              'Your role (physician, nurse, billing specialist, patient advocate, patient, researcher, or other), and a description if you choose "other."',
              'Your rating of the case on our diagnostic-severity scale.',
              'Free-text feedback on the case title, the level descriptions, and the action steps.',
              'Your reading notes from that case, kept in the notes panel as you read.',
              'Optionally, your name — or you may mark your response anonymous, in which case we never collect a name.',
              'Whether we may contact you, and if so, your preferred way to reach you.',
              'Whether you would like to co-author.',
              'Three "global coverage" questions: where you have familiarity with how people seek healthcare, where you have contacts who could help with contextual details, and where you know of a possible pilot site.',
              'Optionally, the name, title, or role of a specific person you suggest we contact, and whether you can facilitate an introduction.',
            ]}
          />
          <P>
            If you suggest a contact person, please only share information about them that you have permission to
            share.
          </P>
        </Section>

        <Section title="What is public">
          <P>
            Knosis publishes a live results dashboard so contributors can see the project's progress. Your feedback
            comments, your role, your diagnostic-severity rating, and your answers to the three region questions
            appear there, along with the case you read and the date of your response, plus simple aggregate counts
            of how many respondents were willing to be contacted, wanted to co-author, or could facilitate an
            introduction.
          </P>
          <P>
            Your name, your contact details, your reading notes, and the name of anyone you suggested as a contact
            are never shown on the public dashboard.
          </P>
        </Section>

        <Section title="Information collected automatically">
          <P>
            Our hosting provider (Vercel) and our database provider (Supabase) automatically log standard server
            information for every visit — such as IP address, browser type, and request times — as part of running
            the site. We also load our typefaces from Google Fonts, so when your browser fetches those fonts,
            Google's servers receive the same kind of standard request information.
          </P>
        </Section>

        <Section title="Information stored on your device">
          <P>Knosis stores a few things directly in your browser's local storage, never on our servers unless you submit them:</P>
          <Bullets
            items={[
              'The reading notes you keep while going through a case.',
              'Your in-progress form and severity selection for the case you are currently reading.',
              "Whether you've acknowledged this site's privacy notice, so it doesn't reappear.",
            ]}
          />
          <P>We do not set cookies, and we do not use any analytics or tracking scripts.</P>
        </Section>

        <Section title="How we use information">
          <P>
            We use the information you submit to research diagnostic uncertainty, to improve the Knosis framework
            and the cases presented here, and to display aggregated results on our live dashboard. If you tell us we
            may contact you, we will only reach out about this project, and only in the way you asked us to.
          </P>
        </Section>

        <Section title="Sharing">
          <P>We do not sell your information, and we do not use it for advertising. We share it only:</P>
          <Bullets
            items={[
              'With the service providers who run the site — Supabase (database) and Vercel (hosting).',
              'With the Knosis research team.',
              'In aggregated or de-identified form, in research presentations or publications.',
              'When required by law.',
            ]}
          />
        </Section>

        <Section title="Where data is stored">
          <P>
            Your information is stored and processed in the United States. If you are visiting from outside the US,
            you understand that your information will be transferred to and processed in the US.
          </P>
        </Section>

        <Section title="Retention and deletion">
          <P>
            We keep submitted responses for the duration of this research project. You may request access to,
            correction of, or deletion of your information at any time by emailing tjneubacher@gmail.com.
          </P>
        </Section>

        <Section title="Your rights">
          <P>
            Regardless of where you live, you may ask us to access, correct, or delete the information you've given
            us, and we will honor that request. Residents of some US states (such as California) and of the EU/UK
            may have additional statutory rights over their personal information; we will work with you to honor
            those as well.
          </P>
        </Section>

        <Section title="Children">
          <P>
            Knosis is not directed to children under 13. It is intended for use by healthcare professionals,
            researchers, patients, and other adults.
          </P>
        </Section>

        <Section title="Security">
          <P>
            We take reasonable steps to protect the information you give us, including database access controls on
            our Supabase project. No method of transmission or storage is perfectly secure, and we cannot guarantee
            absolute security.
          </P>
        </Section>

        <Section title="Changes to this policy">
          <P>We may update this policy as Knosis evolves. We'll update the effective date above whenever we do.</P>
        </Section>

        <Section title="Contact">
          <P>Questions about this policy or your information: tjneubacher@gmail.com.</P>
        </Section>
      </div>
    </main>
  )
}
