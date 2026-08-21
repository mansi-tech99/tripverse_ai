"use client";

import { Minus, Plus, Calendar } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

function SelectDaysUi({
  onSelectedOption,
}: {
  onSelectedOption: (value: string) => void;
}) {
  const [days, setDays] = useState(3);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm"
    >
      <div className="flex items-center justify-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-2">
        <Calendar className="w-4 h-4" />
        <span>Trip Duration</span>
      </div>

      <h2 className="text-center text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
        How many days do you want to travel?
      </h2>

      <div className="mt-6 flex items-center justify-center gap-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDays(Math.max(1, days - 1))}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-orange-500 hover:text-orange-600 transition-all cursor-pointer"
        >
          <Minus className="w-5 h-5" />
        </motion.button>

        <div className="text-center min-w-[120px]">
          <span className="text-4xl font-black bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            {days}
          </span>
          <span className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-2">
            {days === 1 ? "Day" : "Days"}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDays(days + 1)}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-orange-500 hover:text-orange-600 transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="mt-6 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelectedOption(`${days} Days`)}
          className="w-full sm:w-auto rounded-2xl bg-orange-600 px-8 py-3 text-sm font-bold text-white shadow-md hover:bg-orange-700 transition-all cursor-pointer"
        >
          Confirm Duration ({days} {days === 1 ? "Day" : "Days"})
        </motion.button>
      </div>
    </motion.div>
  );
}

export default SelectDaysUi;
