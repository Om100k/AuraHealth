import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  Activity,
  HeartPulse,
  ShieldAlert,
  HelpCircle,
  FileText,
  Printer,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  BookOpen,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Download,
} from 'lucide-react';
import { AIHealthAnalysis, Medicine, Symptom } from '../types';
import { MEDICINES_CATALOGUE } from '../data/medicines';
import { PrintReportModal } from './PrintReportModal';
import { printClinicalReport, downloadHtmlReport } from '../utils/printReport';

interface ResultsViewProps {
  analysis: AIHealthAnalysis;
  selectedSymptoms: Symptom[];
  onOpenMedicineDetails: (med: Medicine) => void;
  onExploreAllMedicines: () => void;
  onRestart: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  analysis,
  selectedSymptoms,
  onOpenMedicineDetails,
  onExploreAllMedicines,
  onRestart,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Cross reference relevant medicine catalogue entries for exploration
  const relevantMedicines = React.useMemo(() => {
    const symTerms = selectedSymptoms.map((s) => s.name.toLowerCase());
    return MEDICINES_CATALOGUE.filter((med) => {
      return (
        med.relevantSymptomKeywords.some((k) =>
          symTerms.some((st) => st.includes(k) || k.includes(st))
        ) ||
        med.commonUses.some((use) =>
          symTerms.some((st) => use.toLowerCase().includes(st))
        )
      );
    }).slice(0, 4);
  }, [selectedSymptoms]);

  const triage = analysis.triage || {
    level: 'routine',
    headline: "Consult a Healthcare Professional",
    actionPoints: ['Monitor symptoms', 'Seek doctor review if symptoms persist'],
    timeframe: 'Within 24 to 48 hours',
  };

