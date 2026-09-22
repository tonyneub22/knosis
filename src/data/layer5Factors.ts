import type { Factor, LayerMeta } from './factorTypes'

/**
 * Layer 5 — The case itself. Three contributing factors, transcribed from
 * content/pyramid-layers.md §6. Display order: C1, C2, D3.
 */
export const layer5: LayerMeta = {
  number: 5,
  title: 'The Case Itself',
  subtitle: "What this particular patient's presentation makes possible. Operates over one patient's problem.",
}

export const layer5Factors: Factor[] = [
  {
    code: 'C1',
    title: 'Atypical, non-specific, or early presentation',
    teaser: 'Symptoms that overlap with benign, common conditions (dizziness, headache, fatigue, myalgia, behavioral change) are the strongest disease-side predictor of error.',
    mechanism:
      'Symptoms that overlap with benign, common conditions (dizziness, headache, fatigue, myalgia, behavioral change) are the strongest disease-side predictor of error. Roughly 95% of patients with such symptoms in acute care do not have the dangerous disease, so the base rate works against detection.',
    estimate:
      'For stroke, dizziness/vertigo raises the odds of misdiagnosis 14-fold compared with motor weakness (40% missed vs 4%). Spinal abscess is missed 56% of the time; MI only 1.5%. Overall stroke miss rate ~17%, about 10× that of MI despite comparable incidence. Up to 12.7% of patients later admitted for stroke had been sent home from an ED in the preceding 30 days, mostly with dizziness or headache.',
    strength: 'Strong; large population datasets.',
    sources: [
      { ref: 1, label: 'AHRQ 2022' },
      { ref: 19, label: 'Newman-Toker 2014 (Diagnosis)' },
    ],
  },
  {
    code: 'C2',
    title: 'Rare disease and the diagnostic odyssey',
    teaser: 'Low prevalence plus non-specific symptoms plus few clinicians having ever seen a case.',
    mechanism:
      'Low prevalence plus non-specific symptoms plus few clinicians having ever seen a case. Misdiagnosis as a psychiatric condition is particularly common.',
    estimate:
      'Average time to diagnosis 4.7 years across 1,675 rare diseases; 56% diagnosed more than 6 months after first medical contact; 60% first misdiagnosed with another physical disease and 60% with a psychological condition or dismissed. Determinants of delay: symptom onset in childhood (OR 3.1) or adolescence (OR 4.8), being a woman (OR 1.22), number of clinicians consulted (OR 5.15), any misdiagnosis (OR 2.48). Referral to a center of expertise shortened the journey by 1.1 years. A US survey of 3,471 patients found 46% received a misdiagnosis and patients saw an average of four physicians and had seven tests before diagnosis.',
    strength: 'Strong for magnitude (large surveys); patient-reported, so misdiagnosis is defined by the patient.',
    sources: [
      { ref: 5, label: 'EURORDIS/Faye 2024' },
      { ref: 20, label: 'US rare-disease patient survey (Rare Patient Voice / SWAN)' },
      { ref: 15, label: 'Clinician survey 2023' },
    ],
  },
  {
    code: 'D3',
    title: 'Prior visits and prior labels (“bounce-back” patients)',
    teaser: 'A patient who has already been seen and labeled is at higher risk of the label being carried forward — the previous diagnosis becomes an anchor.',
    mechanism:
      'A patient who has already been seen and labeled is at higher risk of the label being carried forward — the previous diagnosis becomes an anchor. Return visits are also the main way diagnostic errors are detected, so this is both a cause and a signal.',
    estimate:
      'In ED-based self-reported error cases, the most common initial misdiagnoses were common conditions in the same organ system as the missed disease (e.g., “primary headache” → stroke in 80% of those errors; “upper GI disease” → obstruction/peritonitis in 27%). Formal quantification of the added risk from a prior benign label is limited; the Ly 2023 JAMA Internal Medicine study demonstrated that a triage label of CHF measurably reduced PE testing in dyspneic patients (anchoring in a natural experiment).',
    strength: 'Moderate; direct estimates of risk conferred by a prior ED visit are sparse — this is a gap your project could fill.',
    sources: [
      { ref: 26, label: 'Japanese ED cognitive-bias study 2022' },
      { ref: 27, label: 'Ly 2023' },
    ],
  },
]
