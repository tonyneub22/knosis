/**
 * Layer 1 — Structural conditions. Four contributing factors, transcribed from
 * content/pyramid-layers.md §6. Display order: G1, D2, F2, G2.
 */
export type FactorSource = {
  ref: number
  label: string
}

export type Factor = {
  code: string
  title: string
  /** One-line teaser shown on the card. */
  teaser: string
  mechanism: string
  estimate: string
  strength: string
  sources: FactorSource[]
}

export const layer1 = {
  number: 1,
  title: 'Structural Conditions',
  subtitle: 'Who gets believed, who can reach care, and the fact that none of this is counted.',
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
      'Errors are detected mainly through return visits, autopsy, malpractice claims, and voluntary reports — all of which under-count. The AHRQ overall ED rate was derived from only three prospective studies (n = 1,758) outside the US, which is why it was contested by emergency-medicine organizations.',
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

/** Full citations for the references cited by Layer 1 factors (from the document's reference list). */
export const layer1References: Record<number, string> = {
  1: 'Newman-Toker DE, Peterson SM, Badihian S, et al. Diagnostic Errors in the Emergency Department: A Systematic Review. AHRQ Comparative Effectiveness Review No. 258. Rockville, MD: Agency for Healthcare Research and Quality; December 2022. https://effectivehealthcare.ahrq.gov/products/diagnostic-errors-emergency-updated/research',
  4: 'Newman-Toker DE, Nassery N, Schaffer AC, et al. Burden of serious harms from diagnostic error in the USA. BMJ Qual Saf. 2024;33(2):109–120. https://pmc.ncbi.nlm.nih.gov/articles/PMC10792094/',
  5: 'Faye F, Crocione C, Anido de Peña R, et al. Time to diagnosis and determinants of diagnostic delays of people living with a rare disease: results of a Rare Barometer retrospective patient survey. Eur J Hum Genet. 2024. https://www.nature.com/articles/s41431-024-01604-z',
  19: 'Newman-Toker DE, Moy E, Valente E, Coffey R, Hines AL. Missed diagnosis of stroke in the emergency department: a cross-sectional analysis of a large population-based sample. Diagnosis (Berl). 2014;1(2):155–166.',
  24: 'Goyal MK, et al. Racial and ethnic disparities in the delayed diagnosis of appendicitis among children. Acad Emerg Med. 2020.',
  25: 'Szabo L. Women and minorities bear the brunt of medical misdiagnosis (interviews with Newman-Toker, Singh, Goyal). KFF Health News, January 2024. https://kffhealthnews.org/news/article/medical-misdiagnosis-women-minorities-health-care-bias/',
  35: 'Cognitive and system factors contributing to diagnostic errors in radiology. AJR Am J Roentgenol. https://ajronline.org/doi/10.2214/AJR.12.10375',
  36: 'The cost of the diagnostic odyssey of patients with suspected rare diseases (German claims data, n = 1,243). 2025. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12065212/',
  37: 'Bhise V, Rajan SS, Sittig DF, Morgan RO, Chaudhary P, Singh H. Defining and measuring diagnostic uncertainty in medicine: a systematic review. J Gen Intern Med. 2018;33(1):103–115. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5756158/',
  38: 'Cox CL, et al. Diagnostic uncertainty in primary care: what is known about its communication, and what are the associated ethical issues? Fam Pract. 2021;38(5):654–668. https://academic.oup.com/fampra/article/38/5/654/6256041',
  39: 'Communication of diagnostic uncertainty in primary care and its impact on patient experience: an integrative systematic review. J Gen Intern Med. 2023. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9971421/',
  40: 'A critical appraisal of AHRQ\'s “Diagnostic Errors” report. West J Emerg Med. 2023. https://pmc.ncbi.nlm.nih.gov/articles/PMC10121120/',
}
