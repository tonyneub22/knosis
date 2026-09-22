import type { Factor, LayerMeta } from './factorTypes'

/**
 * Layer 3 — Continuity and transitions. Three contributing factors, transcribed from
 * content/pyramid-layers.md §6. Display order: E3, B2, F1.
 */
export const layer3: LayerMeta = {
  number: 3,
  title: 'Continuity and Transitions',
  subtitle: 'What is lost in the gaps between encounters. Operates over weeks and multiple visits.',
}

export const layer3Factors: Factor[] = [
  {
    code: 'E3',
    title: 'Communication and handoff failures',
    teaser: 'Information lost between shifts, between ED and inpatient team, between hospital and outpatient care, or between clinician and patient.',
    mechanism:
      'Information lost between shifts, between ED and inpatient team, between hospital and outpatient care, or between clinician and patient.',
    estimate:
      'An estimated 67% of communication errors relate to handoffs. Structured handoff programs (I-PASS) reduced medical errors by 23% and preventable adverse events by 30% in a multicenter trial. In UPSIDE, process failures in subspecialty consultation and patient experience were independently associated with harmful errors.',
    strength: 'Strong for the effect of handoff programs; the 67% figure is from Joint Commission analysis.',
    sources: [
      { ref: 33, label: 'Joint Commission 2024' },
      { ref: 34, label: 'Starmer 2014 NEJM' },
      { ref: 3, label: 'Auerbach 2024' },
    ],
  },
  {
    code: 'B2',
    title: 'Abnormal results not followed up (“lost” results)',
    teaser: 'A result returns abnormal after the encounter and no one acts on it — most common at ED discharge, hospital discharge, and when tests are pending at discharge.',
    mechanism:
      "A result returns abnormal after the encounter and no one acts on it — most common at ED discharge, hospital discharge, and when tests are pending at discharge. This is the measurable core of your “no PCP follow-up” item.",
    estimate:
      'A systematic review of 19 ambulatory studies found 6.8% to 62% of laboratory results and 1.0% to 35.7% of radiology results were not followed up. In a VA survey of 2,590 primary-care clinicians, 30% reported missing a test-result alert in the past year; clinicians received an average of 56 alerts per day and 55% said the notification system made it possible to miss results.',
    strength: 'Strong for the range; the range itself is wide because definitions differ.',
    sources: [
      { ref: 16, label: 'Callen 2011' },
      { ref: 17, label: 'Singh/VA alert survey 2013' },
      { ref: 18, label: 'Test-result follow-up implementation gaps 2021' },
    ],
  },
  {
    code: 'F1',
    title: 'No primary-care home / failed transitions',
    teaser: 'Without a longitudinal clinician, no one integrates repeated acute visits into a pattern, and pending results have no owner.',
    mechanism:
      'Without a longitudinal clinician, no one integrates repeated acute visits into a pattern, and pending results have no owner. Transition points (ED discharge, hospital discharge) are the highest-risk moments for lost results.',
    estimate:
      'Direct quantification is mostly through the test-follow-up literature (see B2). Rare-disease data show the number of clinicians consulted is the strongest determinant of delay (OR 5.15), consistent with fragmentation driving delay.',
    strength: 'Moderate; mechanism well supported, direct percentage for “no PCP” as a cause is not established.',
    sources: [
      { ref: 16, label: 'Callen 2011' },
      { ref: 5, label: 'EURORDIS 2024' },
      { ref: 18, label: 'Implementation-gaps study 2021' },
    ],
  },
]
