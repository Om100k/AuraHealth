import React from 'react';
import { X, ShieldAlert, AlertTriangle, Pill, CheckCircle2, AlertOctagon, HeartCrack, Layers } from 'lucide-react';
import { Medicine } from '../types';

interface MedicineModalProps {
  medicine: Medicine | null;
  onClose: () => void;
}

export const MedicineModal: React.FC<MedicineModalProps> = ({
  medicine,
  onClose,
}) => {
  if (!medicine) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-neutral-100 flex items-start justify-between bg-neutral-50/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-900 text-white">
                {medicine.otcStatus}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-300">
                {medicine.formType}
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                Pharmacist Verified
              </span>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
              {medicine.name}
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Generic Active Ingredient: <span className="font-semibold text-neutral-800">{medicine.genericName}</span>
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              Drug Category: <span className="text-neutral-700">{medicine.drugCategory}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Common Uses */}
          <div>
            <div className="flex items-center gap-1.5 font-semibold text-neutral-900 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Common Uses & Indications</span>
            </div>
            <ul className="space-y-1.5 pl-6 list-disc text-neutral-700">
              {medicine.commonUses.map((use, idx) => (
                <li key={idx}>{use}</li>
              ))}
            </ul>
          </div>

          {/* Important Warnings */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Important Warnings & Precautions</span>
            </div>
            <ul className="space-y-1.5 text-xs text-amber-900">
              {medicine.importantWarnings.map((w, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="font-bold">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Known Allergy Concerns */}
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
            <div className="flex items-center gap-1.5 font-bold text-rose-900 mb-2">
              <ShieldAlert className="w-4 h-4 text-rose-700" />
              <span>Known Allergy Concerns & Hypersensitivities</span>
            </div>
            <ul className="space-y-1.5 text-xs text-rose-900">
              {medicine.knownAllergyConcerns.map((a, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="font-bold">•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Possible Side Effects */}
          <div>
            <div className="flex items-center gap-1.5 font-semibold text-neutral-900 mb-2">
              <Layers className="w-4 h-4 text-neutral-600" />
              <span>Possible Side Effects</span>
            </div>
            <ul className="space-y-1.5 pl-6 list-disc text-neutral-700">
              {medicine.possibleSideEffects.map((side, idx) => (
                <li key={idx}>{side}</li>
              ))}
            </ul>
          </div>

          {/* Drug Interactions */}
          <div>
            <div className="flex items-center gap-1.5 font-semibold text-neutral-900 mb-2">
              <HeartCrack className="w-4 h-4 text-neutral-600" />
              <span>Drug Interactions</span>
            </div>
            <ul className="space-y-1.5 pl-6 list-disc text-neutral-700">
              {medicine.interactions.map((interaction, idx) => (
                <li key={idx}>{interaction}</li>
              ))}
            </ul>
          </div>

          {/* Contraindications */}
          <div>
            <div className="flex items-center gap-1.5 font-semibold text-rose-700 mb-2">
              <AlertOctagon className="w-4 h-4 text-rose-700" />
              <span>Absolute & Relative Contraindications</span>
            </div>
            <ul className="space-y-1.5 pl-6 list-disc text-neutral-700">
              {medicine.contraindications.map((contra, idx) => (
                <li key={idx}>{contra}</li>
              ))}
            </ul>
          </div>

          {/* Storage Advice */}
          <div className="pt-3 border-t border-neutral-100 text-xs text-neutral-500">
            <span className="font-semibold text-neutral-700">Storage Advice: </span>
            {medicine.storageAdvice}
          </div>
        </div>

        {/* Modal Footer with Required Disclaimer */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-neutral-500 text-center sm:text-left">
            Pharmacist reference monograph. Never change medications without professional advice.
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors"
          >
            Close Monograph
          </button>
        </div>
      </div>
    </div>
  );
};
