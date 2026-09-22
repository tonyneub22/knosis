import { case1 } from './case-1'
import { case2 } from './case-2'
import type { CaseDoc } from './types'

export type { CaseDoc, CaseBlock } from './types'

export const cases: CaseDoc[] = [case1, case2]

export function getCase(id: string | undefined): CaseDoc | undefined {
  return cases.find((c) => c.id === id)
}

/** "Case 1 — Anti-NMDAR Encephalitis" */
export function caseLabel(c: CaseDoc): string {
  return `Case ${c.number} — ${c.shortTitle}`
}
