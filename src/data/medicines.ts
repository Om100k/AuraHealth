import { Medicine } from '../types';

export const MEDICINES_CATALOGUE: Medicine[] = [
  {
    id: 'acetaminophen-paracetamol',
    name: 'Acetaminophen (Tylenol / Paracetamol 500mg)',
    genericName: 'Acetaminophen / Paracetamol',
    drugCategory: 'Analgesics & Antipyretics (Pain & Fever Reducer)',
    formType: 'Tablet',
    commonUses: [
      'Temporary relief of mild to moderate aches and pains (headache, toothache, muscle aches, backache)',
      'Reduction of fever caused by viral infections or colds',
      'Mild joint discomfort and osteoarthritis pain management',
    ],
    importantWarnings: [
      'Severe liver damage may occur if daily maximum dose is exceeded or taken with 3+ alcoholic drinks daily.',
      'Do not combine with any other medications containing acetaminophen (common in cough/cold combo products).',
      'Consult a doctor if fever lasts more than 3 days or pain exceeds 7-10 days.',
    ],
    knownAllergyConcerns: [
      'Rare severe cutaneous adverse reactions (Stevens-Johnson syndrome, toxic epidermal necrolysis). Discontinue immediately if rash, blisters, or skin peeling develop.',
    ],
    possibleSideEffects: [
      'Nausea or stomach upset (infrequent)',
      'Skin rash or itching',
      'Elevation in liver enzyme levels with chronic or elevated intake',
    ],
    interactions: [
      'Alcohol (significantly amplifies risk of hepatotoxicity)',
      'Warfarin / Coumadin (prolonged regular use may enhance anticoagulant effect)',
      'Isoniazid (anti-tuberculosis drug increases liver toxicity risk)',
    ],
    contraindications: [
      'Severe active hepatic impairment or severe active liver disease',
      'Known severe hypersensitivity to acetaminophen',
    ],
    otcStatus: 'Over-the-Counter (OTC)',
    storageAdvice: 'Store at 20°C to 25°C (68°F to 77°F). Protect from excessive heat and moisture.',
    relevantSymptomKeywords: ['headache', 'fever', 'muscle-ache', 'toothache', 'earache', 'joint-pain', 'tension-headache', 'migraine-throbbing'],
  },
  {
    id: 'ibuprofen',
    name: 'Ibuprofen (Advil / Motrin 200mg Tablets)',
    genericName: 'Ibuprofen',
    drugCategory: 'Nonsteroidal Anti-Inflammatory Drug (NSAID)',
    formType: 'Tablet',
    commonUses: [
      'Relief of inflammatory pain (joint stiffness, dental pain, menstrual cramps, sprains)',
      'Reduction of fever in adults and children older than 6 months',
      'Tension headaches and sinus headaches with facial pressure',
    ],
    importantWarnings: [
      'NSAIDs increase the risk of serious cardiovascular thrombotic events (myocardial infarction and stroke).',
      'Causes an increased risk of serious gastrointestinal adverse events including bleeding, ulceration, and perforation of stomach or intestines.',
      'Can cause or exacerbate renal impairment; stay well-hydrated during use.',
    ],
    knownAllergyConcerns: [
      'Cross-reactivity with Aspirin. Contraindicated in individuals who have experienced asthma, urticaria, or allergic-type reactions after taking aspirin or other NSAIDs.',
    ],
    possibleSideEffects: [
      'Dyspepsia, heartburn, stomach pain, or nausea',
      'Fluid retention or mild peripheral edema',
      'Dizziness or mild headache',
    ],
    interactions: [
      'Blood thinners (Warfarin, Apixaban, Clopidogrel) — marked increase in bleeding risk',
      'ACE inhibitors and ARBs (e.g., Lisinopril, Losartan) — may diminish antihypertensive effect and harm kidneys',
      'Lithium — NSAIDs decrease lithium clearance leading to elevated levels',
      'Corticosteroids (Prednisone) — greatly compounds gastrointestinal ulceration risk',
    ],
    contraindications: [
      'In the setting of coronary artery bypass graft (CABG) surgery',
      'Active peptic ulcer disease or history of GI bleeding',
      'Third trimester of pregnancy (premature closure of fetal ductus arteriosus)',
      'Severe heart failure or severe renal failure',
    ],
    otcStatus: 'Over-the-Counter (OTC)',
    storageAdvice: 'Store at controlled room temperature 15°C to 30°C (59°F to 86°F). Avoid excessive moisture.',
    relevantSymptomKeywords: ['menstrual-cramps', 'inflammation', 'toothache', 'back-pain', 'sprain', 'fever', 'headache', 'joint-pain', 'knee-joint-pain-swelling'],
  },
  {
    id: 'cetirizine',
    name: 'Cetirizine (Zyrtec 10mg Tablets)',
    genericName: 'Cetirizine Hydrochloride',
    drugCategory: 'Second-Generation Antihistamine (H1 Receptor Antagonist)',
    formType: 'Tablet',
    commonUses: [
      'Temporary relief of symptoms due to allergic rhinitis (sneezing, runny nose, itchy watery eyes, itchy throat)',
      'Treatment of uncomplicated skin manifestations of chronic idiopathic urticaria (hives and itching)',
    ],
    importantWarnings: [
      'May cause mild drowsiness in some individuals, despite being second-generation; use caution when driving or operating machinery.',
      'Dose adjustment required in patients with moderate-to-severe renal impairment.',
    ],
    knownAllergyConcerns: [
      'Hypersensitivity to cetirizine, hydroxyzine, or piperazine derivatives.',
    ],
    possibleSideEffects: [
      'Mild somnolence / fatigue',
      'Dry mouth',
      'Pharyngitis or headache',
    ],
    interactions: [
      'Central nervous system depressants & alcohol (additive sedation and impaired alertness)',
      'Theophylline (minor decrease in cetirizine clearance)',
    ],
    contraindications: [
      'Known severe allergy to cetirizine or hydroxyzine',
      'End-stage renal disease (CrCl < 10 mL/min) unless monitored by nephrologist',
    ],
    otcStatus: 'Over-the-Counter (OTC)',
    storageAdvice: 'Store at 20°C to 25°C (68°F to 77°F). Keep blister strip tightly closed.',
    relevantSymptomKeywords: ['runny-nose', 'sneezing', 'allergic-rhinitis', 'hives', 'itchy-eyes', 'pollen', 'urticaria-hives-wheals', 'pruritic-skin-rash'],
  },
  {
    id: 'loratadine',
    name: 'Loratadine (Claritin 10mg Non-Drowsy Tablets)',
    genericName: 'Loratadine',
    drugCategory: 'Non-Drowsy Second-Generation Antihistamine',
    formType: 'Tablet',
    commonUses: [
      'Daily management of outdoor and indoor seasonal allergic rhinitis',
      'Relief of itching, erythema, and hives associated with allergic skin reactions',
    ],
    importantWarnings: [
      'Patients with severe liver impairment should start with an alternate-day dosing schedule under physician advice.',
      'Stop taking antihistamines at least 48 hours before allergen skin-prick testing to avoid false negative tests.',
    ],
    knownAllergyConcerns: [
      'Contraindicated in patients who have shown hypersensitivity to loratadine or desloratadine.',
    ],
    possibleSideEffects: [
      'Headache',
      'Dry mouth',
      'Nervousness or fatigue (rare)',
    ],
    interactions: [
      'Inhibitors of CYP3A4 or CYP2D6 (such as ketoconazole, erythromycin, cimetidine) may modestly increase loratadine plasma concentrations without clinical toxicity.',
    ],
    contraindications: [
      'Hypersensitivity to loratadine or desloratadine',
    ],
    otcStatus: 'Over-the-Counter (OTC)',
    storageAdvice: 'Store between 20°C and 25°C (68°F to 77°F). Protect from light and excessive moisture.',
    relevantSymptomKeywords: ['sneezing', 'hay-fever', 'allergic-shiners', 'watery-eyes', 'itchy-nose', 'runny-nose-clear'],
  },
  {
    id: 'famotidine',
    name: 'Famotidine (Pepcid AC 20mg Tablets)',
    genericName: 'Famotidine',
    drugCategory: 'Histamine H2-Receptor Antagonist (Acid Reducer)',
    formType: 'Tablet',
    commonUses: [
      'Relief of heartburn associated with acid indigestion and sour stomach',
      'Prevention of meal-induced heartburn when taken 15-60 minutes before dining',
      'Management of gastroesophageal reflux (GERD) under clinical oversight',
    ],
    importantWarnings: [
      'Heartburn symptoms can mimic early heart attack symptoms. If chest pain radiates to shoulders, neck, or arms with shortness of breath, seek emergency medical care.',
      'Do not use for more than 14 consecutive days without consulting a doctor.',
    ],
    knownAllergyConcerns: [
      'Cross-sensitivity can occur in patients with history of hypersensitivity to other H2-receptor antagonists (cimetidine, ranitidine).',
    ],
    possibleSideEffects: [
      'Headache',
      'Dizziness',
      'Constipation or diarrhea (mild)',
    ],
    interactions: [
      'Medications requiring gastric acidity for absorption (e.g., ketoconazole, itraconazole, atazanavir, iron supplements)',
    ],
    contraindications: [
      'Hypersensitivity to famotidine or other H2 antagonists',
      'Difficulty or pain swallowing food, vomiting with blood, or black stools (seek medical workup)',
    ],
    otcStatus: 'Over-the-Counter (OTC)',
    storageAdvice: 'Store at room temperature 15°C to 30°C (59°F to 86°F).',
    relevantSymptomKeywords: ['heartburn', 'acid-reflux', 'indigestion', 'sour-stomach', 'epigastric-pain', 'substernal-burning-heartburn'],
  },
  {
    id: 'omeprazole',
    name: 'Omeprazole (Prilosec OTC 20mg Delayed-Release Tablets)',
    genericName: 'Omeprazole Magnesium',
    drugCategory: 'Proton Pump Inhibitor (PPI)',
    formType: 'Tablet',
    commonUses: [
      'Treatment of frequent heartburn occurring 2 or more days a week',
      'Suppression of gastric acid secretion in gastroesophageal reflux disease',
    ],
    importantWarnings: [
      'Not intended for immediate relief of heartburn; may take 1 to 4 days for full clinical effect.',
      'Limit self-treatment course to 14 days and do not repeat a 14-day cycle more often than every 4 months unless directed by a physician.',
      'Long-term PPI use is associated with increased risk of bone fractures, hypomagnesemia, and Clostridioides difficile colitis.',
    ],
    knownAllergyConcerns: [
      'Hypersensitivity to omeprazole or substituted benzimidazoles (e.g., esomeprazole, pantoprazole, lansoprazole).',
    ],
    possibleSideEffects: [
      'Headache, abdominal cramps, flatulence',
      'Nausea or diarrhea',
      'Vitamin B12 deficiency with long-term unmonitored use',
    ],
    interactions: [
      'Clopidogrel (Plavix) — omeprazole significantly reduces antiplatelet activation via CYP2C19 inhibition',
      'Methotrexate — elevated serum levels of methotrexate',
      'Digoxin — increased digoxin absorption',
    ],
    contraindications: [
      'Concomitant administration with rilpivirine-containing regimens',
      'Severe allergic reaction to any proton pump inhibitor',
    ],
    otcStatus: 'Over-the-Counter (OTC)',
    storageAdvice: 'Store between 15°C and 30°C (59°F to 86°F). Keep bottle tightly capped.',
    relevantSymptomKeywords: ['frequent-heartburn', 'gerd', 'acid-regurgitation', 'substernal-burning'],
  },
  {
    id: 'guaifenesin',
    name: 'Guaifenesin (Mucinex 600mg Extended-Release Tablets)',
    genericName: 'Guaifenesin',
    drugCategory: 'Expectorant',
    formType: 'Tablet',
    commonUses: [
      'Helps loosen phlegm (mucus) and thin bronchial secretions to make coughs more productive',
      'Clears chest congestion associated with common cold and acute bronchitis',
    ],
    importantWarnings: [
      'Drink plenty of fluids while taking this medication to assist in thinning mucus.',
      'Consult a physician if cough lasts more than 7 days, recurs, or is accompanied by fever, rash, or persistent headache.',
    ],
    knownAllergyConcerns: [
      'Hypersensitivity to guaifenesin or excipients in the formulated tablets/syrup.',
    ],
    possibleSideEffects: [
      'Mild gastrointestinal disturbance or nausea',
      'Dizziness or drowsiness',
      'Headache',
    ],
    interactions: [
      'No major drug-drug contraindications; beware of combination cough/cold syrups containing hidden sympathomimetics or acetaminophen.',
    ],
    contraindications: [
      'Hypersensitivity to guaifenesin',
      'Persistent or chronic cough caused by smoking, asthma, chronic bronchitis, or emphysema without medical evaluation',
    ],
    otcStatus: 'Over-the-Counter (OTC)',
    storageAdvice: 'Store at 20°C to 25°C (68°F to 77°F). Avoid excessive heat.',
    relevantSymptomKeywords: ['wet-cough', 'productive-cough', 'chest-congestion', 'bronchial-mucus', 'wet-productive-cough'],
  },
  {
    id: 'dextromethorphan',
    name: 'Dextromethorphan (Delsym Cough Suppressant Caplets)',
    genericName: 'Dextromethorphan Hydrobromide',
    drugCategory: 'Antitussive (Cough Suppressant)',
    formType: 'Caplet',
    commonUses: [
      'Temporary relief of non-productive dry, hacking cough caused by minor throat and bronchial irritation',
    ],
    importantWarnings: [
      'Do not use in children under 4 years old without pediatric consultation.',
      'Do not use for persistent or chronic cough associated with smoking, asthma, or cough accompanied by excessive phlegm.',
    ],
    knownAllergyConcerns: [
      'Hypersensitivity to dextromethorphan hydrobromide.',
    ],
    possibleSideEffects: [
      'Slight drowsiness, dizziness',
      'Nausea or stomach upset',
      'Restlessness (paradoxical excitation in some patients)',
    ],
    interactions: [
      'MAO Inhibitors (Monoamine Oxidase Inhibitors) — STRICTLY CONTRAINDICATED; risk of fatal serotonin syndrome. Do not use within 14 days of stopping an MAOI.',
      'SSRIs, SNRIs, Tricyclics (e.g., Fluoxetine, Sertraline) — increases risk of serotonin syndrome.',
    ],
    contraindications: [
      'Current or recent (within 14 days) use of MAO inhibitors',
      'Respiratory depression or acute asthma flare',
    ],
    otcStatus: 'Over-the-Counter (OTC)',
    storageAdvice: 'Store at 15°C to 25°C (59°F to 77°F). Do not freeze.',
    relevantSymptomKeywords: ['dry-cough', 'hacking-cough', 'nighttime-cough', 'tickle-throat', 'dry-hacking-cough'],
  },
  {
    id: 'loperamide',
    name: 'Loperamide (Imodium A-D 2mg Caplets / Tablets)',
    genericName: 'Loperamide Hydrochloride',
    drugCategory: 'Antidiarrheal (Opioid Receptor Agonist in Gut Wall)',
    formType: 'Tablet',
    commonUses: [
      'Control and symptomatic relief of acute non-specific diarrhea',
      'Reduces volume of discharge in ileostomy patients',
    ],
    importantWarnings: [
      'BLACK BOX WARNING: Taking higher than recommended doses can cause serious cardiac events (QT prolongation, Torsades de Pointes, cardiac arrest). Never exceed daily limits.',
      'Drink plenty of oral electrolyte fluids to prevent dehydration caused by diarrhea.',
    ],
    knownAllergyConcerns: [
      'Known hypersensitivity to loperamide hydrochloride.',
    ],
    possibleSideEffects: [
      'Constipation, abdominal cramps, nausea',
      'Dizziness or fatigue',
      'Dry mouth',
    ],
    interactions: [
      'P-glycoprotein inhibitors (Quinidine, Ritonavir) and CYP inhibitors (Clarithromycin, Itraconazole) can heighten cardiac arrhythmia risk with loperamide.',
    ],
    contraindications: [
      'Children under 2 years of age',
      'Bacterial enteritis caused by invasive organisms (Salmonella, Shigella, Campylobacter)',
      'Pseudomembranous colitis associated with broad-spectrum antibiotic therapy',
      'Acute dysentery (presence of high fever and visible blood in stool)',
    ],
    otcStatus: 'Over-the-Counter (OTC)',
    storageAdvice: 'Store between 20°C and 25°C (68°F to 77°F). Protect from moisture.',
    relevantSymptomKeywords: ['diarrhea', 'watery-stool', 'loose-bowels', 'travelers-diarrhea', 'watery-diarrhea'],
  },
  {
    id: 'bismuth-subsalicylate',
    name: 'Bismuth Subsalicylate (Pepto-Bismol 262mg Chewable Tablets)',
    genericName: 'Bismuth Subsalicylate',
    drugCategory: 'Gastrointestinal Protectant & Antisecretory / Antidiarrheal',
    formType: 'Tablet',
    commonUses: [
      'Relief of diarrhea, upset stomach, heartburn, indigestion, and nausea',
      'Travelers’ diarrhea prophylaxis and symptomatic treatment',
    ],
    importantWarnings: [
      'Contains salicylate (related to aspirin). Children and teenagers who have or are recovering from chickenpox or flu symptoms should NOT use this product due to risk of Reye syndrome.',
      'May cause harmless temporary darkening of the tongue and blackening of the stool.',
    ],
    knownAllergyConcerns: [
      'Allergy to salicylates (including aspirin) or other NSAIDs.',
    ],
    possibleSideEffects: [
      'Black or darkened stool (benign bismuth sulfide reaction)',
      'Black or dark tongue discoloration',
      'Tinnitus / ringing in ears (sign of salicylate toxicity at high doses)',
    ],
    interactions: [
      'Anticoagulants / antiplatelet agents (compounded risk of bleeding due to salicylate)',
      'Oral tetracycline and fluoroquinolone antibiotics (bismuth binds and impairs antibiotic absorption)',
      'Diabetes medications (salicylate can intensify hypoglycemia)',
    ],
    contraindications: [
      'Children/teens with fever/viral prodrome (Reye syndrome danger)',
      'Patients with active GI ulcer or bleeding disorders',
      'Aspirin-sensitive asthma',
    ],
    otcStatus: 'Over-the-Counter (OTC)',
    storageAdvice: 'Store at room temperature 15°C to 25°C. Avoid excessive heat.',
    relevantSymptomKeywords: ['nausea', 'indigestion', 'upset-stomach', 'diarrhea', 'heartburn', 'persistent-nausea'],
  },
  {
    id: 'hydrocortisone-topical',
    name: 'Hydrocortisone 1% Cream (Cortizone-10)',
    genericName: 'Hydrocortisone (Topical)',
    drugCategory: 'Low-Potency Topical Corticosteroid',
    formType: 'Cream / Topical',
    commonUses: [
      'Temporary relief of itching associated with minor skin irritations, inflammation, and rashes',
      'Eczema patches, insect bites, poison ivy/oak/sumac, and contact dermatitis',
      'External anal and genital itching in adults',
    ],
    importantWarnings: [
      'For external use only. Do not use in or near eyes.',
      'Do not use continuously for more than 7 consecutive days unless instructed by a dermatologist.',
      'Do not apply over large body surface areas or with occlusive airtight wraps, which increases systemic steroid absorption.',
    ],
    knownAllergyConcerns: [
      'Hypersensitivity to hydrocortisone or cream base excipients (such as parabens, propylene glycol).',
    ],
    possibleSideEffects: [
      'Local burning, irritation, or dryness at application site',
      'Skin thinning (atrophy) or striae with inappropriate prolonged use',
      'Secondary cutaneous fungal or bacterial infection',
    ],
    interactions: [
      'No significant systemic interactions when applied sparingly to localized intact skin as directed.',
    ],
    contraindications: [
      'Untreated active bacterial, fungal, or viral skin infections (e.g., active herpes or impetigo)',
      'Do not use on open wounds, weeping lesions, or deep puncture cuts',
    ],
    otcStatus: 'Over-the-Counter (OTC)',
    storageAdvice: 'Store at 20°C to 25°C (68°F to 77°F). Do not freeze.',
    relevantSymptomKeywords: ['itchy-rash', 'eczema', 'bug-bites', 'poison-ivy', 'skin-redness', 'pruritic-skin-rash'],
  },
  {
    id: 'saline-nasal-spray',
    name: 'Isotonic Saline Nasal Spray (Ocean / NeilMed)',
    genericName: 'Sodium Chloride (0.9% Isotonic Nasal Solution)',
    drugCategory: 'Nasal Moisturizer & Mucus Clearance Agent',
    formType: 'Nasal Spray',
    commonUses: [
      'Flushes irritants, allergens, and airborne pollen out of the nasal cavity',
      'Moisturizes dry, crusted nasal passages caused by air conditioning, dry climates, or heating',
      'Loosens viscous mucus plugs without risk of rebound congestion',
    ],
    importantWarnings: [
      'Use only sterile, distilled, or previously boiled and cooled water if preparing nasal rinses from saline powder packets.',
      'Do not share the spray nozzle with other family members to avoid spreading viral infections.',
    ],
    knownAllergyConcerns: [
      'Drug-free and preservative-free versions carry virtually zero allergic cross-reactivity.',
    ],
    possibleSideEffects: [
      'Transient mild stinging or tickling sensation on very dry irritated nasal mucosa',
    ],
    interactions: [
      'No drug interactions. Use 10-15 minutes prior to medicated steroid nasal sprays to clear passages for better drug absorption.',
    ],
    contraindications: [
      'Completely occluded nasal passages or active middle ear infection when using high-volume positive pressure sinus bottles',
    ],
    otcStatus: 'Over-the-Counter (OTC)',
    storageAdvice: 'Store at room temperature 15°C to 30°C. Keep nozzle clean and dry.',
    relevantSymptomKeywords: ['nasal-congestion', 'runny-nose', 'stuffy-nose', 'dry-nasal-crusting', 'sinus-pressure', 'blocked-nose-congestion'],
  },
  {
    id: 'artificial-tears',
    name: 'Carboxymethylcellulose Eye Drops (Refresh Tears)',
    genericName: 'Carboxymethylcellulose Sodium',
    drugCategory: 'Ocular Lubricant (Artificial Tears)',
    formType: 'Eye Drops',
    commonUses: [
      'Temporary relief of burning, irritation, and discomfort due to dryness of the eye',
      'Protection against further irritation from wind, sun, or prolonged computer display use',
    ],
    importantWarnings: [
      'Do not touch the tip of container to any surface (including eyelid or eyelashes) to prevent bottle contamination.',
      'Discard single-use preservative-free vials immediately after use.',
      'If you experience eye pain, changes in vision, continued redness, or irritation for more than 72 hours, discontinue and consult an eye doctor.',
    ],
    knownAllergyConcerns: [
      'Hypersensitivity to carboxymethylcellulose or ophthalmic preservatives (such as benzalkonium chloride or Purite). Preservative-free formulations available for sensitive eyes.',
    ],
    possibleSideEffects: [
      'Temporary blurred vision immediately following eye drop instillation',
      'Mild foreign body sensation or crusting on lashes',
    ],
    interactions: [
      'Space at least 5 to 10 minutes apart from other ophthalmic drops to prevent washing out active medication.',
    ],
    contraindications: [
      'Known hypersensitivity to any formulation component',
    ],
    otcStatus: 'Over-the-Counter (OTC)',
    storageAdvice: 'Store at 15°C to 25°C (59°F to 77°F). Discard open multi-dose bottles 30-90 days after first opening according to manufacturer guidance.',
    relevantSymptomKeywords: ['dry-eyes', 'eye-grittiness', 'eye-burning', 'eye-strain', 'computer-vision', 'eye-dryness-gritty'],
  },
  {
    id: 'simethicone',
    name: 'Simethicone (Gas-X Extra Strength 125mg Softgels / Chewable Tablets)',
    genericName: 'Simethicone',
    drugCategory: 'Antiflatulent (Defoaming Agent)',
    formType: 'Tablet',
    commonUses: [
      'Relief of the painful symptoms of excess gas in the digestive tract (bloating, pressure, fullness, flatulence)',
      'Useful post-operative or post-prandial gas discomfort',
    ],
    importantWarnings: [
      'Acts physically on surface tension of gas bubbles and is not absorbed into bloodstream.',
      'Does not prevent gas generation; consult healthcare professional if severe abdominal pain persists.',
    ],
    knownAllergyConcerns: [
      'Extremely rare; check chewable tablet bases for sorbitol, artificial colors, or gelatin.',
    ],
    possibleSideEffects: [
      'Rare mild loose stools',
      'Belching as coalesced gas bubbles are naturally expelled',
    ],
    interactions: [
      'Can bind levothyroxine if taken concurrently; separate administration by at least 4 hours.',
    ],
    contraindications: [
      'Known hypersensitivity to simethicone',
      'Known or suspected intestinal perforation or mechanical obstruction',
    ],
    otcStatus: 'Over-the-Counter (OTC)',
    storageAdvice: 'Store at room temperature 20°C to 25°C. Avoid extreme humidity.',
    relevantSymptomKeywords: ['bloating', 'gas', 'abdominal-distension', 'flatulence', 'fullness', 'excessive-bloating-distension'],
  },
  {
    id: 'oral-rehydration-salts',
    name: 'Oral Rehydration Solution (Pedialyte / Hydralyte Electrolytes)',
    genericName: 'WHO-Formula Sodium, Potassium & Glucose Solution',
    drugCategory: 'Electrolyte Replenisher & Rehydration Therapy',
    formType: 'Oral Solution',
    commonUses: [
      'Prevention and treatment of mild to moderate dehydration caused by acute diarrhea, vomiting, heat exhaustion, or febrile illness',
      'Restores optimal osmolarity and sodium-glucose cotransport in the intestinal lumen',
    ],
    importantWarnings: [
      'Mix strictly with recommended volume of clean drinking water; adding excessive or insufficient water disrupts delicate osmotic balance.',
      'Seek prompt medical care for signs of severe dehydration: sunken eyes, lack of urination, lethargy, or inability to keep liquids down.',
    ],
    knownAllergyConcerns: [
      'Generally free from common allergens. Flavored powders may contain artificial flavorings or stevia/sucralose.',
    ],
    possibleSideEffects: [
      'Mild nausea if gulped too quickly (sip small spoonfuls every few minutes instead)',
      'Hyperkalemia or hypernatremia if consumed in extreme excess without underlying fluid loss',
    ],
    interactions: [
      'Caution in patients taking potassium-sparing diuretics (Spironolactone), ACE inhibitors, or with severe chronic kidney disease.',
    ],
    contraindications: [
      'Intractable vomiting refractory to oral intake',
      'Paralytic ileus or intestinal obstruction',
      'Severe shock requiring immediate intravenous fluid resuscitation',
    ],
    otcStatus: 'Over-the-Counter (OTC)',
    storageAdvice: 'Keep dry packets at room temperature. Refrigerate reconstituted solution and discard after 24 hours.',
    relevantSymptomKeywords: ['dehydration', 'diarrhea', 'vomiting', 'fever-fluid-loss', 'weakness'],
  },
  {
    id: 'diphenhydramine-topical-systemic',
    name: 'Diphenhydramine (Benadryl 25mg Tablets)',
    genericName: 'Diphenhydramine Hydrochloride',
    drugCategory: 'First-Generation Sedating Antihistamine & Anticholinergic',
    formType: 'Tablet',
    commonUses: [
      'Temporary relief of allergic symptoms, itchy skin welts, and acute histamine flare-ups',
      'Motion sickness prevention',
      'Short-term relief of occasional sleeplessness (nighttime sleep aid)',
    ],
    importantWarnings: [
      'Causes marked drowsiness. Do NOT drive or operate machinery after taking.',
      'Do not use in elderly patients due to high anticholinergic burden (confusion, falls, acute urinary retention, dry mouth, blurred vision).',
      'Avoid combination with other sedating agents or alcohol.',
    ],
    knownAllergyConcerns: [
      'Hypersensitivity to diphenhydramine or other ethanolamine-derivative antihistamines.',
    ],
    possibleSideEffects: [
      'Pronounced sedation, grogginess next morning',
      'Dry mouth, constipation, urinary retention',
      'Paradoxical excitation, especially in small children',
    ],
    interactions: [
      'Alcohol, sedatives, benzodiazepines, and muscle relaxants (potentiates dangerous CNS depression)',
      'Anticholinergic medications (compounds urinary retention and delirium risk)',
      'MAO inhibitors prolong and intensify anticholinergic effects',
    ],
    contraindications: [
      'Narrow-angle glaucoma',
      'Severe prostatic hypertrophy / urinary bladder neck obstruction',
      'Neonates or premature infants',
      'Nursing mothers (inhibits lactation and passes into breast milk)',
    ],
    otcStatus: 'Over-the-Counter (OTC)',
    storageAdvice: 'Store at 20°C to 25°C (68°F to 77°F). Protect from light.',
    relevantSymptomKeywords: ['acute-allergies', 'severe-itching', 'insomnia', 'hives', 'motion-sickness', 'widespread-allergic-hives'],
  },
];
