import { Link } from 'react-router'

const links: { label: string; href: string }[] = [
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Privacy', href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-ivory/[0.08]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 py-14 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Link
            to="/"
            className="font-display text-2xl font-light tracking-[0.3em] pl-[0.3em] text-ivory md:pl-0"
          >
            Knosis
          </Link>
          <span className="font-display text-sm tracking-[0.15em] text-ivory-dim">
            Powered by Podocyte AI
          </span>
        </div>

        <nav aria-label="Footer" className="flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-body text-[11px] uppercase tracking-[0.25em] text-ivory-dim transition-colors duration-500 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <p className="font-body text-[11px] tracking-[0.2em] text-ivory-dim">© 2026 Knosis</p>
      </div>
    </footer>
  )
}
