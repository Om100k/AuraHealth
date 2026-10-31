import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import { Symptom } from '../types';

interface HomeViewProps {
  onStartBrowse: () => void;
  onSelectSymptomAndProceed: (symptom: Symptom) => void;
  allSymptoms: Symptom[];
  selectedCount: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartBrowse,
  onSelectSymptomAndProceed,
  allSymptoms,
  selectedCount,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Quick instant search results (up to 6 items)
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const query = searchTerm.toLowerCase().trim();
    return allSymptoms
      .filter((s) => {
        return (
          s.name.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.commonAssociations?.some((a) => a.toLowerCase().includes(query))
        );
      })
      .slice(0, 6);
  }, [searchTerm, allSymptoms]);

  const quickPrompts = [
    { label: 'Headache or Migraine', term: 'Headache' },
    { label: 'Chest Pressure / Tightness', term: 'Chest' },
    { label: 'Stomach Ache or Acid', term: 'Stomach' },
    { label: 'Fever and Chills', term: 'Fever' },
    { label: 'Persistent Cough', term: 'Cough' },
    { label: 'Skin Rash or Itch', term: 'Rash' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4 py-12 max-w-3xl mx-auto">
      {/* AI Health Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-medium text-neutral-600 mb-6 animate-fade-in">
        <Sparkles className="w-3.5 h-3.5 text-neutral-800" />
        <span>Pharmacist-Reviewed Symptom & Medicine Engine</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-neutral-900 text-center mb-4 leading-tight">
        What are you experiencing today?
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-neutral-500 text-center max-w-xl mb-10 leading-relaxed">
        Explore your symptoms and learn about relevant healthcare options.
      </p>

      {/* Minimal Search Box (ChatGPT Inspired) */}
      <div className="w-full relative mb-8">
        <div
          className={`w-full bg-white rounded-2xl border transition-all duration-200 shadow-xs flex items-center px-4 py-3.5 ${
            isFocused
              ? 'border-neutral-900 ring-4 ring-neutral-100'
              : 'border-neutral-200 hover:border-neutral-300'
          }`}
        >
          <Search className="w-5 h-5 text-neutral-400 mr-3 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search symptoms... (e.g., headache, cough, stomach pain, dizziness)"
            className="w-full text-base text-neutral-900 placeholder-neutral-400 focus:outline-hidden bg-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-neutral-400 hover:text-neutral-700 ml-2 px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Live Instant Results Dropdown */}
        {searchTerm.trim().length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-neutral-200 shadow-lg overflow-hidden z-30">
            {searchResults.length > 0 ? (
              <div className="divide-y divide-neutral-100">
                <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 bg-neutral-50">
                  Matching Medically Reviewed Symptoms ({searchResults.length})
                </div>
                {searchResults.map((sym) => (
                  <button
                    key={sym.id}
                    onClick={() => {
                      onSelectSymptomAndProceed(sym);
                      setSearchTerm('');
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-neutral-50 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-neutral-900 text-sm group-hover:text-neutral-950">
                          {sym.name}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 border border-neutral-200">
                          {sym.category}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                        {sym.description}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-700 transition-colors shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-sm text-neutral-500">
                No exact match found for &quot;{searchTerm}&quot;. Click &quot;Browse Symptoms&quot; below to explore all 30 body categories.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Prominent Action Button */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-10">
        <button
          onClick={onStartBrowse}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-neutral-900 text-white font-medium text-sm hover:bg-neutral-800 transition-all shadow-xs group"
        >
          <span>Browse Symptoms</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        {selectedCount > 0 && (
          <span className="text-xs text-neutral-500 font-medium bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
            {selectedCount} symptom{selectedCount > 1 ? 's' : ''} currently selected
          </span>
        )}
      </div>

      {/* Minimal Suggestion Starters */}
      <div className="w-full">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider text-center mb-3">
          Or start with common concerns
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {quickPrompts.map((p) => (
            <button
              key={p.term}
              onClick={() => {
                setSearchTerm(p.term);
                setIsFocused(true);
              }}
              className="text-xs font-medium text-neutral-600 bg-neutral-50 hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200 rounded-xl px-3.5 py-2 transition-colors cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subtle safety footer reminder */}
      <div className="mt-14 pt-6 border-t border-neutral-100 flex items-center justify-center gap-2 text-xs text-neutral-400 text-center max-w-md">
        <ShieldCheck className="w-4 h-4 text-neutral-500 shrink-0" />
        <span>
          Includes 360+ distinct symptoms across 30 anatomical body categories.
        </span>
      </div>
    </div>
  );
};
