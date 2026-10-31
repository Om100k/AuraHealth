import React, { useEffect, useState } from 'react';
import { Loader2, ShieldCheck, HeartHandshake, AlertCircle, Sparkles } from 'lucide-react';

const ANALYSIS_STAGES = [
  'Synthesizing reported symptom profile and clinical duration...',
  'Screening for red flags, emergency indicators, and urgency tiers...',
  'Cross-checking reported allergy history against safe therapeutic considerations...',
  'Evaluating vulnerable age group safeguards and health condition interactions...',
  'Formulating structured pharmacist consultation guidelines...',
];

export const AnalysisLoading: React.FC = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) =>
        prev < ANALYSIS_STAGES.length - 1 ? prev + 1 : prev
      );
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center px-4 py-16 text-center max-w-xl mx-auto">
      {/* Animated Icon Ring */}
      <div className="relative mb-8">
        <div className="w-16 h-16 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-lg relative z-10 animate-pulse">
          <Sparkles className="w-8 h-8 text-neutral-100" />
        </div>
        <div className="absolute inset-0 rounded-2xl bg-neutral-200 animate-ping opacity-25" />
      </div>

      {/* Main Title */}
      <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 tracking-tight mb-2">
        Processing Health Information Engine
      </h3>
      <p className="text-sm text-neutral-500 mb-8 max-w-md">
        Reviewing your symptom responses against evidence-based health references.
      </p>

      {/* Progress Card */}
      <div className="w-full bg-neutral-50 rounded-2xl border border-neutral-200 p-5 shadow-2xs mb-6 text-left">
        <div className="flex items-center gap-3 mb-4">
          <Loader2 className="w-4 h-4 text-neutral-900 animate-spin shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
            Active Clinical Verification Stage
          </span>
        </div>

        <div className="space-y-2.5">
          {ANALYSIS_STAGES.map((stage, idx) => {
            const isDone = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div
                key={stage}
                className={`flex items-start gap-2.5 text-xs transition-opacity duration-300 ${
                  isCurrent
                    ? 'text-neutral-900 font-semibold opacity-100'
                    : isDone
                    ? 'text-neutral-500 opacity-60'
                    : 'text-neutral-400 opacity-30'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] ${
                    isDone
                      ? 'bg-neutral-900 text-white'
                      : isCurrent
                      ? 'border-2 border-neutral-900 text-neutral-900'
                      : 'border border-neutral-300'
                  }`}
                >
                  {isDone ? '✓' : idx + 1}
                </div>
                <span>{stage}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-neutral-400 max-w-sm">
        <ShieldCheck className="w-4 h-4 shrink-0 text-neutral-500" />
        <span>
          Safety notice: This engine provides educational health guidance and never replaces professional diagnostic evaluation.
        </span>
      </div>
    </div>
  );
};
