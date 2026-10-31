import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  FileText,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { AIHealthAnalysis, Symptom } from '../types';
import {
  printClinicalReport,
  downloadHtmlReport,
  downloadTextReport,
} from '../utils/printReport';

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: AIHealthAnalysis;
  selectedSymptoms: Symptom[];
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({
  isOpen,
  onClose,
  analysis,
  selectedSymptoms,
}) => {
  const [copied, setCopied] = useState(false);
  const [printStatus, setPrintStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    setPrintStatus('Opening system print dialog...');
    const ok = printClinicalReport(analysis, selectedSymptoms);
    setTimeout(() => {
      setPrintStatus(
        ok
          ? 'Print triggered! If dialog did not appear, use "Download Report File" below.'
          : 'Could not launch print directly. Please use "Download Report File".'
      );
    }, 1200);
  };

  const handleDownloadHtml = () => {
    downloadHtmlReport(analysis, selectedSymptoms);
  };

  const handleDownloadTxt = () => {
    downloadTextReport(analysis, selectedSymptoms);
  };

  const handleCopy = () => {
    const text = `AURAHEALTH CLINICAL SUMMARY
Generated: ${new Date().toLocaleString()}
Symptoms: ${analysis.symptomSummary.symptoms.join(', ')}
Duration: ${analysis.symptomSummary.duration}
Severity: ${analysis.symptomSummary.severity}
Triage: ${analysis.triage.headline} (${analysis.triage.timeframe})

Mandatory Disclaimer:
${analysis.mandatoryDisclaimer}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const triage = analysis.triage || {
    level: 'routine',
    headline: 'Healthcare Consultation',
    timeframe: '24-48 hours',
    actionPoints: [],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                Print & Export Clinical Health Report
              </h3>
              <p className="text-xs text-neutral-500">
                Prepared for your doctor or pharmacist consultation.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="p-4 bg-white border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Primary Print Button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 text-white font-medium text-xs hover:bg-neutral-800 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Document</span>
            </button>

            {/* Download HTML (Save as PDF) */}
            <button
              onClick={handleDownloadHtml}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 font-medium text-xs transition-colors"
              title="Download standalone HTML file that can be saved as PDF or printed"
            >
              <Download className="w-3.5 h-3.5 text-neutral-500" />
              <span>Save as PDF / HTML</span>
            </button>

            {/* Download Text */}
            <button
              onClick={handleDownloadTxt}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-medium text-xs transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-neutral-500" />
              <span>Download .TXT</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-700 transition-colors"
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
        </div>

        {/* Status notification if triggered */}
        {printStatus && (
          <div className="px-5 py-2 bg-neutral-100 border-b border-neutral-200 text-xs text-neutral-700 flex items-center justify-between">
            <span>{printStatus}</span>
            <button
              onClick={() => setPrintStatus(null)}
              className="text-[11px] underline text-neutral-500 hover:text-neutral-800"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Scrollable Document Preview (Styled like medical intake sheet) */}
        <div className="p-6 overflow-y-auto bg-neutral-100/60 flex-1">
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-neutral-300 p-8 shadow-xs text-xs sm:text-sm text-neutral-900 space-y-6">
            {/* Document Header */}
            <div className="border-b-2 border-neutral-900 pb-4 flex justify-between items-end">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-neutral-900">
                  AuraHealth Clinical Intake Summary
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  AI Symptom Analysis & Pharmacist Health Reference Report
                </p>
              </div>
              <div className="text-right text-[11px] text-neutral-500">
                <strong>Date Generated:</strong>
                <div>{new Date().toLocaleDateString()}</div>
              </div>
            </div>

            {/* Triage Banner */}
            <div className="p-3.5 rounded-lg border border-neutral-300 bg-neutral-50">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-neutral-900 text-white mb-1.5">
                {triage.level.toUpperCase()} TIER
              </span>
              <h4 className="text-sm font-bold text-neutral-900">
                {triage.headline}
              </h4>
              <p className="text-xs text-neutral-600 mt-0.5">
                Timeframe: {triage.timeframe}
              </p>
              <ul className="mt-2 space-y-1 text-xs text-neutral-700 pl-4 list-disc">
                {triage.actionPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>

            {/* Reported Symptoms */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 border-b border-neutral-200 pb-1 mb-2">
                1. Patient Reported Symptoms & Profile
              </h4>
              <div className="grid grid-cols-3 gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs mb-2">
                <div>
                  <strong className="block text-neutral-500 text-[10px] uppercase">
                    Symptoms
                  </strong>
                  <span className="font-semibold text-neutral-900">
                    {analysis.symptomSummary.symptoms.join(', ')}
                  </span>
                </div>
                <div>
                  <strong className="block text-neutral-500 text-[10px] uppercase">
                    Duration
                  </strong>
                  <span className="font-semibold text-neutral-900">
                    {analysis.symptomSummary.duration}
                  </span>
                </div>
                <div>
                  <strong className="block text-neutral-500 text-[10px] uppercase">
                    Severity
                  </strong>
                  <span className="font-semibold text-neutral-900">
                    {analysis.symptomSummary.severity} Impact
                  </span>
                </div>
              </div>

              {analysis.symptomSummary.keyAnswers && (
                <div className="p-2.5 bg-neutral-50/50 rounded-lg border border-neutral-100 text-[11px] text-neutral-600 space-y-0.5">
                  {Object.entries(analysis.symptomSummary.keyAnswers).map(
                    ([k, v]) => (
                      <div key={k}>
                        <strong>{k}:</strong> {v}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Emergency Warnings */}
            {analysis.warningSigns && analysis.warningSigns.length > 0 && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900">
                <strong className="block font-bold uppercase tracking-wider mb-1">
                  Critical Warning Signs to Monitor:
                </strong>
                <ul className="list-disc pl-4 space-y-1">
                  {analysis.warningSigns.map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* General Explanations */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 border-b border-neutral-200 pb-1 mb-2">
                2. General Considerations (Non-Definitive)
              </h4>
              <div className="space-y-2.5">
                {analysis.possibleExplanations.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-neutral-200 rounded-lg text-xs"
                  >
                    <div className="font-bold text-neutral-900 mb-0.5">
                      {exp.title}
                    </div>
                    <div className="text-neutral-700 mb-1">{exp.description}</div>
                    <div className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-sm inline-block">
                      Uncertainty: {exp.uncertaintyNote}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pharmacist Questions */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 border-b border-neutral-200 pb-1 mb-2">
                3. Questions for Healthcare Provider / Pharmacist
              </h4>
              <ul className="list-decimal pl-4 space-y-1 text-xs text-neutral-700">
                {analysis.pharmacistConsultationGuide.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>

            {/* Mandatory Disclaimer */}
            <div className="pt-3 border-t-2 border-neutral-900 text-[10px] text-neutral-500 leading-relaxed">
              <strong>MANDATORY DISCLAIMER:</strong> &quot;{analysis.mandatoryDisclaimer}&quot;
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-neutral-400" />
            <span>Ready for doctor or pharmacist consultation</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-medium text-xs hover:bg-neutral-800 transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
