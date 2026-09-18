/**
 * The six levels of the Knosis pyramid, ordered top (widest band) to bottom (tip).
 * Edit titles, routes, and add subtitles here — the pyramid, text rows, and
 * placeholder pages all read from this single list.
 */
export type Level = {
  id: string
  title: string
  path: string
  subtitle?: string
}

export const levels: Level[] = [
  { id: 'structural-conditions', title: 'Structural Conditions', path: '/structural-conditions' },
  { id: 'work-system', title: 'The Work System', path: '/work-system' },
  { id: 'continuity-and-transitions', title: 'Continuity and Transitions', path: '/continuity-and-transitions' },
  { id: 'encounter', title: 'The Encounter', path: '/encounter' },
  { id: 'case-itself', title: 'The Case Itself', path: '/case-itself' },
  { id: 'reasoning-moment', title: 'The Reasoning Moment', path: '/reasoning-moment' },
]

export function findLevelByPath(pathname: string): Level | undefined {
  return levels.find((l) => l.path === pathname)
}
