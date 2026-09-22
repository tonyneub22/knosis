type Props = { children: string; className?: string }

/** Gold 11px uppercase eyebrow, as used in the landing rows. */
export default function SectionEyebrow({ children, className = '' }: Props) {
  return (
    <p className={`font-body text-[11px] uppercase tracking-[0.3em] text-gold/80 ${className}`}>{children}</p>
  )
}
