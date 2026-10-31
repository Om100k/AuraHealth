import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  AlertTriangle,
  HeartPulse,
  Baby,
  Activity,
} from 'lucide-react';
import { FollowUpAnswers, Symptom } from '../types';

interface FollowUpQuestionsProps {
  selectedSymptoms: Symptom[];
  onSubmit: (answers: FollowUpAnswers) => void;
  onBack: () => void;
}

const AGE_GROUPS = [
  { label: 'Infant / Toddler (Under 2 years)', value: 'Infant (<2 years)' },
  { label: 'Child (2 – 11 years)', value: 'Child (2-11 years)' },
  { label: 'Adolescent (12 – 17 years)', value: 'Adolescent (12-17 years)' },
  { label: 'Adult (18 – 64 years)', value: 'Adult (18-64 years)' },
  { label: 'Senior (65+ years)', value: 'Senior (65+ years)' },
];

const DURATIONS = [
  'Less than 24 hours',
  '1 to 3 days',
  '4 to 7 days',
  '1 to 2 weeks',
  'More than 2 weeks',
];

const ONSETS = [
  'Sudden onset (appeared abruptly in minutes/hours)',
  'Gradual onset (built up slowly over several days)',
  'Intermittent (comes and goes in discrete episodes)',
  'Triggered after specific event, exertion, or meal',
];

const SEVERITIES: Array<{
  level: 'Mild' | 'Moderate' | 'Severe';
  label: string;
  desc: string;
}> = [
  {
    level: 'Mild',
    label: 'Mild Discomfort',
    desc: 'Noticeable, but does not interfere with daily routine or rest.',
  },
  {
    level: 'Moderate',
    label: 'Moderate Impact',
    desc: 'Interferes with daily work, concentration, or normal activities.',
  },
  {
    level: 'Severe',
    label: 'Severe / Incapacitating',
    desc: 'Severe distress, bedridden, or unable to perform basic self-care.',
  },
];

const TRENDS = [
  'Getting progressively worse',
  'Staying about the same',
  'Gradually improving',
  'Fluctuating up and down',
];

const FEVER_OPTIONS = [
  'No fever detected (normal temperature)',
  'Mild / Low-grade fever (99.0°F – 100.4°F / 37.2°C – 38.0°C)',
  'Moderate to high fever (>100.4°F / 38.0°C)',
  'Haven’t measured, but feeling warm, flushed, or chills',
];

const PRIOR_HISTORIES = [
  'First time experiencing these symptoms',
  'Occasional recurring flare-up',
  'Known chronic pre-diagnosed condition',
];

const COMMON_CONDITIONS = [
  'None / Generally healthy',
  'High Blood Pressure (Hypertension)',
  'Diabetes (Type 1 or 2)',
  'Asthma / COPD / Lung condition',
  'Heart disease / Coronary history',
  'Chronic Kidney or Liver disease',
  'Currently pregnant or breastfeeding',
  'Immune compromised or taking immunosuppressants',
  'History of stomach ulcers or GI bleeding',
];

