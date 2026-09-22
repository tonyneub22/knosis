/**
 * The four levels of severity a reader may assign to a case.
 * Edit the bullets here — the severity page reads from this list.
 */
export type SeverityLevel = {
  level: 1 | 2 | 3 | 4
  title: string
  prompt: string
  bullets: string[]
}

export const severityPrompt = 'Consider whether these apply:'

export const severityLevels: SeverityLevel[] = [
  {
    level: 1,
    title: 'Level 1',
    prompt: severityPrompt,
    bullets: [
      'Unsettled',
      'Condition stable',
      'Mild functional impact',
      'Diagnostic duration less than 1 year for a chronic or relapsing/remitting condition',
      'Diagnostic duration relatively low considering the acute nature of the condition',
    ],
  },
  {
    level: 2,
    title: 'Level 2',
    prompt: severityPrompt,
    bullets: [
      'Condition progressing',
      'Moderate functional impact',
      'Patient reports diagnostic duration of 1–3 years for a chronic or relapsing/remitting condition',
      'Diagnostic duration disconcerting considering the acute nature of the condition',
    ],
  },
  {
    level: 3,
    title: 'Level 3',
    prompt: severityPrompt,
    bullets: [
      'Condition progressing at a concerning rate',
      'Severe functional impact',
      'Patient reports diagnostic duration of 3–5 years for a chronic or relapsing/remitting condition',
      'Diagnostic duration highly disconcerting considering the acute nature of the condition',
    ],
  },
  {
    level: 4,
    title: 'Level 4',
    prompt: severityPrompt,
    bullets: [
      'Condition rapidly progressing',
      'Organ- or life-threatening',
      'Patient reports diagnostic duration of 5+ years for a chronic or relapsing/remitting condition',
      'Diagnostic duration considered intolerable considering the acute nature of the condition',
    ],
  },
]
