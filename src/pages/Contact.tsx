import PageIntro from './layer1/PageIntro'

type Person = { name: string; role: string; user: string; domain: string }

// Split into parts and assembled below at render time, rather than written as a single
// literal string, so plain-text scrapers of the page or bundle don't find a ready-to-harvest address.
const people: Person[] = [
  { name: 'Anthony Neubacher', role: 'Author', user: 'tjneubacher', domain: 'gmail.com' },
  { name: 'Helen Hernandez', role: 'Co-author', user: 'helenwhernandez', domain: 'kalresearchinitiatives.com' },
]

function ContactCard({ name, role, user, domain }: Person) {
  const email = [user, domain].join('@')
  return (
    <div className="card-specular flex flex-col rounded-[28px] p-8 sm:p-10" data-active="false">
      <p className="font-body text-[11px] uppercase tracking-[0.3em] text-gold/80">{role}</p>
      <h2 className="mt-4 font-display text-[1.6rem] font-light leading-tight tracking-[0.03em] text-ivory">{name}</h2>
      <a
        href={`mailto:${email}`}
        className="group relative mt-6 inline-block w-fit font-body text-[14px] font-light text-ivory-dim transition-colors duration-500 hover:text-gold"
      >
        {email}
        <span className="absolute bottom-0 left-0 block h-px w-full origin-left scale-x-0 bg-gold/70 transition-transform duration-500 group-hover:scale-x-100" />
      </a>
    </div>
  )
}

export default function Contact() {
  return (
    <main className="relative mx-auto w-full max-w-3xl px-6 pb-28 pt-12 sm:pt-20">
      <PageIntro eyebrow="Get in touch" title="Contact" />

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {people.map((p) => (
          <ContactCard key={p.name} {...p} />
        ))}
      </div>
    </main>
  )
}
