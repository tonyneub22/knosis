import { Link } from 'react-router'

const links: { label: string; href: string }[] = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
]

type PartnerLogo = { src: string; alt: string; height: number; ratio: number; href?: string }

const partnerLogos: PartnerLogo[] = [
  { src: '/logos/podocyte-ai.png', alt: 'Podocyte AI', height: 26, ratio: 804 / 100 },
  {
    src: '/logos/r69-initiative.png',
    alt: 'R-69 Initiative',
    height: 56,
    ratio: 1141 / 601,
    href: 'https://www.r69initiative.org/',
  },
  {
    src: '/logos/kal-research-initiative.png',
    alt: 'KAL Research Initiative, LLC',
    height: 56,
    ratio: 332 / 296,
    href: 'https://www.kalresearchinitiatives.com/',
  },
]

/**
 * Rendered as a solid ivory shape via CSS mask-image (not an <img>), so the logos read as one
 * monochrome set on the dark footer regardless of their source-file colors.
 */
function FooterLogo({ src, alt, height, ratio, href }: PartnerLogo) {
  const shapeClass =
    'block bg-ivory opacity-55 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:[filter:drop-shadow(0_0_6px_rgba(212,195,154,0.55))_drop-shadow(0_0_18px_rgba(212,195,154,0.35))]'
  const shapeStyle = {
    height,
    aspectRatio: ratio,
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
  } as const

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={alt}
        className="group block outline-none focus-visible:[filter:drop-shadow(0_0_8px_rgba(212,195,154,0.6))]"
      >
        <span aria-hidden="true" className={shapeClass} style={shapeStyle} />
      </a>
    )
  }

  return (
    <span
      role="img"
      aria-label={alt}
      className={shapeClass.replace(/group-hover:/g, 'hover:')}
      style={shapeStyle}
    />
  )
}

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
            <Link
              key={l.label}
              to={l.href}
              className="font-body text-[11px] uppercase tracking-[0.25em] text-ivory-dim transition-colors duration-500 hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="font-body text-[11px] tracking-[0.2em] text-ivory-dim">© 2026 Knosis</p>
      </div>

      <div className="mx-auto w-full max-w-6xl border-t border-ivory/[0.06] px-6 py-10">
        <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-14">
          {partnerLogos.map((logo) => (
            <FooterLogo key={logo.alt} {...logo} />
          ))}
        </div>
      </div>
    </footer>
  )
}
