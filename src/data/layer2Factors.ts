import type { Factor, LayerMeta } from './factorTypes'

/**
 * Layer 2 — The work system. Three contributing factors, transcribed from
 * content/pyramid-layers.md §6. Display order: E1, E2, E4.
 */
export const layer2: LayerMeta = {
  number: 2,
  title: 'The Work System',
  subtitle: 'The conditions in the building on a given shift. Operates over a department and a day.',
}

export const layer2Factors: Factor[] = [
  {
    code: 'E1',
    title: 'Crowding, boarding and patient load',
    teaser: 'High census delays testing, imaging and consultation and increases interruptions.',
    mechanism:
      'High census delays testing, imaging and consultation and increases interruptions. The evidence is more nuanced than commonly assumed: boarding of the individual patient is associated with error; departmental crowding as measured by work score was not, in the largest recent cohort.',
    estimate:
      "In 250,049 ED encounters (2018–2023), patients who were themselves boarding had 1.60× the adjusted error rate (95% CI 1.42–1.82); ESI-1 patients 2.9× and ESI-2 1.5×. Higher ED work score (crowding) was not associated with more error. Earlier work (Pines 2011) did find an association between crowding and preventable errors. System-related factors overall were present in 65% of Graber's cases, dominated by policy/process, teamwork and communication problems.",
    strength: 'Moderate; mixed across studies, likely because “crowding” is measured many different ways.',
    sources: [
      { ref: 28, label: 'ED boarding, crowding and error 2025' },
      { ref: 29, label: 'Pines 2011 (via [30])' },
      { ref: 6, label: 'Graber 2005' },
    ],
  },
  {
    code: 'E2',
    title: 'Clinician fatigue, shift timing and burnout',
    teaser: 'Sleep-related impairment reduces attention and the analytic (System 2) checking that catches anchoring.',
    mechanism: 'Sleep-related impairment reduces attention and the analytic (System 2) checking that catches anchoring.',
    estimate:
      'Moderate, high and very high sleep-related impairment were associated with 53%, 96% and 97% higher odds of self-reported clinically significant error (OR 1.53, 1.96, 1.97). Emergency physicians spent 23.5% of on-shift hours at fatigue levels equivalent to a 0.08% blood alcohol level; night shifts had the highest fatigue scores. In physician self-report, 75.9% of memorable ED diagnostic errors occurred on the night shift after 5 PM.',
    strength: 'Moderate; self-report of error is the main outcome in most studies.',
    sources: [
      { ref: 31, label: 'Trockel/physician sleep study' },
      { ref: 32, label: 'Objective EP fatigue study 2022' },
      { ref: 26, label: 'Japanese ED study' },
    ],
  },
  {
    code: 'E4',
    title: 'Information overload, EHR design and alert fatigue',
    teaser: 'Fragmented records, copy-forward notes, and high alert volumes bury the signal.',
    mechanism: 'Fragmented records, copy-forward notes, and high alert volumes bury the signal.',
    estimate:
      '56 alerts per clinician per day; 30% missed at least one in the past year (VA). Retrospective radiology error rates ~30% versus 3–5% real-time, attributed in part to rising workload.',
    strength: 'Moderate.',
    sources: [
      { ref: 17, label: 'VA alert survey 2013' },
      { ref: 35, label: 'AJR radiology error review' },
    ],
  },
]
