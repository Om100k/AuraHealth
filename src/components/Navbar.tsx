import React from 'react';
import { Activity, ShieldAlert, BookOpen, RotateCcw } from 'lucide-react';

interface NavbarProps {
  currentStep: number;
  onNavigate: (step: number) => void;
  onReset: () => void;
  onOpenEmergency: () => void;
  activeTab: 'checker' | 'medicines';
  setActiveTab: (tab: 'checker' | 'medicines') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  onNavigate,
  onReset,
  onOpenEmergency,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => {
            setActiveTab('checker');
            onNavigate(1);
          }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="font-semibold text-neutral-900 tracking-tight text-lg">AuraHealth</span>
            <span className="hidden sm:inline-block ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
              AI Symptom & Medicine Guide
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2">
          <nav className="flex items-center bg-neutral-100 p-1 rounded-xl border border-neutral-200 text-xs sm:text-sm font-medium">
            <button
              onClick={() => {
                setActiveTab('checker');
                if (currentStep === 1) onNavigate(1);
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'checker'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Symptom Checker
            </button>
            <button
              onClick={() => setActiveTab('medicines')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'medicines'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Medicine Catalogue</span>
            </button>
          </nav>

          {/* Emergency Alert Button */}
          <button
            onClick={onOpenEmergency}
            className="hidden md:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors"
            title="When to seek emergency help immediately"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Emergency Signs</span>
          </button>

          {/* Reset button if beyond step 1 */}
          {activeTab === 'checker' && currentStep > 1 && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-neutral-800 px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
              title="Start over"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Start Over</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
