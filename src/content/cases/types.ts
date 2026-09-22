/**
 * Structured case content. Each case is a list of blocks rendered by CaseRenderer.
 * Inline text supports **bold** and _italic_ markers.
 */
export type CaseBlock =
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'fields'; items: { label: string; value: string }[] }
  | { type: 'bullets'; items: string[] }
  | { type: 'numbered'; items: string[] }
  | { type: 'table'; columns: string[]; rows: string[][] }
  | { type: 'teachingNote'; text: string }
  | { type: 'sources'; intro?: string; items: string[] }

export type CaseDoc = {
  id: 'case-1' | 'case-2'
  number: number
  /** Short name used in menus, e.g. "Anti-NMDAR Encephalitis". */
  shortTitle: string
  /** Full title as printed in the source document. */
  title: string
  subtitle: string
  disclaimer: string
  /** Two lines drawn from the chief complaint, shown on the case picker. */
  teaser: [string, string]
  blocks: CaseBlock[]
}