  const getTriageTheme = (level: string) => {
    switch (level) {
      case 'emergency':
        return {
          bg: 'bg-rose-50',
          border: 'border-rose-300',
          badgeBg: 'bg-rose-600',
          badgeText: 'text-white',
          titleColor: 'text-rose-950',
          textColor: 'text-rose-800',
          label: 'Immediate Emergency Care Required (Call 911 / ER)',
        };
      case 'urgent':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-300',
          badgeBg: 'bg-amber-600',
          badgeText: 'text-white',
          titleColor: 'text-amber-950',
          textColor: 'text-amber-800',
          label: 'Prompt Medical Attention (Urgent Care / Same-Day Clinic)',
        };
      case 'self_care':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-300',
          badgeBg: 'bg-emerald-700',
          badgeText: 'text-white',
          titleColor: 'text-emerald-950',
          textColor: 'text-emerald-800',
          label: 'Self-Monitoring & Pharmacist Consultation Appropriate',
        };
      case 'routine':
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-300',
          badgeBg: 'bg-blue-700',
          badgeText: 'text-white',
          titleColor: 'text-blue-950',
          textColor: 'text-blue-800',
          label: "Doctor's Consultation Recommended",
        };
    }
  };

  const theme = getTriageTheme(triage.level);

  // Copy clinical summary to clipboard
  const handleCopySummary = () => {
    const text = `AURAHEALTH CLINICAL SUMMARY LOG:
Reported Symptoms: ${analysis.symptomSummary.symptoms.join(', ')}
Duration: ${analysis.symptomSummary.duration}
Severity: ${analysis.symptomSummary.severity}
Key Details: ${JSON.stringify(analysis.symptomSummary.keyAnswers, null, 2)}
Triage Level: ${triage.headline} (${triage.timeframe})

Mandatory Disclaimer:
${analysis.mandatoryDisclaimer}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    // Directly trigger print through our clean iframe printer
    printClinicalReport(analysis, selectedSymptoms);
    // Also open the preview modal for manual controls / download fallback
    setIsPrintModalOpen(true);
  };

  const handleDownload = () => {
    downloadHtmlReport(analysis, selectedSymptoms);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 print:p-0">
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200 print:hidden">
        <div>
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Step 6 of 6 • Clinical Health Synthesis
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight mt-0.5">
            Health Information & Guidance
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-700 transition-colors"
            title="Copy report for doctor or pharmacist"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-500" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-neutral-900 bg-neutral-900 hover:bg-neutral-800 text-xs font-medium text-white transition-colors shadow-xs"
            title="Print clean medical report"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-700 transition-colors"
            title="Save standalone report file (can be printed or saved as PDF)"
          >
            <Download className="w-3.5 h-3.5 text-neutral-500" />
            <span>Save PDF / HTML</span>
          </button>

          <button
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-100 text-xs font-medium text-neutral-600 transition-colors ml-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Over</span>
          </button>
        </div>
      </div>

      {/* SECTION D: Next Steps / Triage Banner (Placed at the very top for urgent safety visibility) */}
      <div
        className={`p-6 rounded-2xl border ${theme.bg} ${theme.border} shadow-xs relative overflow-hidden`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-10 h-10 rounded-xl ${theme.badgeBg} ${theme.badgeText} flex items-center justify-center shrink-0 shadow-xs`}
          >
            {triage.level === 'emergency' ? (
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            ) : (
              <HeartPulse className="w-6 h-6" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${theme.badgeBg} ${theme.badgeText}`}
              >
                {theme.label}
              </span>
              <span className="text-xs font-medium text-neutral-600 bg-white/80 px-2 py-0.5 rounded-md border border-neutral-200/60">
                Recommended timeframe: {triage.timeframe}
              </span>
            </div>

            <h2 className={`text-lg sm:text-xl font-bold ${theme.titleColor} mt-1`}>
              {triage.headline}
            </h2>

            <ul className="mt-3 space-y-1.5 text-xs sm:text-sm">
              {triage.actionPoints.map((point, i) => (
                <li key={i} className={`flex items-start gap-2 ${theme.textColor}`}>
                  <span className="font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION A: Symptom Summary */}
      <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-100">
          <FileText className="w-4 h-4 text-neutral-600" />
          <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
            A. Symptom Summary
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
              Reported Symptoms
            </span>
            <div className="flex flex-wrap gap-1.5">
              {analysis.symptomSummary.symptoms.map((s) => (
                <span
                  key={s}
                  className="text-xs font-medium px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-neutral-800"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
              Duration & Progression
            </span>
            <p className="text-sm font-semibold text-neutral-900">
              {analysis.symptomSummary.duration}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Onset: {analysis.symptomSummary.keyAnswers?.['Onset Pattern'] || 'Noted'}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
              Reported Severity
            </span>
            <p className="text-sm font-semibold text-neutral-900">
              {analysis.symptomSummary.severity} Impact
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Age Group: {analysis.symptomSummary.keyAnswers?.['Age Group'] || 'Adult'}
            </p>
          </div>
        </div>

        {/* Key Answers Table / Mini Specs */}
        {analysis.symptomSummary.keyAnswers && (
          <div className="p-3 rounded-xl bg-neutral-50/60 border border-neutral-100 text-xs text-neutral-600 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(analysis.symptomSummary.keyAnswers).map(
              ([key, val]) => (
                <div key={key}>
                  <span className="font-semibold text-neutral-700 block text-[11px]">
                    {key}:
                  </span>
                  <span className="text-neutral-600 line-clamp-1">{val}</span>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* SECTION B: Health Information (Possible general explanations with explicit uncertainty language) */}
      <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-neutral-600" />
            <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
              B. Possible General Explanations
            </h3>
          </div>
          <span className="text-xs text-neutral-500 italic">
            Clinical uncertainty applies — non-definitive
          </span>
        </div>

        <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
          The following explanations reflect patterns commonly recognized in clinical literature for the selected symptoms. These are possibilities for educational discussion and do NOT constitute a diagnosis.
        </p>

        <div className="space-y-4">
          {analysis.possibleExplanations.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h4 className="text-sm font-semibold text-neutral-900">
                  {item.title}
                </h4>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-neutral-200 text-neutral-700 shrink-0">
                  General Consideration
                </span>
              </div>

              <p className="text-xs text-neutral-700 leading-relaxed mb-3">
                {item.description}
              </p>

              <div className="flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/80 mb-2.5">
                <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                <span><strong>Clinical uncertainty notice:</strong> {item.uncertaintyNote}</span>
              </div>

              {item.typicalCharacteristics && item.typicalCharacteristics.length > 0 && (
                <div className="text-xs text-neutral-600">
                  <span className="font-semibold text-neutral-700">Typical characteristics: </span>
                  {item.typicalCharacteristics.join(' • ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Warning Signs & Red Flags */}
      {analysis.warningSigns && analysis.warningSigns.length > 0 && (
        <div className="p-6 rounded-2xl bg-rose-50/70 border border-rose-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-rose-200/60">
            <ShieldAlert className="w-4 h-4 text-rose-700" />
            <h3 className="text-base font-semibold text-rose-950 tracking-tight">
              Emergency Warning Signs & Critical Red Flags
            </h3>
          </div>
          <p className="text-xs text-rose-800 mb-3">
            If any of the following emergency symptoms develop or intensify, do not wait — seek urgent emergency medical care immediately:
          </p>
          <ul className="space-y-2">
            {analysis.warningSigns.map((w, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs sm:text-sm text-rose-900 font-medium"
              >
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Allergy Alerts (If user reported any allergies) */}
      {analysis.allergyAlerts && analysis.allergyAlerts.length > 0 && (
        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-amber-800" />
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Allergy Cross-Reference Alerts
            </h4>
          </div>
          <ul className="space-y-1.5 text-xs text-amber-900">
            {analysis.allergyAlerts.map((alert, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span>•</span>
                <span>{alert}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SECTION C: Pharmacist-Verified Medicine Information Catalogue */}
      <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-neutral-600" />
            <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
              C. Medicine Information (Pharmacist-Verified Catalogue)
            </h3>
          </div>
          <button
            onClick={onExploreAllMedicines}
            className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-800 hover:text-neutral-950 underline cursor-pointer"
          >
            <span>Browse Full Catalogue</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Safety Note on Prescriptions */}
        <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 mb-5 leading-relaxed">
          <p className="font-semibold text-neutral-800 mb-0.5">
            Important Educational Safety Protocol:
          </p>
          Our platform does not automatically prescribe, rank, or recommend 1–10 medicines based on symptoms. We do not generate dosages or treatment schedules. Below is verified pharmacological reference data for educational discussion with your pharmacist.
        </div>

        {/* Relevant Medicine Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relevantMedicines.map((med) => (
            <div
              key={med.id}
              onClick={() => onOpenMedicineDetails(med)}
              className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-neutral-950">
                    {med.name}
                  </h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 shrink-0">
                    {med.otcStatus}
                  </span>
                </div>

                <p className="text-xs text-neutral-500 mb-2">
                  Generic: <span className="font-medium text-neutral-700">{med.genericName}</span>
                </p>

                <p className="text-xs text-neutral-600 line-clamp-2 mb-3">
                  {med.commonUses[0]}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-medium">
                <span>View monograph details</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-800 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pharmacist Consultation Checklist */}
      <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-3">
          Questions to Discuss with Your Doctor or Pharmacist
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
          {analysis.pharmacistConsultationGuide.map((q, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{q}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* SECTION 7: MANDATORY DISCLAIMER (Prominently displayed below results as required) */}
      <div className="p-6 rounded-2xl bg-neutral-900 text-neutral-100 shadow-md">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
              Mandatory Healthcare Disclaimer
            </span>
            <p className="text-sm font-medium text-white leading-relaxed">
              &quot;{analysis.mandatoryDisclaimer}&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Print & Export Clinical Report Modal */}
      <PrintReportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        analysis={analysis}
        selectedSymptoms={selectedSymptoms}
      />
    </div>
  );
};
