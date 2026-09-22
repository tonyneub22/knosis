import { useCallback, useEffect, useRef, useState } from 'react'
import type { CaseBlock, CaseDoc } from '../../content/cases/types'
import { Inline } from './Inline'

/** Typesets a CaseDoc: display-serif headings, site-styled tables, teaching notes set apart. */
export default function CaseRenderer({ doc }: { doc: CaseDoc }) {
  return (
    <div className="case-prose">
      <header className="border-b border-ivory/[0.08] pb-10">
        <p className="font-body text-[11px] uppercase tracking-[0.3em] text-gold/80">Case {doc.number}</p>
        <h1 className="mt-4 font-display font-light leading-[1.1] tracking-[0.03em] text-ivory" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}>
          {doc.title}
        </h1>
        <p className="mt-5 font-display text-[1.05rem] italic leading-relaxed tracking-[0.02em] text-ivory-dim">{doc.subtitle}</p>
        <p className="mt-6 rounded-2xl border border-gold/20 bg-gold/[0.04] px-5 py-4 font-body text-[12.5px] font-light leading-relaxed text-ivory/70">
          {doc.disclaimer}
        </p>
      </header>
      <div className="flex flex-col">
        {doc.blocks.map((b, i) => (
          <Block key={i} block={b} />
        ))}
      </div>
    </div>
  )
}

type TableBlock = Extract<CaseBlock, { type: 'table' }>

/**
 * A prior-visits / lab table. Column widths are tightened as far as reasonable for
 * legibility, but a wide table (6 columns of free text) genuinely does not fit inside
 * the 768px reading column on desktop, so this always keeps a working horizontal-scroll
 * fallback — never a hard clip — with a right-edge fade that appears only while there is
 * more to scroll to, and disappears once the user reaches the end.
 */
function CaseTable({ block }: { block: TableBlock }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hasOverflow, setHasOverflow] = useState(false)
  const [atEnd, setAtEnd] = useState(false)

  const measure = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setHasOverflow(el.scrollWidth > el.clientWidth + 1)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2)
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const wide = block.columns.length > 4

  return (
    <div className="relative mt-6">
      <div
        ref={scrollRef}
        onScroll={measure}
        className="scrollbar-thin overflow-x-auto rounded-2xl border border-ivory/[0.08] bg-ink-2"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <table>
          <thead>
            <tr>
              {block.columns.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((r, ri) => (
              <tr key={ri}>
                {r.map((cell, ci) => (
                  <td key={ci} className={wide ? (ci < 2 ? 'min-w-[5.5rem]' : 'min-w-[11rem]') : ''}>
                    <Inline text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Fade cue: only shown while there is more of the table to reach by scrolling. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-12 rounded-r-2xl bg-gradient-to-l from-ink-2 to-transparent transition-opacity duration-300"
        style={{ opacity: hasOverflow && !atEnd ? 1 : 0 }}
      />
    </div>
  )
}

function Block({ block }: { block: CaseBlock }) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="mt-14 font-display text-[1.75rem] font-light leading-tight tracking-[0.03em] text-ivory sm:text-[2rem]">
          <span className="mb-4 block h-px w-10 bg-gold/50" aria-hidden="true" />
          {block.text}
        </h2>
      )
    case 'subheading':
      return <h3 className="mt-9 font-display text-[1.3rem] font-normal leading-snug tracking-[0.03em] text-ivory/90">{block.text}</h3>
    case 'paragraph':
      return (
        <p className="mt-5 font-body text-[15.5px] font-light leading-[1.8] text-ivory/85">
          <Inline text={block.text} />
        </p>
      )
    case 'fields':
      return (
        <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-[max-content_1fr]">
          {block.items.map((f) => (
            <div key={f.label} className="contents">
              <dt className="font-body text-[11px] uppercase leading-relaxed tracking-[0.22em] text-gold/75 sm:pt-0.5">{f.label}</dt>
              <dd className="font-body text-[15px] font-light leading-relaxed text-ivory/85">{f.value}</dd>
            </div>
          ))}
        </dl>
      )
    case 'bullets':
      return (
        <ul className="mt-5 flex flex-col gap-3">
          {block.items.map((t, i) => (
            <li key={i} className="flex gap-4 font-body text-[15px] font-light leading-[1.75] text-ivory/85">
              <span aria-hidden="true" className="mt-[0.85em] block h-px w-3 shrink-0 bg-gold/60" />
              <span>
                <Inline text={t} />
              </span>
            </li>
          ))}
        </ul>
      )
    case 'numbered':
      return (
        <ol className="mt-5 flex flex-col gap-3">
          {block.items.map((t, i) => (
            <li key={i} className="flex gap-4 font-body text-[15px] font-light leading-[1.75] text-ivory/85">
              <span className="w-6 shrink-0 pt-[3px] font-body text-[11px] tracking-[0.2em] text-gold/75">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <Inline text={t} />
              </span>
            </li>
          ))}
        </ol>
      )
    case 'table':
      return <CaseTable block={block} />
    case 'teachingNote':
      return (
        <aside className="relative mt-8 rounded-[22px] border border-gold/25 bg-[linear-gradient(180deg,rgba(212,195,154,0.07),rgba(212,195,154,0.02))] px-7 py-6 shadow-[0_0_40px_rgba(212,195,154,0.06)]">
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/85">Teaching note</p>
          <p className="mt-3 font-display text-[1.15rem] italic leading-[1.65] text-ivory/90">
            <Inline text={block.text} />
          </p>
        </aside>
      )
    case 'sources':
      return (
        <div className="mt-5">
          {block.intro && <p className="font-display text-[1.05rem] italic text-ivory-dim">{block.intro}</p>}
          <ol className="mt-5 flex flex-col gap-4">
            {block.items.map((t, i) => (
              <li key={i} className="flex gap-4 font-body text-[13.5px] font-light leading-relaxed text-ivory/70">
                <span className="w-6 shrink-0 pt-[2px] font-body text-[11px] tracking-[0.2em] text-gold/70">{i + 1}.</span>
                <span>
                  <Inline text={t} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      )
  }
}
