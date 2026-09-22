import { sessionStore } from './storage'
import type { SeverityValue } from './submissions'

const key = (caseId: string) => `knosis:severity:${caseId}`

export function saveSeverity(caseId: string, level: SeverityValue) {
  sessionStore.set(key(caseId), String(level))
}

export function readSeverity(caseId: string): SeverityValue | null {
  const raw = sessionStore.get(key(caseId))
  const n = Number(raw)
  return n === 1 || n === 2 || n === 3 || n === 4 ? n : null
}

export function clearSeverity(caseId: string) {
  sessionStore.remove(key(caseId))
}
