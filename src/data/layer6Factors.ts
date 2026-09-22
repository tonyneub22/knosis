import type { Factor, LayerMeta } from './factorTypes'

/**
 * Layer 6 — The reasoning moment. Three contributing factors, transcribed from
 * content/pyramid-layers.md §6. Display order: A1, A2, A4.
 */
export const layer6: LayerMeta = {
  number: 6,
  title: 'The Reasoning Moment',
  subtitle: 'One clinician, one decision to stop considering alternatives. Operates over seconds.',
}

/** The document's extra framing line for this layer (§6, "The tip."). */
export const layer6Intro =
  'Present in roughly three-quarters of diagnostic errors in every major record-review study. Importantly, these are mostly failures of synthesis, not of knowledge.'

export const layer6Factors: Factor[] = [
  {
    code: 'A1',
    title: 'Premature closure and anchoring',
    teaser: 'Settling on a diagnosis early and failing to keep considering alternatives (premature closure), or fixing on an initial impression — often from triage notes, a prior visit, or the chief complaint — and interpreting later data through that lens (anchoring).',
    mechanism:
      'Settling on a diagnosis early and failing to keep considering alternatives (premature closure), or fixing on an initial impression — often from triage notes, a prior visit, or the chief complaint — and interpreting later data through that lens (anchoring). Both are amplified by time pressure and by a prior label such as “anxiety” or “muscle strain.”',
    estimate:
      'Cognitive factors present in 74% of 100 internal-medicine errors (Graber); premature closure was the single most common cause. In a self-reflection survey of 130 Japanese physicians, anchoring was reported in 60.0% and premature closure in 58.5% of memorable error cases. A systematic review (Saposnik) found cognitive biases associated with diagnostic error in 36.5–77% of case studies. In simulation, first-year residents showed premature closure in 78.6% and anchoring in 75.7% of scenarios.',
    strength: 'Consistent across record review, self-report, simulation and systematic review; magnitude varies by method.',
    sources: [
      { ref: 6, label: 'Graber 2005' },
      { ref: 7, label: 'Watari 2022' },
      { ref: 8, label: 'Saposnik 2016 (via [9])' },
      { ref: 10, label: 'Sinha simulation study' },
    ],
  },
  {
    code: 'A2',
    title: 'Availability and representativeness heuristics',
    teaser: 'Judging likelihood by how easily a diagnosis comes to mind (recent cases, common diseases) or by how closely a patient resembles a mental prototype.',
    mechanism:
      'Judging likelihood by how easily a diagnosis comes to mind (recent cases, common diseases) or by how closely a patient resembles a mental prototype. Drives “common things are common” reasoning that misses rare disease and atypical presentations.',
    estimate:
      'Availability bias reported in 46.2% of self-reported error cases; “hassle bias” (avoiding a work-up that is inconvenient) in 33.1%. Physicians attributed an average of 3.08 biases to each error.',
    strength: 'Moderate — self-report; experimental studies confirm availability bias can be induced and is neutralized by reflective reasoning.',
    sources: [
      { ref: 7, label: 'Watari 2022' },
      { ref: 11, label: 'Mamede/Schmidt experimental work (summarized in [12])' },
    ],
  },
  {
    code: 'A4',
    title: 'Knowledge deficits (disease-specific education gaps)',
    teaser: 'Not knowing the presentation, triggers, or red flags of a specific condition.',
    mechanism:
      'Not knowing the presentation, triggers, or red flags of a specific condition. Ranks low for common disease in specialist settings but high for rare disease.',
    estimate:
      "Faulty or inadequate knowledge was “uncommon” in Graber's series — about 4% of cognitive factors, or 3% of all factors — and was concentrated in rare conditions. Conversely, in a multinational survey of clinicians on rare disease, 38–44% reported barriers in knowledge of signs/symptoms, time to investigate, guideline availability, test access, and referral; only 19% were mostly or very confident making a rare-disease diagnosis, and 59% said they never or rarely see one despite a population prevalence of 3.5–5.9%.",
    strength: 'Strong for the general claim (knowledge is a minor factor overall); moderate (survey-based) for the rare-disease claim.',
    sources: [
      { ref: 6, label: 'Graber 2005' },
      { ref: 15, label: 'Rare-disease clinician survey 2023' },
    ],
  },
]