export const FollowUpQuestions: React.FC<FollowUpQuestionsProps> = ({
  selectedSymptoms,
  onSubmit,
  onBack,
}) => {
  const [ageGroup, setAgeGroup] = useState<string>('Adult (18-64 years)');
  const [duration, setDuration] = useState<string>('1 to 3 days');
  const [onset, setOnset] = useState<string>(
    'Gradual onset (built up slowly over several days)'
  );
  const [severity, setSeverity] = useState<'Mild' | 'Moderate' | 'Severe'>(
    'Moderate'
  );
  const [trend, setTrend] = useState<string>('Staying about the same');
  const [feverStatus, setFeverStatus] = useState<string>(
    'No fever detected (normal temperature)'
  );
  const [previousHistory, setPreviousHistory] = useState<string>(
    'First time experiencing these symptoms'
  );
  const [currentMedications, setCurrentMedications] = useState<string>('');
  const [medicalConditions, setMedicalConditions] = useState<string[]>([
    'None / Generally healthy',
  ]);

  const toggleCondition = (condition: string) => {
    if (condition === 'None / Generally healthy') {
      setMedicalConditions(['None / Generally healthy']);
      return;
    }
    let updated = medicalConditions.filter((c) => c !== 'None / Generally healthy');
    if (updated.includes(condition)) {
      updated = updated.filter((c) => c !== condition);
    } else {
      updated.push(condition);
    }
    if (updated.length === 0) {
      updated = ['None / Generally healthy'];
    }
    setMedicalConditions(updated);
  };

  const isVulnerableGroup =
    ageGroup.includes('Infant') ||
    ageGroup.includes('Child') ||
    ageGroup.includes('Senior') ||
    medicalConditions.some((c) => c.includes('pregnant') || c.includes('Immune'));

  const hasChestOrNeuro = selectedSymptoms.some(
    (s) =>
      s.category === 'Chest' ||
      s.category === 'Heart and Circulation' ||
      s.category === 'Nervous System' ||
      s.category === 'Respiratory System'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ageGroup,
      duration,
      onset,
      severity,
      trend,
      feverStatus,
      previousHistory,
      currentMedications,
      medicalConditions,
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Allergy Check</span>
      </button>

      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Step 4 of 6 • Clinical Context Questions
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight mt-1">
          Tell us more about how you feel
        </h2>
        <p className="text-sm text-neutral-500 mt-2">
          Answering these tailored questions helps refine general health considerations and safety thresholds.
        </p>

        {/* Selected Symptoms Pills Summary */}
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-neutral-100">
          <span className="text-xs text-neutral-400 self-center mr-1">For:</span>
          {selectedSymptoms.map((s) => (
            <span
              key={s.id}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 border border-neutral-200"
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question 1: Age Group (Crucial safeguard) */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
          <label className="block text-sm font-semibold text-neutral-900 mb-1">
            1. What is your age group?
          </label>
          <p className="text-xs text-neutral-500 mb-3">
            Age is an essential factor for evaluating pediatric or geriatric medical precautions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {AGE_GROUPS.map((grp) => (
              <label
                key={grp.value}
                onClick={() => setAgeGroup(grp.value)}
                className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between cursor-pointer transition-all select-none ${
                  ageGroup === grp.value
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                    : 'bg-neutral-50/50 text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <span>{grp.label}</span>
                {ageGroup === grp.value && <Check className="w-3.5 h-3.5" />}
              </label>
            ))}
          </div>

          {/* Child Safeguard Banner */}
          {(ageGroup.includes('Infant') || ageGroup.includes('Child')) && (
            <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
              <Baby className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Pediatric Care Safeguard:</strong> Children and infants require specialized clinical assessment. Any high fever in babies under 3 months, lethargy, or labored breathing warrants immediate medical care.
              </span>
            </div>
          )}
        </div>

        {/* Question 2: Severity Level */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
          <label className="block text-sm font-semibold text-neutral-900 mb-1">
            2. How severe is the discomfort?
          </label>
          <p className="text-xs text-neutral-500 mb-3">
            Select the rating that best reflects your current ability to function.
          </p>
          <div className="space-y-2">
            {SEVERITIES.map((s) => (
              <div
                key={s.level}
                onClick={() => setSeverity(s.level)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between select-none ${
                  severity === s.level
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                    : 'bg-neutral-50/50 text-neutral-800 border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div>
                  <span className="font-semibold text-sm">{s.label}</span>
                  <p
                    className={`text-xs mt-0.5 ${
                      severity === s.level ? 'text-neutral-300' : 'text-neutral-500'
                    }`}
                  >
                    {s.desc}
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                    severity === s.level
                      ? 'border-white bg-white text-neutral-900'
                      : 'border-neutral-300'
                  }`}
                >
                  {severity === s.level && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Question 3: Duration & Onset */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-1">
              3. How long have you had this?
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-hidden focus:border-neutral-900 focus:bg-white"
            >
              {DURATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-1">
              4. When and how did it start?
            </label>
            <select
              value={onset}
              onChange={(e) => setOnset(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-neutral-800 focus:outline-hidden focus:border-neutral-900 focus:bg-white"
            >
              {ONSETS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Question 5: Trajectory & Fever */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-1">
              5. Is it getting better or worse?
            </label>
            <div className="space-y-1.5 mt-2">
              {TRENDS.map((t) => (
                <label
                  key={t}
                  onClick={() => setTrend(t)}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                    trend === t
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                  }`}
                >
                  <span>{t}</span>
                  {trend === t && <Check className="w-3 h-3" />}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-1">
              6. Do you have a fever?
            </label>
            <div className="space-y-1.5 mt-2">
              {FEVER_OPTIONS.map((f) => (
                <label
                  key={f}
                  onClick={() => setFeverStatus(f)}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                    feverStatus === f
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                  }`}
                >
                  <span className="line-clamp-1">{f}</span>
                  {feverStatus === f && <Check className="w-3 h-3 shrink-0 ml-1" />}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Question 7: Medical History & Current Medications */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
          <label className="block text-sm font-semibold text-neutral-900 mb-1">
            7. Do you have any known medical conditions?
          </label>
          <p className="text-xs text-neutral-500 mb-3">
            Select all that apply to help screen for relevant contraindications.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {COMMON_CONDITIONS.map((cond) => {
              const isChecked = medicalConditions.includes(cond);
              return (
                <div
                  key={cond}
                  onClick={() => toggleCondition(cond)}
                  className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between cursor-pointer transition-all select-none ${
                    isChecked
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <span className="line-clamp-1">{cond}</span>
                  {isChecked && <Check className="w-3 h-3 shrink-0 ml-2" />}
                </div>
              );
            })}
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1">
              Are you currently taking any prescription or regular medications?
            </label>
            <input
              type="text"
              value={currentMedications}
              onChange={(e) => setCurrentMedications(e.target.value)}
              placeholder="e.g., Blood pressure pills, Metformin, Inhaler, Aspirin, none"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-900 focus:bg-white"
            />
          </div>
        </div>

        {/* Sensitive Flag Notice if high risk */}
        {hasChestOrNeuro && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-800">
              <strong className="block font-semibold mb-0.5">
                Chest & Neurological Safety Note:
              </strong>
              If you or the patient are currently experiencing sudden crushing chest pressure radiating to the jaw/arm, sudden slurred speech, or sudden numbness, call 911 or your local emergency number immediately.
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="text-xs font-medium text-neutral-500 hover:text-neutral-800 underline transition-colors"
          >
            Review Allergies
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 text-white font-medium text-sm hover:bg-neutral-800 transition-all shadow-xs cursor-pointer"
          >
            <span>Generate AI Health Analysis (Step 5)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
