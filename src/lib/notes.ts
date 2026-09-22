import { useCallback, useState } from 'react'
import { localStore } from './storage'

export const notesKey = (caseId: string) => `knosis:notes:${caseId}`

export function readNotes(caseId: string): string {
  return localStore.get(notesKey(caseId)) ?? ''
}

/** Textarea state for a case's reader notes, persisted to localStorage per case. */
export function useCaseNotes(caseId: string) {
  const [notes, setNotesState] = useState(() => readNotes(caseId))
  const [trackedCase, setTrackedCase] = useState(caseId)

  // Reset when the case changes without a remount (derived during render, not in an effect).
  if (trackedCase !== caseId) {
    setTrackedCase(caseId)
    setNotesState(readNotes(caseId))
  }

  const setNotes = useCallback(
    (value: string) => {
      setNotesState(value)
      localStore.set(notesKey(caseId), value)
    },
    [caseId],
  )

  return [notes, setNotes] as const
}
