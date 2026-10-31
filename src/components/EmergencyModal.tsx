import React from 'react';
import { X, AlertTriangle, PhoneCall, ShieldAlert, Heart, Eye, Activity } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl border border-rose-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-rose-600 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">
                Emergency Warning Signs (Red Flags)
              </h3>
              <p className="text-xs text-rose-100 mt-0.5">
                When to bypass digital checkers and call emergency services immediately.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-rose-100 hover:text-white hover:bg-rose-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-neutral-700">
          <p className="font-semibold text-rose-950">
            Call emergency services (such as 911 in the US/Canada, 112 in Europe, or your local emergency dispatch) immediately if experiencing:
          </p>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-3">
              <Heart className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-rose-950 font-semibold mb-0.5">
                  Cardiac & Circulatory Emergencies
                </strong>
                <span>
                  Crushing central chest pain radiating to the left arm, neck, jaw, or shoulder; sudden breathlessness, cold clammy sweat, or sudden syncope/collapse.
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-3">
              <Activity className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-rose-950 font-semibold mb-0.5">
                  Stroke Symptoms (B.E. F.A.S.T.)
                </strong>
                <span>
                  Sudden facial drooping, arm weakness or numbness on one side, slurred speech or inability to speak, loss of balance, or sudden loss of vision in one eye.
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-rose-950 font-semibold mb-0.5">
                  Severe Allergic Reaction (Anaphylaxis)
                </strong>
                <span>
                  Swelling of the tongue or throat, wheezing with inability to catch breath, tightness in airway, hives accompanied by lightheadedness or vomiting.
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-3">
              <Eye className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-rose-950 font-semibold mb-0.5">
                  Pediatric & Neurological Red Flags
                </strong>
                <span>
                  Infant under 3 months with fever &gt;100.4°F (38°C); child who is limp or difficult to wake; sudden &quot;thunderclap&quot; worst headache of life; or severe neck stiffness with high fever.
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900 text-white flex items-center justify-between gap-4 mt-4">
            <div>
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                Emergency Dispatch
              </span>
              <span className="text-lg font-bold">Dial 911 or Local Emergency Services</span>
            </div>
            <a
              href="tel:911"
              className="px-4 py-2 rounded-xl bg-rose-600 text-white font-semibold text-xs hover:bg-rose-700 transition-colors inline-flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-medium text-xs hover:bg-neutral-800 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
