import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { Symptom, AllergyProfile, FollowUpAnswers, AIHealthAnalysis } from './src/types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Fallback rule-based clinical synthesis generator
function generateFallbackAnalysis(
  symptoms: Symptom[],
  allergyProfile: AllergyProfile,
  followUp: FollowUpAnswers
): AIHealthAnalysis {
  const hasEmergencySymptom = symptoms.some((s) => s.urgencyLevel === 'emergency');
  const hasHighUrgency = symptoms.some((s) => s.urgencyLevel === 'high') || followUp.severity === 'Severe';
  const hasFever = followUp.feverStatus && !followUp.feverStatus.toLowerCase().includes('no');
  const isVulnerableAge = followUp.ageGroup.includes('Infant') || followUp.ageGroup.includes('Child') || followUp.ageGroup.includes('65');

  let triageLevel: 'emergency' | 'urgent' | 'routine' | 'self_care' = 'routine';
  let triageHeadline = 'Schedule a consultation with your primary physician';
  let triageTimeframe = 'Within 24 to 48 hours for evaluation';
  const actionPoints: string[] = [];

  if (hasEmergencySymptom) {
    triageLevel = 'emergency';
    triageHeadline = 'Immediate emergency medical attention required (Call 911 or visit ER)';
    triageTimeframe = 'Immediate emergency action';
    actionPoints.push('Do not drive yourself — arrange emergency transport or call local emergency dispatch.');
    actionPoints.push('Keep airways clear and sit upright or lie comfortably.');
    actionPoints.push('Inform emergency staff of all current medications and allergies upon arrival.');
  } else if (hasHighUrgency || (hasFever && isVulnerableAge)) {
    triageLevel = 'urgent';
    triageHeadline = 'Prompt medical evaluation recommended at Urgent Care or Doctor Clinic';
    triageTimeframe = 'Same day (within 6 to 12 hours)';
    actionPoints.push('Contact an on-call physician or visit a walk-in urgent care facility.');
    actionPoints.push('Record temperature and symptom progression hourly.');
    actionPoints.push('Maintain hydration with small sips of water or oral rehydration fluids.');
  } else if (followUp.severity === 'Mild' && !hasFever) {
    triageLevel = 'self_care';
    triageHeadline = 'Symptom monitoring and pharmacist consultation appropriate';
    triageTimeframe = 'Monitor over next 2 to 3 days';
    actionPoints.push('Consult a licensed pharmacist regarding safe over-the-counter options for symptom relief.');
    actionPoints.push('Prioritize adequate sleep, rest, and electrolyte fluid balance.');
    actionPoints.push('Seek clinical review if symptoms worsen or fail to improve after 72 hours.');
  } else {
    actionPoints.push('Contact your family physician to discuss symptom patterns and physical examination.');
    actionPoints.push('Bring a documented log of your symptoms and current medications.');
    actionPoints.push('Avoid vigorous exercise while your body is actively recovering.');
  }

  // Allergy alerts check
  const allergyAlerts: string[] = [];
  if (allergyProfile.types.includes('Medicine allergies')) {
    allergyAlerts.push(
      `Known medicine allergy noted (${allergyProfile.medicineName || 'Specified medication'}). Always verify excipients and active chemical classes with your dispensing pharmacist before initiating any OTC or prescribed therapy.`
    );
  }
  if (allergyProfile.types.includes('Food allergies')) {
    allergyAlerts.push('Food sensitivities reported: Ensure non-active syrup binders and chewable excipients (gelatin, lactose, gluten) do not contain cross-reactive derivatives.');
  }

  // Warning signs
  const warningSigns: string[] = [];
  symptoms.forEach((s) => {
    if (s.emergencyWarning) {
      warningSigns.push(`${s.name}: ${s.emergencyWarning}`);
    }
  });
  if (followUp.severity === 'Severe') {
    warningSigns.push('High intensity severity disrupting normal cognitive or physical functioning warrants professional diagnostic assessment.');
  }
  if (hasFever && followUp.duration.includes('week')) {
    warningSigns.push('Persistent fever extending past multiple days necessitates clinical blood work to exclude occult bacterial or inflammatory etiologies.');
  }

  // Explanations
  const explanations = [
    {
      title: 'Acute inflammatory or viral response',
      description: 'The co-occurrence of symptoms like ' + symptoms.map(s => s.name).slice(0, 3).join(', ') + ' commonly reflects a systemic immune defense activation.',
      uncertaintyNote: 'This is a general physiological observation, not a clinical diagnosis.',
      typicalCharacteristics: ['Short-term onset', 'Accompanied by localized fatigue or tissue congestion', 'Responsive to supportive rest'],
      commonTriggers: ['Seasonal viral pathogens', 'Physical fatigue', 'Environmental temperature shifts'],
    },
    {
      title: 'Environmental or musculoskeletal strain',
      description: 'Physical biomechanical tension, postural fatigue, or environmental allergens can trigger and amplify discomfort in affected organ systems.',
      uncertaintyNote: 'Clinical differentiation requires specialized in-person physical assessment.',
      typicalCharacteristics: ['Fluctuates with posture, exertion, or ambient air exposure', 'Improves with gentle hydration and targeted resting'],
      commonTriggers: ['Workplace ergonomics', 'Allergen burden (dust, seasonal pollens)', 'Dehydration'],
    },
  ];

  return {
    symptomSummary: {
      symptoms: symptoms.map((s) => s.name),
      duration: followUp.duration || 'Not specified',
      severity: followUp.severity || 'Moderate',
      keyAnswers: {
        'Age Group': followUp.ageGroup,
        'Onset Pattern': followUp.onset,
        'Trajectory': followUp.trend,
        'Fever Status': followUp.feverStatus,
        'Prior History': followUp.previousHistory,
        'Active Medications': followUp.currentMedications || 'None reported',
        'Underlying Conditions': followUp.medicalConditions.join(', ') || 'None reported',
      },
    },
    possibleExplanations: explanations,
    warningSigns: warningSigns.length > 0 ? warningSigns : [
      'Sudden difficulty breathing, chest tightness, or blue-tinted lips',
      'Sudden confusion, slurred speech, or weakness on one side of the face/body',
      'Persistent vomiting preventing hydration for more than 12 hours',
      'Stiff neck accompanied by sensitivity to bright light and high fever',
    ],
    allergyAlerts,
    triage: {
      level: triageLevel,
      headline: triageHeadline,
      actionPoints,
      timeframe: triageTimeframe,
    },
    educationalGuidance: [
      'Maintain continuous hydration with room-temperature water or diluted electrolyte broths.',
      'Allow ample rest periods; avoid strenuous anaerobic exercise during the acute flare-up.',
      'Keep a written daily log of body temperature, fluid intake, and symptom progression.',
      'Do not abruptly start or discontinue prescribed chronic therapies without consulting your doctor.',
    ],
    pharmacistConsultationGuide: [
      'Show your pharmacist your current medication list to screen for drug-drug interactions.',
      'Disclose any history of stomach ulcers, hypertension, asthma, or kidney/liver sensitivities.',
      'Ask the pharmacist to explain non-prescription supportive measures suitable for your specific age and symptoms.',
    ],
    mandatoryDisclaimer:
      'Our platform provides educational health information and medicine-related guidance only. It does not diagnose diseases or prescribe medicines. Always consult a qualified doctor or pharmacist before taking any medication.',
  };
}

