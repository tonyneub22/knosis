import type { CaseDoc } from './types'

/** Transcribed verbatim from content/case-1-anti-nmdar-encephalitis.docx. Edit freely. */
export const case1: CaseDoc = {
  id: 'case-1',
  number: 1,
  shortTitle: 'Anti-NMDAR Encephalitis',
  title: 'Anti-NMDA Receptor Encephalitis',
  subtitle: 'Simulated Patient Case Report · Neurology / Emergency Medicine · Diagnostic Uncertainty Series',
  disclaimer:
    'SIMULATED PATIENT CASE — This patient, all names, dates, and clinical values are fictional and were constructed for education and simulation. Clinical features are modeled on the peer-reviewed literature cited at the end of this document.',
  teaser: [
    '“She\'s not herself — she\'s talking to people who aren\'t there and her mouth keeps moving.”',
    'A roommate\'s account of a four-week decline across three emergency visits, none of which produced a unifying diagnosis.',
  ],
  blocks: [
    { type: 'heading', text: 'Patient Identification' },
    {
      type: 'fields',
      items: [
        { label: 'Name', value: 'Maya R. Castellanos (fictional)' },
        { label: 'Age / Sex', value: '23-year-old female' },
        { label: 'Date of birth', value: '04/17/2003 (fictional)' },
        {
          label: 'Ethnicity / Language',
          value: 'Hispanic (Puerto Rican descent); primary language English, fluent Spanish',
        },
        { label: 'Occupation', value: 'Second-year graduate student (public health); part-time barista' },
        { label: 'Living situation', value: 'Shares an apartment with one roommate; parents live 2 hours away' },
        { label: 'Insurance', value: 'Student health plan' },
        {
          label: 'Source of history',
          value:
            'Patient (limited reliability at time of admission), roommate, mother, ED records from three prior visits',
        },
        {
          label: 'Date of current encounter',
          value: 'Day 0 = admission to inpatient medicine after transfer from psychiatric emergency service',
        },
      ],
    },

    { type: 'heading', text: 'Chief Complaint' },
    {
      type: 'paragraph',
      text: '“She\'s not herself — she\'s talking to people who aren\'t there and her mouth keeps moving.” (roommate). Patient unable to provide a coherent chief complaint.',
    },

    { type: 'heading', text: 'History of Present Illness' },
    {
      type: 'paragraph',
      text: 'Ms. Castellanos is a previously healthy 23-year-old woman with no personal or family psychiatric history who presents with a 4-week progressive illness that has now culminated in agitation, hallucinations, orofacial dyskinesias, autonomic instability, and a witnessed generalized seizure. The course is best understood as a sequence of three emergency department (ED) visits over 19 days, none of which produced a unifying diagnosis.',
    },
    {
      type: 'paragraph',
      text: 'Approximately 4 weeks ago (Day −28) she developed a flu-like prodrome (early symptoms that signal the onset of an illness, before its characteristic features appear): low-grade fever to 38.1 °C, diffuse headache, malaise, and nausea lasting about 5 days. She missed one week of classes. The headache persisted after the fever resolved. Beginning around Day −21 her roommate noticed she was sleeping only 2–3 hours per night, had become unusually irritable, and was “talking really fast.” She began expressing a fixed belief that her academic advisor was reading her text messages. She did not use any substances beyond occasional alcohol.',
    },
    {
      type: 'paragraph',
      text: 'Over the subsequent 2 weeks symptoms escalated to include word-finding difficulty, short-term memory lapses (repeatedly asking the same question), episodes of staring and unresponsiveness lasting 30–60 seconds, and a new involuntary chewing/lip-smacking movement that the roommate initially attributed to anxiety. Two days before the current admission she was placed on an involuntary psychiatric hold after her third ED visit (see below). Within 36 hours of receiving scheduled haloperidol she developed rigidity, tachycardia to 140s, temperature of 39.4 °C, labile blood pressure, and a 2-minute generalized tonic-clonic seizure. She was transferred to inpatient medicine for evaluation of possible neuroleptic malignant syndrome versus an organic encephalopathy.',
    },

    { type: 'heading', text: 'Prior Emergency Department Visits (Undiagnosed)' },
    {
      type: 'paragraph',
      text: 'The following encounters preceded the correct diagnosis. Each visit addressed the presenting symptom but did not integrate the evolving trajectory.',
    },
    {
      type: 'table',
      columns: ['Visit', 'Day', 'Presenting complaint', 'Key ED findings', 'ED working diagnosis', 'Disposition'],
      rows: [
        [
          'ED #1',
          'Day −24',
          '5 days of headache, low-grade fever, nausea, poor sleep',
          'T 37.9 °C, HR 96, neck supple, non-focal neuro exam, CBC/BMP normal, urine hCG negative, no imaging',
          'Viral syndrome; tension-type headache',
          'Discharged with acetaminophen, hydration advice; return precautions',
        ],
        [
          'ED #2',
          'Day −15',
          'Roommate-driven visit: insomnia, racing thoughts, paranoia about advisor, tearful, “not sleeping in a week”',
          'Afebrile, HR 104, oriented ×4, tangential speech, no hallucinations elicited, urine drug screen negative, TSH normal, no LP or imaging; brief social-work evaluation noted “academic stress”',
          'Acute stress disorder / generalized anxiety; rule out substance-induced mood disorder',
          'Discharged with lorazepam 0.5 mg PRN, outpatient counseling referral (first available appointment 3 weeks out)',
        ],
        [
          'ED #3',
          'Day −5',
          'Brought by campus police after found wandering, shouting at strangers; auditory hallucinations, disorganized speech, intermittent staring',
          'Afebrile, HR 112, BP 138/88, uncooperative with full neuro exam but “moves all extremities, no focal deficit”; CT head without contrast normal; CBC/BMP normal; UDS negative; ammonia normal',
          'First-episode psychosis; rule out schizophreniform disorder / bipolar I with psychotic features',
          'Involuntary psychiatric hold; admitted to psychiatric emergency service; haloperidol 5 mg IM ×2 then scheduled PO',
        ],
      ],
    },
    {
      type: 'teachingNote',
      text: 'Across three visits the patient\'s presentation moved from a viral prodrome to a subacute psychiatric syndrome to a florid neuropsychiatric picture. The pattern is highly characteristic of anti-NMDAR encephalitis, in which roughly three-quarters of patients are first seen by psychiatric services, and in which an initial diagnosis of a primary psychiatric disorder is a frequent and well-documented cause of delayed immunotherapy.',
    },

    { type: 'heading', text: 'Past Medical History' },
    {
      type: 'bullets',
      items: [
        'No chronic medical conditions',
        'Childhood asthma, resolved by age 12; no recent inhaler use',
        'No prior psychiatric diagnosis, hospitalization, or medication',
        'No history of seizures, head trauma, or CNS infection',
      ],
    },
    { type: 'subheading', text: 'Past Surgical History' },
    { type: 'bullets', items: ['None'] },
    { type: 'subheading', text: 'Medications (prior to illness)' },
    {
      type: 'bullets',
      items: [
        'Combined oral contraceptive (ethinyl estradiol/norgestimate), daily',
        'Lorazepam 0.5 mg PRN (prescribed at ED #2; took 3 doses total)',
        'Haloperidol 5 mg PO BID (started at ED #3, 2 days prior to admission)',
      ],
    },
    { type: 'subheading', text: 'Allergies' },
    { type: 'bullets', items: ['No known drug allergies'] },
    { type: 'subheading', text: 'Immunizations' },
    { type: 'bullets', items: ['Up to date, including MMR, varicella, HPV, and seasonal influenza'] },

    { type: 'heading', text: 'Family History' },
    {
      type: 'bullets',
      items: [
        'Mother (52): hypothyroidism (Hashimoto\'s)',
        'Father (55): hypertension',
        'Maternal aunt: systemic lupus erythematosus',
        'No family history of schizophrenia, bipolar disorder, epilepsy, or early dementia',
      ],
    },

    { type: 'heading', text: 'Social History' },
    {
      type: 'bullets',
      items: [
        'Lives with roommate in off-campus apartment; strong family support',
        'Alcohol: 2–4 drinks on weekends; no binge pattern reported',
        'Tobacco/vaping: never',
        'Cannabis: tried twice in college, none in the past 2 years; no other recreational drugs (corroborated by roommate and two negative urine drug screens)',
        'Sexually active with one male partner; uses OCP and condoms',
        'No recent travel outside the state; no animal exposures, tick bites, or sick contacts beyond a classmate with a “cold”',
        'High-functioning student prior to illness (GPA 3.8), no prior academic or occupational impairment',
      ],
    },

    { type: 'heading', text: 'Review of Systems (per roommate and mother; patient unable to participate reliably)' },
    {
      type: 'bullets',
      items: [
        'Constitutional: prodromal fever (resolved), 3–4 kg weight loss over 4 weeks, profound insomnia',
        'Neurologic: headache, memory loss, word-finding difficulty, staring spells, new orofacial and hand movements, one witnessed generalized seizure',
        'Psychiatric: paranoia, auditory hallucinations, agitation alternating with periods of mutism and withdrawal',
        'Cardiovascular: palpitations',
        'Respiratory: no cough or dyspnea prior to admission',
        'GI: nausea during prodrome; decreased oral intake for 1 week',
        'GU: no dysuria; last menstrual period 6 weeks ago (on OCP; hCG negative ×3)',
        'Skin: no rash',
        'Musculoskeletal: no joint pain or swelling',
      ],
    },

    { type: 'heading', text: 'Physical Examination (Day 0, inpatient medicine)' },
    { type: 'subheading', text: 'Vital Signs' },
    {
      type: 'table',
      columns: ['Parameter', 'Value', 'Comment'],
      rows: [
        ['Temperature', '39.2 °C (102.6 °F)', 'Hyperthermia'],
        ['Heart rate', '134 bpm, regular', 'Sinus tachycardia; fluctuating 70–140 over prior 12 h'],
        ['Blood pressure', '162/98 mmHg', 'Labile; range 88/50 – 170/104 over 12 h'],
        ['Respiratory rate', '26 /min', 'Periods of shallow breathing noted by nursing'],
        ['SpO₂', '94% on room air', 'Improved to 98% on 2 L nasal cannula'],
        ['Weight / BMI', '56 kg / 21.2', 'Down from ~60 kg baseline'],
      ],
    },
    { type: 'subheading', text: 'General' },
    {
      type: 'paragraph',
      text: 'Young woman lying in bed, diaphoretic, intermittently agitated and thrashing, then abruptly mute and staring. Does not follow commands consistently. Speech limited to perseverative single words (“no, no, no”).',
    },
    { type: 'subheading', text: 'HEENT / Neck' },
    {
      type: 'paragraph',
      text: 'Pupils 5 mm, equal, sluggishly reactive. Continuous orofacial dyskinesias: lip smacking, jaw opening/closing, tongue protrusion. Bite injury on the lateral tongue. Oropharynx clear. Neck supple; no meningismus.',
    },
    { type: 'subheading', text: 'Cardiovascular / Respiratory / Abdomen' },
    {
      type: 'paragraph',
      text: 'Tachycardic, regular, no murmurs. Lungs clear bilaterally with reduced excursion. Abdomen soft, non-tender, no organomegaly, no palpable masses.',
    },
    { type: 'subheading', text: 'Skin' },
    { type: 'paragraph', text: 'Diaphoretic. No rash, no petechiae, no needle marks.' },
    { type: 'subheading', text: 'Neurologic' },
    {
      type: 'bullets',
      items: [
        'Mental status: fluctuating level of consciousness; GCS 10–13 (E4 V1–3 M5–6). Not oriented. Cannot participate in formal cognitive testing.',
        'Cranial nerves: pupils as above; intermittent conjugate gaze deviation to the right; face symmetric between dyskinetic movements; gag present.',
        'Motor: diffuse, waxy increased tone with elements of both rigidity and catatonic posturing (holds limbs in positions where placed); choreoathetoid movements of the fingers bilaterally; no focal weakness identified.',
        'Reflexes: 3+ symmetric throughout; plantar responses flexor.',
        'Sensory / coordination: unable to assess.',
        'Catatonic features: negativism, echolalia, posturing (Bush-Francis Catatonia Rating Scale estimated 18).',
      ],
    },
    { type: 'subheading', text: 'Psychiatric' },
    {
      type: 'paragraph',
      text: 'Affect labile, ranging from terror to blank. Responds to internal stimuli. No coherent thought content elicitable. Insight and judgment absent.',
    },

    { type: 'heading', text: 'Diagnostic Studies' },
    { type: 'subheading', text: 'Laboratory Results' },
    {
      type: 'table',
      columns: ['Test', 'Result', 'Reference', 'Interpretation'],
      rows: [
        ['WBC', '11.8 ×10⁹/L', '4.0–11.0', 'Mild leukocytosis'],
        ['Hemoglobin', '12.9 g/dL', '12.0–16.0', 'Normal'],
        ['Platelets', '268 ×10⁹/L', '150–400', 'Normal'],
        ['Sodium', '134 mmol/L', '135–145', 'Mildly low'],
        ['Creatinine', '0.8 mg/dL', '0.5–1.0', 'Normal'],
        ['Creatine kinase', '1,840 U/L', '30–200', 'Elevated (agitation, rigidity, seizure)'],
        ['Ammonia', '22 µmol/L', '11–35', 'Normal'],
        ['TSH / free T4', '2.1 mIU/L / 1.1 ng/dL', 'Normal', 'Normal'],
        ['Urine drug screen (×3 total)', 'Negative', '—', 'No intoxicant'],
        ['Urine hCG', 'Negative', '—', 'Not pregnant'],
        ['HIV Ag/Ab, RPR', 'Non-reactive', '—', 'Negative'],
        ['ANA', '1:80 speckled', '<1:40', 'Low-titer, non-specific'],
        ['Blood cultures ×2', 'No growth at 48 h', '—', 'Negative'],
        ['Lactate', '1.9 mmol/L', '0.5–2.0', 'Normal'],
      ],
    },
    { type: 'subheading', text: 'Cerebrospinal Fluid (lumbar puncture, Day 0)' },
    {
      type: 'table',
      columns: ['Test', 'Result', 'Reference', 'Interpretation'],
      rows: [
        ['Opening pressure', '19 cm H₂O', '10–20', 'Normal'],
        ['Appearance', 'Clear, colorless', '—', '—'],
        ['WBC', '28 cells/µL (92% lymphocytes)', '0–5', 'Lymphocytic pleocytosis'],
        ['RBC', '2 cells/µL', '0', 'Atraumatic'],
        ['Protein', '48 mg/dL', '15–45', 'Mildly elevated'],
        ['Glucose', '62 mg/dL (serum 98)', '>60% of serum', 'Normal'],
        ['Gram stain / bacterial culture', 'No organisms / no growth', '—', 'Negative'],
        ['HSV-1/2, VZV, enterovirus PCR', 'Negative', '—', 'Negative'],
        ['Oligoclonal bands', 'Present (CSF-restricted, 5 bands)', 'Absent', 'Intrathecal IgG synthesis'],
        ['NMDAR (GluN1) IgG, cell-based assay', 'POSITIVE, titer 1:320', 'Negative', 'Diagnostic'],
        ['Serum NMDAR IgG', 'POSITIVE, titer 1:160', 'Negative', 'Concordant'],
      ],
    },
    { type: 'subheading', text: 'Imaging and Neurophysiology' },
    {
      type: 'bullets',
      items: [
        'CT head without contrast (ED #3): No acute intracranial abnormality.',
        'MRI brain with and without gadolinium (Day 0): Subtle, non-enhancing T2/FLAIR hyperintensity in the left medial temporal lobe; otherwise normal. (Note: MRI is normal in roughly half of confirmed cases; a normal study does not exclude the diagnosis.)',
        'Continuous EEG (Day 0–2): Diffuse slowing with generalized rhythmic delta activity and superimposed fast (beta) activity — the “extreme delta brush” pattern; two electrographic seizures captured from the left temporal region.',
        'Transvaginal pelvic ultrasound (Day 1): 3.4 cm complex right adnexal mass with calcification and fat signal, consistent with mature cystic teratoma. Confirmed on pelvic MRI.',
        'ECG: Sinus tachycardia, QTc 462 ms; no arrhythmia.',
        'Chest radiograph: Right lower lobe opacity consistent with aspiration.',
      ],
    },

    { type: 'heading', text: 'Differential Diagnosis (at admission)' },
    {
      type: 'bullets',
      items: [
        'Anti-NMDA receptor encephalitis (autoimmune encephalitis) — favored: young woman, viral-like prodrome, subacute psychiatric onset, memory impairment, seizures, orofacial dyskinesias, autonomic instability, catatonia',
        'Neuroleptic malignant syndrome — hyperthermia, rigidity, elevated CK after haloperidol; however, dyskinesias, seizures, and psychiatric prodrome predate antipsychotic exposure',
        'Herpes simplex or other viral encephalitis — excluded by CSF PCR; empiric acyclovir started pending results',
        'Other autoimmune encephalitides (LGI1, CASPR2, GABA-B, AMPAR) — extended panel sent',
        'Primary psychiatric disorder (first-episode psychosis, bipolar I) — cannot account for seizures, dyskinesias, CSF pleocytosis, or EEG findings',
        'Substance-induced psychosis / serotonin syndrome / anticholinergic toxicity — negative toxicology, no exposure history',
        'Systemic lupus with CNS involvement — low-titer ANA only; no other criteria',
        'Non-convulsive status epilepticus — contributory, captured on cEEG',
      ],
    },

    { type: 'heading', text: 'Assessment' },
    {
      type: 'paragraph',
      text: '23-year-old woman with definite anti-NMDA receptor encephalitis (Graus 2016 criteria: characteristic clinical syndrome plus CSF NMDAR IgG) associated with a right ovarian mature teratoma, complicated by non-convulsive seizures, catatonia, autonomic dysregulation, and aspiration pneumonia. Diagnosis was delayed approximately 4 weeks across three ED visits during which the illness was successively labeled as a viral syndrome, an acute stress reaction, and first-episode psychosis. Antipsychotic exposure likely unmasked or aggravated autonomic and motor features, mimicking neuroleptic malignant syndrome.',
    },

    { type: 'heading', text: 'Plan' },
    { type: 'subheading', text: 'Immunotherapy (first-line, initiated Day 1 on clinical suspicion prior to antibody result)' },
    {
      type: 'bullets',
      items: [
        'Methylprednisolone 1 g IV daily ×5 days',
        'IVIG 0.4 g/kg/day ×5 days (started concurrently)',
        'If inadequate response at 10–14 days: rituximab and/or cyclophosphamide (second-line)',
      ],
    },
    { type: 'subheading', text: 'Tumor management' },
    {
      type: 'bullets',
      items: [
        'Gynecologic oncology consulted; laparoscopic right ovarian cystectomy (ovary-sparing) scheduled within 72 hours — early tumor removal is associated with better outcomes',
      ],
    },
    { type: 'subheading', text: 'Supportive / ICU care' },
    {
      type: 'bullets',
      items: [
        'Transfer to neuro-ICU for airway monitoring (hypoventilation risk), continuous EEG, telemetry',
        'Levetiracetam 1,000 mg IV BID for seizures',
        'Discontinue haloperidol; avoid dopamine antagonists; lorazepam 1–2 mg IV q6h for catatonia/agitation with monitoring',
        'Ampicillin-sulbactam for aspiration pneumonia; aspiration precautions, speech-language pathology swallow evaluation',
        'Acyclovir discontinued once HSV PCR resulted negative',
        'DVT prophylaxis, pressure-injury prevention, nutrition consult (NG feeding if intake inadequate)',
      ],
    },
    { type: 'subheading', text: 'Counseling and follow-up' },
    {
      type: 'bullets',
      items: [
        'Family meeting held; explained diagnosis, expected slow recovery over months, relapse risk (~12–20%), and need for outpatient neurology and neuropsychology follow-up',
        'Repeat pelvic imaging at 6 and 12 months; screen for recurrent teratoma',
        'Cognitive and psychosocial rehabilitation referral at discharge',
      ],
    },

    { type: 'heading', text: 'Key Teaching Points — Diagnostic Uncertainty' },
    {
      type: 'bullets',
      items: [
        'A young adult (particularly a woman) with new psychiatric symptoms after a flu-like prodrome, with no psychiatric history, should prompt consideration of autoimmune encephalitis before a primary psychiatric diagnosis is finalized.',
        'Red flags that were present but not integrated across ED visits: prodromal fever, new-onset insomnia, cognitive/memory deficits, staring spells, and orofacial movements attributed to “anxiety.”',
        'Normal CT, CBC, BMP, and toxicology do not exclude encephalitis. Lumbar puncture, MRI, and EEG were not obtained until the third presentation.',
        'Antipsychotics in undiagnosed anti-NMDAR encephalitis can precipitate an NMS-like syndrome; unusual antipsychotic intolerance should heighten suspicion.',
        'Early immunotherapy and tumor removal improve outcomes; diagnostic delay is an independent predictor of poorer functional recovery.',
      ],
    },

    { type: 'heading', text: 'Sources' },
    {
      type: 'sources',
      intro: 'Peer-reviewed references used to model this simulated case:',
      items: [
        'Dalmau J, Gleichman AJ, Hughes EG, et al. Anti-NMDA-receptor encephalitis: case series and analysis of the effects of antibodies. Lancet Neurol. 2008;7(12):1091–1098. https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(08)70224-2/abstract',
        'Dalmau J, Lancaster E, Martinez-Hernandez E, Rosenfeld MR, Balice-Gordon R. Clinical experience and laboratory investigations in patients with anti-NMDAR encephalitis. Lancet Neurol. 2011;10(1):63–74.',
        'Titulaer MJ, McCracken L, Gabilondo I, et al. Treatment and prognostic factors for long-term outcome in patients with anti-NMDA receptor encephalitis: an observational cohort study. Lancet Neurol. 2013;12(2):157–165.',
        'Titulaer MJ, McCracken L, Gabilondo I, et al. Late-onset anti-NMDA receptor encephalitis. Neurology. 2013;81(12):1058–1063. https://pubmed.ncbi.nlm.nih.gov/23946310/',
        'Graus F, Titulaer MJ, Balu R, et al. A clinical approach to diagnosis of autoimmune encephalitis. Lancet Neurol. 2016;15(4):391–404.',
        'Dalmau J, Armangué T, Planagumà J, et al. An update on anti-NMDA receptor encephalitis for neurologists and psychiatrists: mechanisms and models. Lancet Neurol. 2019;18(11):1045–1057.',
        'Guasp M, Rosa-Justicia M, Muñoz-Lopetegi A, et al. Clinical characterisation of patients in the post-acute stage of anti-NMDA receptor encephalitis: a prospective cohort study and comparison with patients with schizophrenia spectrum disorders. Lancet Neurol. 2022;21(10):899–910. https://www.thelancet.com/journals/laneur/article/PIIS1474-4422(22)00299-X/abstract',
        'Kayser MS, Dalmau J (review). Anti-N-methyl-d-aspartate receptor encephalitis: review of clinical presentation, diagnosis and treatment. PMC4495821. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4495821/',
        'Anti-NMDAR encephalitis: higher suspicion needed for earlier diagnosis (case report, literature review and diagnostic criteria) — 22-year-old woman initially held under the Mental Health Act for acute psychosis. PMC6949662. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6949662/',
        'Anti-NMDA receptor encephalitis presenting as an acute psychotic episode misdiagnosed as dissociative disorder: a case report — 19-year-old woman with ovarian teratoma. PMC5818849. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5818849/',
        'Anti-N-methyl-D-aspartate receptor encephalitis: characteristics and rapid diagnostic approach in the emergency department. PMC9206331. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9206331/',
        'Acute psychosis and autoimmune encephalitis: a diagnostic challenge in clinical practice — 42-year-old woman involuntarily admitted to psychiatry. PMC13445306. https://pmc.ncbi.nlm.nih.gov/articles/PMC13445306/',
        'Anti-NMDA receptor encephalitis initially misdiagnosed as psychiatric illness: implications for perioperative and critical care management. Academic Anesthesia, 2025. https://academicanesthesia.scholasticahq.com/article/145182',
      ],
    },
  ],
}
