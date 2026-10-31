import React, { useState } from 'react';
import { Check, ArrowRight, ArrowLeft, AlertCircle, ShieldAlert } from 'lucide-react';
import { AllergyProfile, AllergyType } from '../types';

interface AllergyQuestionnaireProps {
  initialAllergies: AllergyProfile;
  onSaveAndProceed: (allergies: AllergyProfile) => void;
  onBack: () => void;
  onSkip: () => void;
}

const ALLERGY_OPTIONS: AllergyType[] = [
  'No known allergies',
  'Medicine allergies',
  'Food allergies',
  'Dust allergies',
  'Pollen allergies',
  'Skin allergies',
  'Other allergies',
  "I'm not sure",
];

export const AllergyQuestionnaire: React.FC<AllergyQuestionnaireProps> = ({
  initialAllergies,
  onSaveAndProceed,
  onBack,
  onSkip,
}) => {
  const [selectedTypes, setSelectedTypes] = useState<AllergyType[]>(
    initialAllergies.types || []
  );
  const [medicineName, setMedicineName] = useState<string>(
    initialAllergies.medicineName || ''
  );
  const [medicineReaction, setMedicineReaction] = useState<string>(
    initialAllergies.medicineReaction || ''
  );
  const [foodDetails, setFoodDetails] = useState<string>(
    initialAllergies.foodDetails || ''
  );
  const [otherDetails, setOtherDetails] = useState<string>(
    initialAllergies.otherDetails || ''
  );

  const toggleAllergy = (type: AllergyType) => {
    if (type === 'No known allergies') {
      setSelectedTypes(['No known allergies']);
      return;
    }

    let next = selectedTypes.filter((t) => t !== 'No known allergies');

    if (type === "I'm not sure") {
      if (selectedTypes.includes("I'm not sure")) {
        next = next.filter((t) => t !== "I'm not sure");
      } else {
        next = ["I'm not sure"];
      }
      setSelectedTypes(next);
      return;
    }

    next = next.filter((t) => t !== "I'm not sure");

    if (next.includes(type)) {
      next = next.filter((t) => t !== type);
    } else {
      next.push(type);
    }

    setSelectedTypes(next);
  };

  const hasMedicineAllergy = selectedTypes.includes('Medicine allergies');
  const hasFoodAllergy = selectedTypes.includes('Food allergies');
  const hasOtherAllergy = selectedTypes.includes('Other allergies');

  const handleContinue = () => {
    onSaveAndProceed({
      types: selectedTypes.length > 0 ? selectedTypes : ["I'm not sure"],
      medicineName: hasMedicineAllergy ? medicineName : undefined,
      medicineReaction: hasMedicineAllergy ? medicineReaction : undefined,
      foodDetails: hasFoodAllergy ? foodDetails : undefined,
      otherDetails: hasOtherAllergy ? otherDetails : undefined,
      isSkipped: false,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Symptom Selection</span>
      </button>

      {/* Card Header */}
      <div className="mb-6">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Step 3 of 6 • Patient Safety Screening
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight mt-1">
          Do you have any known allergies?
        </h2>
        <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
          Screening for allergies ensures relevant health safety warnings and prevents potential medicine contraindication risks. You may select multiple options.
        </p>
      </div>

      {/* Allergy Selection Cards (Multi-select) */}
      <div className="space-y-2.5 mb-6">
        {ALLERGY_OPTIONS.map((option) => {
          const isChecked = selectedTypes.includes(option);
          const isMedicine = option === 'Medicine allergies';

          return (
            <div
              key={option}
              onClick={() => toggleAllergy(option)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between select-none ${
                isChecked
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                  : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-white text-neutral-900'
                      : 'border border-neutral-300 text-transparent'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="text-sm font-medium">{option}</span>
              </div>

              {isMedicine && (
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                    isChecked ? 'bg-neutral-800 text-amber-300' : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  Crucial for drug safety
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Conditional: Medicine Allergy Details */}
      {hasMedicineAllergy && (
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 mb-6 space-y-3.5 animate-fade-in">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Medicine Allergy Details
              </h4>
              <p className="text-xs text-amber-700 mt-0.5">
                Specify the drug name and reaction (e.g., Penicillin, Aspirin, Sulfa antibiotics) to screen for cross-sensitivities.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">
              Medicine Name(s)
            </label>
            <input
              type="text"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              placeholder="e.g., Penicillin, Amoxicillin, Ibuprofen, Aspirin, Sulfa drugs"
              className="w-full bg-white rounded-lg border border-amber-200 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">
              Known Reaction (optional)
            </label>
            <input
              type="text"
              value={medicineReaction}
              onChange={(e) => setMedicineReaction(e.target.value)}
              placeholder="e.g., Hives, facial swelling, breathing difficulty, severe nausea"
              className="w-full bg-white rounded-lg border border-amber-200 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-900"
            />
          </div>
        </div>
      )}

      {/* Conditional: Food Allergy Details */}
      {hasFoodAllergy && (
        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 mb-6 space-y-2 animate-fade-in">
          <label className="block text-xs font-medium text-neutral-700">
            Food Allergies (e.g., Peanuts, shellfish, lactose, gluten)
          </label>
          <input
            type="text"
            value={foodDetails}
            onChange={(e) => setFoodDetails(e.target.value)}
            placeholder="e.g., Peanuts, Tree nuts, Dairy/Lactose, Eggs, Wheat"
            className="w-full bg-white rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-900"
          />
        </div>
      )}

      {/* Conditional: Other Allergy Details */}
      {hasOtherAllergy && (
        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 mb-6 space-y-2 animate-fade-in">
          <label className="block text-xs font-medium text-neutral-700">
            Other Known Allergies (e.g., Latex, bee stings, pet dander)
          </label>
          <input
            type="text"
            value={otherDetails}
            onChange={(e) => setOtherDetails(e.target.value)}
            placeholder="e.g., Latex, Insect venom, Dyes, Preservatives"
            className="w-full bg-white rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-900"
          />
        </div>
      )}

      {/* Safety Notice Regarding Skipping */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 mb-6">
        <AlertCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
        <span>
          <strong>Clinical Safety Protocol:</strong> Skipping this question does not imply the absence of allergies. Always confirm drug ingredients with a pharmacist.
        </span>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <button
          onClick={onSkip}
          className="text-xs font-medium text-neutral-500 hover:text-neutral-800 underline decoration-neutral-300 transition-colors"
        >
          Skip this step
        </button>

        <button
          onClick={handleContinue}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 text-white font-medium text-sm hover:bg-neutral-800 transition-all shadow-xs"
        >
          <span>Continue to Details (Step 4)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
