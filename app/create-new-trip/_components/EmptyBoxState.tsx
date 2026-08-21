"use client";

import React from "react";
import {
  Globe,
  Plane,
  Compass,
  LandmarkIcon,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

interface EmptyBoxStateProps {
  onSuggestionClick?: (prompt: string) => void;
}

interface SuggestionChip {
  id: number;
  label: string;
  desc: string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
}

const suggestions: SuggestionChip[] = [
  {
    id: 1,
    label: "Build my dream trip to Paris",
    desc: "3 days of romance, art, and hidden cafes",
    icon: Globe,
    colorClass: "text-sky-500 dark:text-sky-400",
    bgClass: "bg-sky-500/10 dark:bg-sky-500/20",
  },
  {
    id: 2,
    label: "Surprise me with Tokyo trip ideas",
    desc: "Anime culture, futuristic food, and temples",
    icon: Plane,
    colorClass: "text-emerald-500 dark:text-emerald-400",
    bgClass: "bg-emerald-500/10 dark:bg-emerald-500/20",
  },
  {
    id: 3,
    label: "Show me local secrets in Rome",
    desc: "Colosseum, authentic pasta spots, and gelaterias",
    icon: LandmarkIcon,
    colorClass: "text-orange-500 dark:text-orange-400",
    bgClass: "bg-orange-500/10 dark:bg-orange-500/20",
  },
  {
    id: 4,
    label: "Plan an epic adventure in Bali",
    desc: "Tropical beaches, rice terraces, and waterfalls",
    icon: Compass,
    colorClass: "text-amber-500 dark:text-amber-400",
    bgClass: "bg-amber-500/10 dark:bg-amber-500/20",
  },
];

export default function EmptyBoxState({
  onSuggestionClick,
}: EmptyBoxStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex w-full max-w-xl flex-col items-center rounded-3xl bg-white/80 dark:bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-lg my-auto"
    >
      {/* Badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
        <Sparkles className="h-3.5 w-3.5 animate-pulse" />
        <span>Next-Gen AI Travel Assistant</span>
      </div>

      {/* Header */}
      <h1 className="mb-3 text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
        Plan Your Next <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Dream Trip</span>
      </h1>
      <p className="mb-6 text-center text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-md">
        Tell me where you want to go, or pick a starter prompt below. I&apos;ll build a personalized itinerary with hotels and activities tailored to you!
      </p>

      {/* Suggestion Cards */}
      <div className="flex w-full flex-col gap-3">
        {suggestions.map((suggestion, idx) => {
          const Icon = suggestion.icon;

          return (
            <motion.button
              key={suggestion.id}
              type="button"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              onClick={() => onSuggestionClick?.(suggestion.label)}
              className="group flex w-full items-center justify-between cursor-pointer rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-3.5 sm:p-4 text-left transition-all duration-300 hover:border-orange-500/50 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 hover:shadow-md active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${suggestion.bgClass} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`h-5 w-5 ${suggestion.colorClass}`} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {suggestion.label}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {suggestion.desc}
                  </span>
                </div>
              </div>

              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-orange-600 group-hover:text-white transition-all">
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
