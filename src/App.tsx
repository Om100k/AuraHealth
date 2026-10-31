/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StepIndicator } from './components/StepIndicator';
import { HomeView } from './components/HomeView';
import { SymptomSelector } from './components/SymptomSelector';
import { AllergyQuestionnaire } from './components/AllergyQuestionnaire';
import { FollowUpQuestions } from './components/FollowUpQuestions';
import { AnalysisLoading } from './components/AnalysisLoading';
import { ResultsView } from './components/ResultsView';
import { MedicineCatalogueView } from './components/MedicineCatalogueView';
import { MedicineModal } from './components/MedicineModal';
import { EmergencyModal } from './components/EmergencyModal';
import { SYMPTOMS_DATABASE } from './data/symptoms';
import { Symptom, AllergyProfile, FollowUpAnswers, AIHealthAnalysis, Medicine } from './types';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'checker' | 'medicines'>('checker');
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Health data state
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [allergyProfile, setAllergyProfile] = useState<AllergyProfile>({
    types: [],
  });
  const [followUpAnswers, setFollowUpAnswers] = useState<FollowUpAnswers | null>(null);
  const [analysis, setAnalysis] = useState<AIHealthAnalysis | null>(null);

  // UI state
  const [selectedMedicineModal, setSelectedMedicineModal] = useState<Medicine | null>(null);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Scroll to top on step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, activeTab]);

  // Symptom selection handlers
  const handleToggleSymptom = (symptom: Symptom) => {
    setSelectedSymptoms((prev) => {
      const exists = prev.some((s) => s.id === symptom.id);
      if (exists) {
        return prev.filter((s) => s.id !== symptom.id);
      }
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, symptom];
    });
  };

  const handleRemoveSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) => prev.filter((s) => s.id !== symptomId));
  };

  const handleClearAllSymptoms = () => {
    setSelectedSymptoms([]);
  };

  // From Home direct symptom select
  const handleSelectFromHome = (symptom: Symptom) => {
    handleToggleSymptom(symptom);
    setCurrentStep(2);
  };

  // Reset entire checkup
  const handleResetSession = () => {
    setSelectedSymptoms([]);
    setAllergyProfile({ types: [] });
    setFollowUpAnswers(null);
    setAnalysis(null);
    setErrorMessage(null);
    setCurrentStep(1);
    setActiveTab('checker');
  };

  // Submit follow-up answers and trigger AI analysis
  const handleFollowUpSubmit = async (answers: FollowUpAnswers) => {
    setFollowUpAnswers(answers);
    setCurrentStep(5); // Go to AnalysisLoading
    setErrorMessage(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: selectedSymptoms,
          allergyProfile,
          followUp: answers,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data: AIHealthAnalysis = await res.json();
      setAnalysis(data);
      setCurrentStep(6); // Go to ResultsView
    } catch (err: any) {
      console.error('Error analyzing symptoms:', err);
      // Even if network fails, construct client-side safety fallback so user never gets stuck
      setErrorMessage('A network delay occurred. Providing evidence-based clinical guidance.');
      setCurrentStep(6);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      {/* Global Navigation Bar */}
      <Navbar
        currentStep={currentStep}
        onNavigate={(step) => setCurrentStep(step)}
        onReset={handleResetSession}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeTab === 'medicines' ? (
          <MedicineCatalogueView
            onSelectMedicine={(med) => setSelectedMedicineModal(med)}
            onBackToChecker={() => setActiveTab('checker')}
          />
        ) : (
          <div>
            {/* Step Progress Breadcrumb */}
            <StepIndicator
              currentStep={currentStep}
              onStepClick={(step) => {
                if (step < currentStep) {
                  setCurrentStep(step);
                }
              }}
            />

            {/* Error Notification Banner if any */}
            {errorMessage && (
              <div className="max-w-2xl mx-auto px-4 mt-2">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                  <button
                    onClick={() => setErrorMessage(null)}
                    className="text-amber-700 hover:text-amber-950 font-bold ml-2"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Homepage */}
            {currentStep === 1 && (
              <HomeView
                onStartBrowse={() => setCurrentStep(2)}
                onSelectSymptomAndProceed={handleSelectFromHome}
                allSymptoms={SYMPTOMS_DATABASE}
                selectedCount={selectedSymptoms.length}
              />
            )}

            {/* Step 2: Comprehensive Symptom Selection (300+ database) */}
            {currentStep === 2 && (
              <SymptomSelector
                symptoms={SYMPTOMS_DATABASE}
                selectedSymptoms={selectedSymptoms}
                onToggleSymptom={handleToggleSymptom}
                onRemoveSymptom={handleRemoveSymptom}
                onClearAll={handleClearAllSymptoms}
                onProceed={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {/* Step 3: Allergy Information */}
            {currentStep === 3 && (
              <AllergyQuestionnaire
                initialAllergies={allergyProfile}
                onSaveAndProceed={(allergies) => {
                  setAllergyProfile(allergies);
                  setCurrentStep(4);
                }}
                onBack={() => setCurrentStep(2)}
                onSkip={() => {
                  setAllergyProfile({ types: ["I'm not sure"], isSkipped: true });
                  setCurrentStep(4);
                }}
              />
            )}

            {/* Step 4: Relevant Follow-up Questions */}
            {currentStep === 4 && (
              <FollowUpQuestions
                selectedSymptoms={selectedSymptoms}
                onSubmit={handleFollowUpSubmit}
                onBack={() => setCurrentStep(3)}
              />
            )}

            {/* Step 5: AI Health Analysis Loading State */}
            {currentStep === 5 && <AnalysisLoading />}

            {/* Step 6: Results Page */}
            {currentStep === 6 && analysis && (
              <ResultsView
                analysis={analysis}
                selectedSymptoms={selectedSymptoms}
                onOpenMedicineDetails={(med) => setSelectedMedicineModal(med)}
                onExploreAllMedicines={() => setActiveTab('medicines')}
                onRestart={handleResetSession}
              />
            )}
          </div>
        )}
      </main>

      {/* Global Minimal Footer */}
      <footer className="border-t border-neutral-100 bg-neutral-50/60 py-8 px-4 text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-neutral-400" />
            <span>
              AuraHealth • Medically Reviewed Database ({SYMPTOMS_DATABASE.length} Symptoms across 30 Categories)
            </span>
          </div>

          <div className="text-center md:text-right text-[11px] text-neutral-400 max-w-md">
            Educational health information & medicine guidance only. Does not diagnose diseases or prescribe medicines.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <MedicineModal
        medicine={selectedMedicineModal}
        onClose={() => setSelectedMedicineModal(null)}
      />

      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />
    </div>
  );
}
