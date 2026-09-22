import type { ReactNode } from 'react'
import Drawer from '../ui/Drawer'
import { Inline } from '../shared/Inline'
import { references } from '../../data/references'
import type { Factor, LayerMeta } from '../../data/factorTypes'

type Props = { factor: Factor | null; onClose: () => void; layer: LayerMeta }

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="border-t border-ivory/[0.08] py-7 first:border-t-0 first:pt-0">
      <h3 className="font-body text-[11px] uppercase tracking-[0.3em] text-gold/80">{label}</h3>
      <div className="mt-4 font-body text-[15px] font-light leading-[1.75] text-ivory/85">{children}</div>
    </section>
  )
}

/** Right-side drawer for a factor's full evidence. Same four sections and close behavior for every layer. */
export default function FactorDrawer({ factor, onClose, layer }: Props) {
  const eyebrow = factor ? `Layer ${layer.number} · ${layer.title}` : undefined

  return (
    <Drawer open={factor !== null} onClose={onClose} label={factor ? factor.title : 'Factor'} eyebrow={eyebrow} title={factor?.title}>
      {factor && (
        <div>
          <Section label="What it is / mechanism">
            <p>
              <Inline text={factor.mechanism} />
            </p>
          </Section>
          <Section label="Best available estimate">
            <p>
              <Inline text={factor.estimate} />
            </p>
          </Section>
          <Section label="Strength of evidence">
            <p className="font-display text-[1.25rem] italic leading-snug text-ivory">
              <Inline text={factor.strength} />
            </p>
          </Section>
          <Section label="Key sources">
            <ol className="flex flex-col gap-4">
              {factor.sources.map((s) => (
                <li key={`${s.ref}-${s.label}`} className="flex gap-4">
                  <span className="w-9 shrink-0 font-body text-[11px] tracking-[0.2em] text-gold/70">[{s.ref}]</span>
                  <span className="flex flex-col gap-1">
                    <span className="text-ivory">{s.label}</span>
                    {references[s.ref] && (
                      <span className="text-[13px] leading-relaxed text-ivory-dim">
                        <Inline text={references[s.ref]} />
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </Section>
        </div>
      )}
    </Drawer>
  )
}
