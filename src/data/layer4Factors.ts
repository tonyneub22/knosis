import type { Factor, LayerMeta } from './factorTypes'

/**
 * Layer 4 — The encounter. Three contributing factors, transcribed from
 * content/pyramid-layers.md §6. Display order: A3, D1, B1.
 */
export const layer4: LayerMeta = {
  number: 4,
  title: 'The Encounter',
  subtitle: 'One visit, one conversation. Operates over twenty minutes.',
}

export const layer4Factors: Factor[] = [
  {
    code: 'A3',
    title: 'Faulty data gathering — inadequate history and examination',
    teaser: 'Not eliciting or not weighing key history (timeline, triggers, prior episodes, prior visits) and incomplete examination.',
    mechanism:
      "Not eliciting or not weighing key history (timeline, triggers, prior episodes, prior visits) and incomplete examination. This is where a patient's “non-detailed history” interacts with clinician technique: most breakdowns were judged to be in elicitation and synthesis rather than patient concealment.",
    estimate:
      "In 190 confirmed primary-care errors, breakdowns in the patient–clinician encounter occurred in 78.9%; specifically history-taking 56.3%, physical examination 47.4%, and ordering diagnostic tests 57.4%. In Schiff's 583 errors, history accounted for 10% and exam 10% of the primary failure point. In UPSIDE (hospitalized patients), patient-assessment problems had the highest attributable fraction: eliminating them would remove an estimated 21.4% of errors.",
    strength: 'Strong and consistent across outpatient and inpatient settings.',
    sources: [
      { ref: 13, label: 'Singh 2013' },
      { ref: 14, label: 'Schiff 2009' },
      { ref: 3, label: 'Auerbach 2024' },
    ],
  },
  {
    code: 'D1',
    title: 'Communication barriers — language, health literacy, ability to give a history',
    teaser: 'Limited English proficiency, use of family members as interpreters, cognitive impairment, intoxication, or psychiatric symptoms that make the patient\'s account harder to obtain or easier to discount.',
    mechanism:
      "Limited English proficiency, use of family members as interpreters, cognitive impairment, intoxication, or psychiatric symptoms that make the patient's account harder to obtain or easier to discount.",
    estimate:
      "Patient-related factors were present in 44% of Graber's error cases. Among limited-English-proficiency inpatients, 52.4% of adverse events were due to communication errors versus 35.9% for English speakers, and 49.1% involved physical harm versus 29.5%. Language-concordant care reduced adverse events (adjusted OR 0.25) and in-hospital death (OR 0.44) in an ED cohort.",
    strength: 'Moderate–strong; direct diagnostic-error data for LEP are limited, most evidence is for adverse events generally.',
    sources: [
      { ref: 6, label: 'Graber 2005' },
      { ref: 21, label: 'Divi 2007' },
      { ref: 22, label: 'Language-concordant ED care study (via [23])' },
    ],
  },
  {
    code: 'B1',
    title: 'Failure to order the right test, misinterpretation, or wrong test',
    teaser: 'The right test is not ordered (or is deferred), the result is misread, or a normal test falsely reassures.',
    mechanism:
      'The right test is not ordered (or is deferred), the result is misread, or a normal test falsely reassures. Includes false-negative imaging (e.g., CT misses >80% of acute ischemic strokes in the first 48 hours).',
    estimate:
      "Testing was the most common failure point in Schiff's 583 physician-reported errors (44%, including ordering, reporting and follow-up), ahead of clinician assessment (32%). In UPSIDE, test ordering and interpretation problems had an attributable fraction of 19.9%; together with assessment problems, eliminating both would cut errors by ~40%. In Singh's primary-care series, test-ordering problems were present in 57.4% of errors.",
    strength: 'Strong; replicated in inpatient, outpatient and ED settings.',
    sources: [
      { ref: 14, label: 'Schiff 2009' },
      { ref: 3, label: 'Auerbach 2024' },
      { ref: 13, label: 'Singh 2013' },
      { ref: 1, label: 'AHRQ 2022' },
    ],
  },
]
