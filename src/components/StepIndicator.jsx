import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { UI_TRANSLATIONS } from '../data/mockSchemes';

export default function StepIndicator({ currentStep, setCurrentStep, lang }) {
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  const steps = [
    { num: 1, label: t.step1Title || "Discover", desc: "Discovery & Overview" },
    { num: 2, label: t.step2Title || "Matched Schemes", desc: "Personalized Schemes" },
    { num: 3, label: t.step3Title || "Document Doctor", desc: "RAG & Doc Doctor" },
  ];

  return (
    <div className="bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <nav aria-label="Progress" className="flex items-center justify-between">
          <ol className="flex items-center w-full gap-2 sm:gap-4 overflow-x-auto py-1">
            {steps.map((step, idx) => {
              const isCurrent = currentStep === step.num;
              const isPast = currentStep > step.num;
              // Clean label to guarantee no duplicate numbering like "1. 1."
              const cleanLabel = (step.label || '').replace(/^(\d+|[೧-೯]+)[\.\s]*/, '');

              return (
                <li key={step.num} className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                  <button
                    onClick={() => setCurrentStep(step.num)}
                    className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                      isCurrent
                        ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                        : isPast
                        ? 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                        : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-white text-zinc-900'
                          : isPast
                          ? 'bg-zinc-900 text-white'
                          : 'bg-zinc-200 text-zinc-500'
                      }`}
                    >
                      {isPast ? <Check className="w-3 h-3 stroke-[3]" /> : step.num}
                    </span>
                    <span>{cleanLabel}</span>
                  </button>
                  {idx < steps.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-300 hidden sm:block" />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
