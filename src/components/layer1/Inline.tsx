import type { ReactNode } from 'react'

/**
 * Minimal inline formatter: **bold**, _italic_, and bare URLs become links.
 * No markdown dependency.
 */
export function Inline({ text }: { text: string }): ReactNode {
  const parts: ReactNode[] = []
  const re = /(https?:\/\/[^\s)]+|\*\*[^*]+\*\*|_[^_]+_)/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const tok = m[0]
    if (tok.startsWith('**')) {
      parts.push(
        <strong key={i++} className="font-normal text-ivory">
          {tok.slice(2, -2)}
        </strong>,
      )
    } else if (tok.startsWith('http')) {
      parts.push(
        <a
          key={i++}
          href={tok}
          target="_blank"
          rel="noreferrer noopener"
          className="break-all text-gold/80 underline decoration-gold/30 underline-offset-4 transition-colors duration-500 hover:text-gold hover:decoration-gold/70"
        >
          {tok}
        </a>,
      )
    } else {
      parts.push(<em key={i++}>{tok.slice(1, -1)}</em>)
    }
    last = m.index + tok.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}
