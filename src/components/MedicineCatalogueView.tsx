import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Filter,
  ShieldCheck,
  ChevronRight,
  AlertTriangle,
  Pill,
  Sparkles,
} from 'lucide-react';
import { Medicine } from '../types';
import { MEDICINES_CATALOGUE } from '../data/medicines';

interface MedicineCatalogueViewProps {
  onSelectMedicine: (med: Medicine) => void;
  onBackToChecker: () => void;
}

export const MedicineCatalogueView: React.FC<MedicineCatalogueViewProps> = ({
  onSelectMedicine,
  onBackToChecker,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    MEDICINES_CATALOGUE.forEach((m) => set.add(m.drugCategory));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredMedicines = useMemo(() => {
    return MEDICINES_CATALOGUE.filter((med) => {
      const matchCat =
        selectedCategory === 'All' || med.drugCategory === selectedCategory;
      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        med.name.toLowerCase().includes(q) ||
        med.genericName.toLowerCase().includes(q) ||
        med.drugCategory.toLowerCase().includes(q) ||
        med.commonUses.some((u) => u.toLowerCase().includes(q)) ||
        med.importantWarnings.some((w) => w.toLowerCase().includes(q));

      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={onBackToChecker}
            className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 mb-2 transition-colors inline-block"
          >
            ← Back to Symptom Checker
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
              Pharmacist-Verified Medicine Catalogue
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200">
              Verified
            </span>
          </div>
          <p className="text-sm text-neutral-500 mt-1 max-w-2xl">
            Explore comprehensive pharmacological monographs, common indications, warnings, allergy cautions, side effects, and contraindications.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 max-w-xs self-start">
          <ShieldCheck className="w-4 h-4 text-neutral-700 mb-1" />
          <span>
            <strong>Safety Mandate:</strong> We do not prescribe or rank drugs. Always consult a licensed doctor or pharmacist before use.
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search medicine by brand name, generic ingredient, or use (e.g. Paracetamol, Ibuprofen, Allergy)..."
            className="w-full bg-white rounded-xl border border-neutral-200 pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-900 focus:ring-3 focus:ring-neutral-100 transition-all"
          />
        </div>

        <div className="md:col-span-4 relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-white rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-800 focus:outline-hidden focus:border-neutral-900 transition-all cursor-pointer appearance-none pr-8"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Drug Categories' : cat}
              </option>
            ))}
          </select>
          <Filter className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Grid of Medicines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {filteredMedicines.map((med) => (
          <div
            key={med.id}
            onClick={() => onSelectMedicine(med)}
            className="p-5 rounded-2xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-900 text-white">
                    {med.formType}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200">
                    {med.otcStatus}
                  </span>
                </div>
                <Pill className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
              </div>

              <h3 className="text-base font-bold text-neutral-900 group-hover:text-neutral-950 tracking-tight">
                {med.name}
              </h3>
              <p className="text-xs text-neutral-500 font-medium mb-1">
                Generic: {med.genericName}
              </p>
              <p className="text-[11px] text-neutral-400 mb-3">
                {med.drugCategory}
              </p>

              <div className="space-y-1.5 text-xs text-neutral-600 mb-4">
                <div className="line-clamp-2">
                  <span className="font-semibold text-neutral-800">Key Use: </span>
                  {med.commonUses[0]}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-800 group-hover:text-neutral-950">
              <span>View full monograph</span>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="p-6 rounded-2xl bg-neutral-900 text-white">
        <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
          Mandatory Health Disclaimer
        </h4>
        <p className="text-sm font-medium leading-relaxed">
          &quot;Our platform provides educational health information and medicine-related guidance only. It does not diagnose diseases or prescribe medicines. Always consult a qualified doctor or pharmacist before taking any medication.&quot;
        </p>
      </div>
    </div>
  );
};
