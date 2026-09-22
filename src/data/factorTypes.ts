/** Shared shapes for every pyramid layer's contributing factors. */
export type FactorSource = {
  ref: number
  label: string
}

export type Factor = {
  code: string
  title: string
  /** One-line teaser shown on the card — the verbatim first sentence of `mechanism`. */
  teaser: string
  mechanism: string
  estimate: string
  strength: string
  sources: FactorSource[]
}

export type LayerMeta = {
  number: number
  title: string
  subtitle: string
}
