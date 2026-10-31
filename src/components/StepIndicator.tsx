import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  onStepClick?: (step: number) => void;
}

const STEPS = [
  { step: 1, label: 'Start' },
  { step: 2, label: 'Symptoms' },
  { step: 3, label: 'Allergies' },
  { step: 4, label: 'Details' },
  { step: 5, label: 'Analysis' },
  { step: 6, label: 'Results' },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onStepClick,
}) => {
  if (currentStep === 1) return null; // Keep Homepage completely minimal as requested

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 -translate-y-1/2 z-0" />

        {/* Progress highlight line */}
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-neutral-900 -translate-y-1/2 transition-all duration-300 z-0"
          style={{
            width: `${((Math.min(currentStep, 6) - 1) / (STEPS.length - 1)) * 100}%`,
          }}
        />

        {STEPS.map((s) => {
          const isCompleted = currentStep > s.step;
          const isCurrent = currentStep === s.step;
          const isClickable = isCompleted && onStepClick;

          return (
            <div
              key={s.step}
              onClick={() => isClickable && onStepClick(s.step)}
              className={`relative z-10 flex flex-col items-center group ${
                isClickable ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
                  isCompleted
                    ? 'bg-neutral-900 text-white'
                    : isCurrent
                    ? 'bg-white border-2 border-neutral-900 text-neutral-900 ring-4 ring-neutral-100'
                    : 'bg-white border-2 border-neutral-300 text-neutral-400'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : s.step}
              </div>
              <span
                className={`text-[11px] font-medium mt-1.5 hidden sm:block ${
                  isCurrent
                    ? 'text-neutral-900 font-semibold'
                    : isCompleted
                    ? 'text-neutral-600'
                    : 'text-neutral-400'
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