// API: Health Check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', hasGeminiKey: Boolean(apiKey) });
});

// API: Health Analysis
app.post('/api/analyze', async (req, res) => {
  try {
    const { symptoms, allergyProfile, followUp } = req.body as {
      symptoms: Symptom[];
      allergyProfile: AllergyProfile;
      followUp: FollowUpAnswers;
    };

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ error: 'At least one symptom is required for analysis.' });
    }

    // If Gemini client is not initialized, use the robust medical fallback engine
    if (!ai) {
      console.log('Gemini API key not found in server environment. Delivering rule-based analysis.');
      const fallback = generateFallbackAnalysis(symptoms, allergyProfile, followUp);
      return res.json(fallback);
    }

    const promptText = `
You are a senior healthcare communication and clinical education engine.
A patient has provided their symptoms, allergy history, and follow-up clinical responses.

Analyze this health profile with clinical rigor, empathy, and absolute safety discipline.
IMPORTANT CONSTRAINTS:
1. Do NOT diagnose the patient with certainty. Always use cautious clinical language (e.g. "Possible considerations may include...", "Symptoms could be consistent with...").
2. Do NOT prescribe, rank, or recommend 1-10 specific medicines or generate dosages.
3. Check for emergency warning signs (red flags) like chest pressure, stroke symptoms, respiratory distress, anaphylaxis, severe infection.
4. Cross-check reported allergies with potential risks.
5. Provide practical, clear next-step triage (Emergency, Urgent Care, Primary Care, or Self-Care/Monitoring).
6. Provide actionable questions the patient can ask their pharmacist or physician.

PATIENT PROFILE:
Symptoms:
${symptoms.map((s) => `- ${s.name} (Category: ${s.category}, Urgency Tier: ${s.urgencyLevel}, Info: ${s.description})`).join('\n')}

Allergies:
- Types: ${allergyProfile?.types?.join(', ') || 'None specified'}
- Medicine Allergy details: ${allergyProfile?.medicineName ? `${allergyProfile.medicineName} (${allergyProfile.medicineReaction || 'reaction unstated'})` : 'None'}
- Food / Other: ${allergyProfile?.foodDetails || 'None'} ${allergyProfile?.otherDetails || ''}

Follow-up Responses:
- Duration: ${followUp?.duration}
- Onset: ${followUp?.onset}
- Severity: ${followUp?.severity}
- Trend: ${followUp?.trend}
- Fever Status: ${followUp?.feverStatus}
- Previous History: ${followUp?.previousHistory}
- Current Medications: ${followUp?.currentMedications || 'None'}
- Underlying Conditions: ${followUp?.medicalConditions?.join(', ') || 'None'}
- Age Group: ${followUp?.ageGroup}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: `You are an AI healthcare educational assistant. Generate a medically sound, responsible, structured JSON health information overview. Do NOT make definitive diagnoses. Do NOT prescribe drugs or dosages. Always uphold patient safety.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            symptomSummary: {
              type: Type.OBJECT,
              properties: {
                symptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
                duration: { type: Type.STRING },
                severity: { type: Type.STRING },
                keyAnswers: {
                  type: Type.OBJECT,
                  description: 'Key follow-up answers summarized',
                  properties: {
                    ageGroup: { type: Type.STRING },
                    onset: { type: Type.STRING },
                    trajectory: { type: Type.STRING },
                    feverStatus: { type: Type.STRING },
                    medications: { type: Type.STRING },
                    conditions: { type: Type.STRING },
                  },
                },
              },
              required: ['symptoms', 'duration', 'severity'],
            },
            possibleExplanations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: 'General health explanation title' },
                  description: { type: Type.STRING, description: 'Thorough, empathetic explanation' },
                  uncertaintyNote: { type: Type.STRING, description: 'Explicit uncertainty statement' },
                  typicalCharacteristics: { type: Type.ARRAY, items: { type: Type.STRING } },
                  commonTriggers: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['title', 'description', 'uncertaintyNote', 'typicalCharacteristics'],
              },
            },
            warningSigns: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Emergency warning signs and red flags the user must watch out for',
            },
            allergyAlerts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Specific alerts regarding the user’s known allergies',
            },
            triage: {
              type: Type.OBJECT,
              properties: {
                level: {
                  type: Type.STRING,
                  description: 'emergency, urgent, routine, or self_care',
                },
                headline: { type: Type.STRING },
                actionPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                timeframe: { type: Type.STRING },
              },
              required: ['level', 'headline', 'actionPoints', 'timeframe'],
            },
            educationalGuidance: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Supportive non-pharmacologic lifestyle and monitoring steps',
            },
            pharmacistConsultationGuide: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Specific questions to discuss with a pharmacist',
            },
            mandatoryDisclaimer: {
              type: Type.STRING,
              description: 'Exact disclaimer mandated by guidelines',
            },
          },
          required: [
            'symptomSummary',
            'possibleExplanations',
            'warningSigns',
            'allergyAlerts',
            'triage',
            'educationalGuidance',
            'pharmacistConsultationGuide',
            'mandatoryDisclaimer',
          ],
        },
      },
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error('Empty response received from Gemini');
    }

    const parsedData = JSON.parse(rawText) as AIHealthAnalysis;
    // Always enforce the exact mandatory disclaimer text
    parsedData.mandatoryDisclaimer =
      'Our platform provides educational health information and medicine-related guidance only. It does not diagnose diseases or prescribe medicines. Always consult a qualified doctor or pharmacist before taking any medication.';

    return res.json(parsedData);
  } catch (error: any) {
    console.error('Gemini API Error, falling back to rule-based engine:', error?.message || error);
    const { symptoms, allergyProfile, followUp } = req.body;
    const fallback = generateFallbackAnalysis(symptoms || [], allergyProfile || { types: [] }, followUp || { duration: '', onset: '', severity: 'Moderate', trend: '', feverStatus: '', previousHistory: '', currentMedications: '', medicalConditions: [], ageGroup: '' });
    return res.json(fallback);
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
