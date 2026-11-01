export type SymptomCategory =
  | 'Head and Brain'
  | 'Eyes and Vision'
  | 'Ears'
  | 'Nose and Sinuses'
  | 'Mouth, Teeth and Gums'
  | 'Throat and Neck'
  | 'Respiratory System'
  | 'Heart and Circulation'
  | 'Chest'
  | 'Digestive System'
  | 'Stomach and Abdomen'
  | 'Liver and Gallbladder'
  | 'Urinary System'
  | 'Kidney'
  | 'Reproductive Health'
  | 'Skin and Hair'
  | 'Bones and Joints'
  | 'Muscles'
  | 'Hands and Fingers'
  | 'Legs and Feet'
  | 'Nervous System'
  | 'Mental and Emotional Health'
  | 'General Body Symptoms'
  | 'Allergic Reactions'
  | 'Sleep-Related Symptoms'
  | 'Children\'s Health'
  | 'Women\'s Health'
  | 'Men\'s Health'
  | 'Oral Health'
  | 'Other Symptoms';

export type UrgencyLevel = 'low' | 'moderate' | 'high' | 'emergency';

export interface Symptom {
  id: string;
  name: string;
  category: SymptomCategory;
  description: string;
  commonAssociations?: string[];
  urgencyLevel: UrgencyLevel;
  emergencyWarning?: string;
}

export type AllergyType =
  | 'No known allergies'
  | 'Medicine allergies'
  | 'Food allergies'
  | 'Dust allergies'
  | 'Pollen allergies'
  | 'Skin allergies'
  | 'Other allergies'
  | "I'm not sure";

export interface AllergyProfile {
  types: AllergyType[];
  medicineName?: string;
  medicineReaction?: string;
  foodDetails?: string;
  otherDetails?: string;
  isSkipped?: boolean;
}

export interface FollowUpAnswers {
  duration: string;
  onset: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  trend: string;
  feverStatus: string;
  previousHistory: string;
  currentMedications: string;
  medicalConditions: string[];
  ageGroup: string;
  emergencyRedFlags?: string[];
}

export interface PossibleExplanation {
  title: string;
  description: string;
  uncertaintyNote: string;
  typicalCharacteristics: string[];
  commonTriggers: string[];
}

export interface AIHealthAnalysis {
  symptomSummary: {
    symptoms: string[];
    duration: string;
    severity: string;
    keyAnswers: Record<string, string>;
  };
  possibleExplanations: PossibleExplanation[];
  warningSigns: string[];
  allergyAlerts: string[];
  triage: {
    level: 'emergency' | 'urgent' | 'routine' | 'self_care';
    headline: string;
    actionPoints: string[];
    timeframe: string;
  };
  educationalGuidance: string[];
  pharmacistConsultationGuide: string[];
  suggestedMedicinesForPharmacistReview?: Array<{
    name: string;
    form: string;
    genericName: string;
    purpose: string;
    pharmacistNote: string;
    caution: string;
  }>;
  mandatoryDisclaimer: string;
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  drugCategory: string;
  formType: 'Tablet' | 'Caplet' | 'Capsule' | 'Syrup' | 'Cream / Topical' | 'Nasal Spray' | 'Eye Drops' | 'Oral Solution';
  commonUses: string[];
  importantWarnings: string[];
  knownAllergyConcerns: string[];
  possibleSideEffects: string[];
  interactions: string[];
  contraindications: string[];
  otcStatus: 'Over-the-Counter (OTC)' | 'Pharmacist Consultation Required';
  storageAdvice: string;
  relevantSymptomKeywords: string[];
}

