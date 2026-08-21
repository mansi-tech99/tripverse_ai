"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-[120px] h-[32px] rounded-full bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 animate-pulse" />
        );
    }

    const currentTheme = theme === "system" ? (resolvedTheme || "dark") : theme;

    const options = [
        { id: "light", label: "Light", icon: Sun },
        { id: "dark", label: "Dark", icon: Moon },
    ];

    return (
        <div className="relative flex items-center p-0.5 sm:p-1 rounded-full bg-slate-200/80 dark:bg-slate-950/90 border border-slate-300/80 dark:border-amber-500/30 backdrop-blur-xl shadow-inner">
            {options.map((option) => {
                const Icon = option.icon;
                const isActive = currentTheme === option.id;

                return (
                    <button
                        key={option.id}
                        onClick={() => setTheme(option.id)}
                        title={`Switch to ${option.label} mode`}
                        className={`relative flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black transition-all duration-300 cursor-pointer ${isActive
                                ? "text-slate-950"
                                : "text-slate-600 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400"
                            }`}
                    >
                        {isActive && (
                            <motion.span
                                layoutId="activeThemePill"
                                transition={{ type: "spring", stiffness: 450, damping: 35 }}
                                className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-1.5">
                            <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                            <span>{option.label}</span>
                        </span>
                    </button>
                );
            })}
        </div>
    );
}


