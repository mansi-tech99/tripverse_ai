"use client";

import { BadgeDollarSign, Gem, Wallet } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: Wallet,
    color: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400",
    hover: "group-hover:bg-emerald-500 group-hover:text-white dark:group-hover:bg-emerald-500",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep costs on the average side",
    icon: BadgeDollarSign,
    color: "bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400",
    hover: "group-hover:bg-amber-500 group-hover:text-white dark:group-hover:bg-amber-500",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about costs",
    icon: Gem,
    color: "bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400",
    hover: "group-hover:bg-purple-500 group-hover:text-white dark:group-hover:bg-purple-500",
  },
];

function BudgetUi({
  onSelectedOption,
}: {
  onSelectedOption: (value: string) => void;
}) {
  return (
    <div className="mt-4 rounded-2xl bg-transparent">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {SelectBudgetOptions.map((item) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectedOption(item.title)}
              className="
                group
                flex flex-col items-center
                rounded-2xl
                border border-slate-200 dark:border-slate-800
                bg-white dark:bg-slate-900
                p-4 sm:p-5
                text-center
                transition-all
                duration-300
                hover:border-orange-500/60 dark:hover:border-orange-500/60
                hover:shadow-lg
                cursor-pointer
              "
            >
              <div
                className={`
                  mb-3
                  flex h-12 w-12 items-center justify-center
                  rounded-2xl
                  transition-all
                  duration-300
                  ${item.color}
                  ${item.hover}
                  group-hover:scale-110
                `}
              >
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {item.title}
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {item.desc}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default BudgetUi;
