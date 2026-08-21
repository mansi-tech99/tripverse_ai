"use client";

import { Globe2, Sparkles, Compass } from "lucide-react";
import type { TripInfo } from "./types";
import { motion } from "framer-motion";

type FinalUiProps = {
  trip?: TripInfo;
  viewTrip?: () => void;
};

function FinalUi({ trip, viewTrip }: FinalUiProps) {
  const isReady = !!trip;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 text-center shadow-lg backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 dark:bg-orange-500/20 border border-orange-500/20 text-orange-600 dark:text-orange-400">
        {isReady ? (
          <Sparkles className="h-8 w-8 animate-pulse" />
        ) : (
          <Globe2 className="h-8 w-8 animate-spin" />
        )}
      </div>

      <h2 className="mt-4 text-xl sm:text-2xl font-black bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
        {isReady
          ? "🎉 Your Custom Trip is Ready!"
          : "✈️ Planning your dream trip..."}
      </h2>

      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
        {isReady
          ? "Your personalized itinerary with handpicked hotels and activities has been generated in the panel!"
          : "Gathering top-rated hotels, daily schedules, geo coordinates, and travel tips for you."}
      </p>

      {isReady && viewTrip && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => viewTrip()}
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-orange-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-orange-700 transition-all cursor-pointer"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Itinerary</span>
        </motion.button>
      )}
    </motion.div>
  );
}

export default FinalUi;
