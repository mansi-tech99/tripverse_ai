"use client";

import React from "react";
import { User, Users, Home, UsersRound } from "lucide-react";
import { motion } from "framer-motion";

export const SelectTravelersList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo traveler in exploration",
    icon: User,
    people: "1 Person",
    color: "bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400",
    hover: "group-hover:bg-sky-500 group-hover:text-white dark:group-hover:bg-sky-500 dark:group-hover:text-white",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travelers in tandem",
    icon: Users,
    people: "2 People",
    color: "bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400",
    hover: "group-hover:bg-pink-500 group-hover:text-white dark:group-hover:bg-pink-500 dark:group-hover:text-white",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun-loving adventurers",
    icon: Home,
    people: "3 to 5 People",
    color: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400",
    hover: "group-hover:bg-emerald-500 group-hover:text-white dark:group-hover:bg-emerald-500 dark:group-hover:text-white",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekers",
    icon: UsersRound,
    people: "5 to 10 People",
    color: "bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400",
    hover: "group-hover:bg-purple-500 group-hover:text-white dark:group-hover:bg-purple-500 dark:group-hover:text-white",
  },
];

function GroupSizeUi({ onSelectedOption }: { onSelectedOption: (value: string) => void }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {SelectTravelersList.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectedOption(`${item.title}:${item.people}`)}
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-left transition-all duration-200 hover:border-orange-500/60 dark:hover:border-orange-500/60 hover:shadow-md cursor-pointer"
          >
            <div
              className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${item.color} ${item.hover}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              {item.title}
            </h3>

            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              {item.people}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}

export default GroupSizeUi;
