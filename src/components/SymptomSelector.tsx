import React, { useState, useMemo } from 'react';
import {
  Search,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Info,
  Filter,
} from 'lucide-react';
import { Symptom, SymptomCategory } from '../types';
import { SYMPTOM_CATEGORIES } from '../data/symptoms';

interface SymptomSelectorProps {
  symptoms: Symptom[];
  selectedSymptoms: Symptom[];
  onToggleSymptom: (symptom: Symptom) => void;
  onRemoveSymptom: (symptomId: string) => void;
  onClearAll: () => void;
  onProceed: () => void;
  onBack: () => void;
}

export const SymptomSelector: React.FC<SymptomSelectorProps> = ({
  symptoms,
  selectedSymptoms,
  onToggleSymptom,
  onRemoveSymptom,
  onClearAll,
  onProceed,
  onBack,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');

  const MAX_SYMPTOMS = 5;

  // Filter symptoms by category, search query, and urgency level
  const filteredSymptoms = useMemo(() => {
    let result = symptoms;

    if (selectedCategory !== 'All') {
      result = result.filter((s) => s.category === selectedCategory);
    }

    if (urgencyFilter !== 'all') {
      result = result.filter((s) => s.urgencyLevel === urgencyFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.commonAssociations?.some((a) => a.toLowerCase().includes(q))
      );
    }

    return result;
  }, [symptoms, selectedCategory, urgencyFilter, searchQuery]);

  // Count by category for badge
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    symptoms.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, [symptoms]);

  const isSelected = (id: string) => selectedSymptoms.some((s) => s.id === id);
  const canSelectMore = selectedSymptoms.length < MAX_SYMPTOMS;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-28">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
            Select Your Symptoms
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Choose up to 5 primary symptoms to analyze. Medically reviewed database of {symptoms.length} symptoms.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-3 self-start sm:self-center">
          <div
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
              selectedSymptoms.length === MAX_SYMPTOMS
                ? 'bg-amber-50 text-amber-900 border-amber-200'
                : selectedSymptoms.length > 0
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-neutral-100 text-neutral-600 border-neutral-200'
            }`}
          >
            {selectedSymptoms.length}/{MAX_SYMPTOMS} symptoms selected
          </div>

          {selectedSymptoms.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs font-medium text-neutral-500 hover:text-neutral-800 underline decoration-neutral-300 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Selected Symptoms Tray (Distinct separate section) */}
      {selectedSymptoms.length > 0 && (
        <div className="mb-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Currently Selected Symptoms ({selectedSymptoms.length}/{MAX_SYMPTOMS})
            </span>
            <span className="text-xs text-neutral-400">
              {MAX_SYMPTOMS - selectedSymptoms.length} more allowed
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedSymptoms.map((sym) => (
              <span
                key={sym.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-neutral-200 text-xs font-medium text-neutral-800 shadow-2xs group"
              >
                <span>{sym.name}</span>
                <button
                  onClick={() => onRemoveSymptom(sym.id)}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                  aria-label={`Remove ${sym.name}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6">
        {/* Instant Search Bar */}
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search across all ${symptoms.length} symptoms (e.g., migraine, nausea, shortness of breath)...`}
            className="w-full bg-white rounded-xl border border-neutral-200 pl-10 pr-10 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-900 focus:ring-3 focus:ring-neutral-100 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Dropdown (All 30 Categories) */}
        <div className="md:col-span-4 relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-white rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-800 focus:outline-hidden focus:border-neutral-900 focus:ring-3 focus:ring-neutral-100 transition-all cursor-pointer appearance-none pr-8"
          >
            <option value="All">All Categories ({symptoms.length} symptoms)</option>
            {SYMPTOM_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat} ({categoryCounts[cat] || 0})
              </option>
            ))}
          </select>
          <Filter className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Category Pills Slider / Quick Filter */}
      <div className="mb-6 overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex gap-1.5 w-max">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
            }`}
          >
            All Categories ({symptoms.length})
          </button>
          {SYMPTOM_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                }`}
              >
                {cat} <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Symptoms Grid */}
      {filteredSymptoms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredSymptoms.map((symptom) => {
            const checked = isSelected(symptom.id);
            const disabled = !checked && !canSelectMore;

            return (
              <div
                key={symptom.id}
                onClick={() => {
                  if (checked || canSelectMore) {
                    onToggleSymptom(symptom);
                  }
                }}
                className={`relative p-4 rounded-xl border text-left transition-all duration-150 select-none ${
                  checked
                    ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs ring-2 ring-neutral-950/10'
                    : disabled
                    ? 'bg-neutral-50/60 border-neutral-200 opacity-50 cursor-not-allowed'
                    : 'bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-2xs cursor-pointer'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span
                    className={`font-semibold text-sm ${
                      checked ? 'text-white' : 'text-neutral-900'
                    }`}
                  >
                    {symptom.name}
                  </span>

                  {/* Selection checkbox pill */}
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                      checked
                        ? 'bg-white text-neutral-900'
                        : 'border border-neutral-300 text-transparent'
                    }`}
                  >
                    {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* Category & Urgency Badges */}
                <div className="flex items-center gap-1.5 mb-2">
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                      checked
                        ? 'bg-neutral-800 text-neutral-300'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {symptom.category}
                  </span>

                  {symptom.urgencyLevel === 'emergency' && (
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-md inline-flex items-center gap-1 ${
                        checked
                          ? 'bg-rose-900/60 text-rose-200 border border-rose-700'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      <AlertTriangle className="w-3 h-3" />
                      Emergency Warning
                    </span>
                  )}
                </div>

                <p
                  className={`text-xs leading-relaxed line-clamp-2 ${
                    checked ? 'text-neutral-300' : 'text-neutral-500'
                  }`}
                >
                  {symptom.description}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-200">
          <Info className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <h3 className="text-base font-semibold text-neutral-900">
            No symptoms found matching &quot;{searchQuery}&quot;
          </h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
            Try a different search term or select another category from the dropdown.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setUrgencyFilter('all');
            }}
            className="mt-4 text-xs font-semibold text-neutral-900 underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-200 py-3.5 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-neutral-500 hidden sm:inline">
              Selected:
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200">
              {selectedSymptoms.length}/{MAX_SYMPTOMS} symptoms
            </span>
            {selectedSymptoms.length === 0 && (
              <span className="text-xs text-neutral-400 hidden md:inline">
                (Select at least 1 symptom to proceed)
              </span>
            )}
          </div>

          <button
            onClick={onProceed}
            disabled={selectedSymptoms.length === 0}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all ${
              selectedSymptoms.length > 0
                ? 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-xs cursor-pointer'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            <span>Continue to Allergy Check (Step 3)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
