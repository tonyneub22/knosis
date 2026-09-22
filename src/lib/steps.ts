/** The Layer 1 flow, in order. */
export const steps = [
  { id: 'overview', label: 'Overview' },
  { id: 'case', label: 'Case' },
  { id: 'read', label: 'Read' },
  { id: 'severity', label: 'Severity' },
  { id: 'feedback', label: 'Feedback' },
] as const

export type StepId = (typeof steps)[number]['id']

export function stepFromPath(pathname: string): StepId | null {
  if (pathname.endsWith('/results')) return null
  if (/\/cases\/[^/]+\/feedback/.test(pathname)) return 'feedback'
  if (/\/cases\/[^/]+\/severity/.test(pathname)) return 'severity'
  if (/\/cases\/[^/]+\/read/.test(pathname)) return 'read'
  if (/\/cases(\/|$)/.test(pathname)) return 'case'
  return 'overview'
}
