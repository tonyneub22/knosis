import type { Factor } from './factorTypes'

/**
 * Layer 1 — Structural conditions. Four contributing factors, transcribed from
 * content/pyramid-layers.md §6. Display order: G1, D2, F2, G2.
 */

export const layer1 = {
  number: 1,
  title: 'Structural Conditions',
  subtitle: 'What are the constraints or biases that exist before any specific patient walks into a medical setting? What disparities are evidence of such constraints or biases?',
  scope: 'Operates over populations and years; present before any specific patient walks in.',
  band: 'Widest band, top of the pyramid.',
}

export const layer1Factors: Factor[] = [
  {
    code: 'G1',
    title: 'No accepted definition or coding for diagnostic uncertainty',
    teaser: 'Clinicians routinely leave an encounter uncertain, but the record captures a single diagnosis code.',
    mechanism:
      'Clinicians routinely leave an encounter uncertain, but the record captures a single diagnosis code. Uncertainty is not codified, so it cannot be tracked, audited, or compared across countries.',
    estimate:
      'A systematic review of 123 articles found none defined diagnostic uncertainty; the authors proposed “a subjective perception of an inability to provide an accurate explanation of the patient\'s health problem.” Tools for measuring its communication are under-developed and not widely validated. Over 40% of chronic-pain patients who have a diagnosis still believe something remains undetected.',
    strength:
      'Strong for the absence of a standard; this is the evidence gap your levels 0–4 framework addresses.',
    sources: [
      { ref: 37, label: 'Bhise 2018' },
      { ref: 38, label: 'Cox 2021' },
      { ref: 39, label: 'Communication of diagnostic uncertainty review 2023' },
    ],
  },
  {
    code: 'D2',
    title: 'Demographic disparities and implicit bias — sex, race/ethnicity, age',
    teaser: 'Symptoms in women, racial/ethnic minorities and the young are more often attributed to benign, psychological or behavioral causes.',
    mechanism:
      'Symptoms in women, racial/ethnic minorities and the young are more often attributed to benign, psychological or behavioral causes. Disparities persist within the same hospital, so access alone does not explain them.',
    estimate:
      'Female sex and non-White race were associated with 20–30% higher misdiagnosis risk across ED studies (inconsistently demonstrated, but never protective). Patients aged 18–45 with stroke were missed 6.7–7× more often than older patients. Black children with appendicitis were less likely to be correctly diagnosed than White children in the same hospital. Women wait longer for rare-disease diagnosis (OR 1.22). Stigmatizing language in the chart has been associated with diagnostic-error risk.',
    strength: 'Moderate–strong; effect sizes consistent in direction across many studies.',
    sources: [
      { ref: 1, label: 'AHRQ 2022' },
      { ref: 19, label: 'Newman-Toker 2014' },
      { ref: 24, label: 'Goyal 2020 (via [25])' },
      { ref: 5, label: 'EURORDIS 2024' },
    ],
  },
  {
    code: 'F2',
    title: 'Cost, insurance and resource constraints (patient side and system side)',
    teaser: 'Delayed presentation and unaffordable follow-up on the patient side; no MRI, specialist, or laboratory backup on the system side.',
    mechanism:
      'Patient side: delayed presentation, inability to afford follow-up or specialist visits. System side: no access to MRI, specialist, or send-out tests; low- and middle-income settings with no laboratory backup.',
    estimate:
      'In high-income settings the direct evidence that cost causes misdiagnosis is thin and largely inferential; insurance status is often invoked to explain racial disparities but does not fully explain them. Rare-disease patients in Germany incurred 7.6-fold higher direct costs during the diagnostic odyssey than matched controls (€26,999 vs €3,561), showing that delay is expensive as well as harmful. The AHRQ review notes hospital-level variation in miss rates (e.g., MI 0–29% across hospitals), consistent with resource and process differences.',
    strength: 'Weak–moderate for cost as a cause; strong for cost as a consequence.',
    sources: [
      { ref: 36, label: 'German rare-disease cost study 2025' },
      { ref: 1, label: 'AHRQ 2022' },
      { ref: 25, label: 'KFF/Newman-Toker interview' },
    ],
  },
  {
    code: 'G2',
    title: 'Detection and reporting bias',
    teaser: 'Errors are detected mainly through return visits, autopsy, malpractice claims, and voluntary reports — all of which under-count.',
    mechanism:
      'Errors are detected mainly through return visits, autopsy, malpractice claims, and voluntary reports — all of which under-count. The AHRQ overall ED rate was derived from only three prospective studies (n = 1,758) outside the US, which is why it was contested by emergency-medicine organizations. Errors are also detected often using triggers and research set-ups that exist on a ~6mo timescale. Some work goes out to two years but the diagnostic odyssey in rare disease is well documented as being much longer than the typical duration of a study of diagnostic error.',
    estimate:
      'Autopsy series historically show 8.4–24.4% major diagnostic discrepancies. Retrospective radiology discrepancy rates (~30%) far exceed real-time rates (3–5%).',
    strength: 'Strong that under-counting exists; magnitude uncertain.',
    sources: [
      { ref: 40, label: 'Critical appraisal of AHRQ report 2023' },
      { ref: 35, label: 'AJR review' },
      { ref: 4, label: 'Newman-Toker 2023' },
    ],
  },
]
