"use client";

import React, { useState } from "react";
import { Send, Globe, Plane, Compass, LandmarkIcon, Sparkles, Wand2, ArrowRight, CheckCircle2, Star, ShieldCheck, MapPin, Clock, Hotel } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface SuggestionChip {
    id: number;
    label: string;
    icon: LucideIcon;
    promptText: string;
}

export default function HeroSearch() {
    const [inputValue, setInputValue] = useState("");
    const [activeChip, setActiveChip] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<"itinerary" | "hotels" | "budget">("itinerary");
    const { user } = useUser();
    const router = useRouter();

    const onSend = (text?: string) => {
        const promptToPass = text || inputValue;
        if (!user) {
            router.push("/sign-in");
            return;
        }
        router.push("/create-new-trip");
    };

    const suggestions: SuggestionChip[] = [
        {
            id: 1,
            label: "5-Day Paris Luxury Getaway",
            icon: Globe,
            promptText: "Plan a 5-day romantic luxury trip to Paris, France with boutique hotels and fine dining."
        },
        {
            id: 2,
            label: "Tokyo Hidden Gems & Ramen",
            icon: Plane,
            promptText: "Create a 7-day Tokyo trip showcasing local ramen shops, anime districts, and historic shrines."
        },
        {
            id: 3,
            label: "Rome Ancient Ruins Tour",
            icon: LandmarkIcon,
            promptText: "Design a 4-day budget-friendly itinerary for Rome including ancient ruins and espresso bars."
        },
        {
            id: 4,
            label: "Epic Bali Resort Adventure",
            icon: Compass,
            promptText: "Draft a 6-day tropical getaway to Bali with beach resorts, waterfalls, and rice terrace tours."
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        onSend();
    };

    const handleChipClick = (chip: SuggestionChip) => {
        setActiveChip(chip.id);
        setInputValue(chip.promptText);
    };

    return (
        <section className="relative w-full pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden transition-colors duration-500 bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100">

            {/* Background Neon Glowing Orbs */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[500px] bg-gradient-to-tr from-amber-500/20 via-orange-600/15 to-purple-900/10 rounded-full blur-[150px] pointer-events-none animate-pulse" />
            <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-amber-400/10 rounded-full blur-[130px] pointer-events-none" />

            <div className="mx-auto max-w-5xl text-center relative z-10">

                {/* Main Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-sm mb-6"
                >
                    <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-500 dark:text-amber-400" />
                    <span>Next-Gen AI Travel Engine v3.0</span>
                </motion.div>

                {/* Main Hero Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white"
                >
                    Design Your Dream Trip with{" "}
                    <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 dark:from-amber-300 dark:via-orange-400 dark:to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
                        Cyber Precision
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mx-auto mt-6 max-w-2xl text-sm sm:text-lg font-medium text-slate-600 dark:text-slate-300 leading-relaxed"
                >
                    Experience real-time AI itinerary generation. Describe your ideal journey and let our intelligent engine craft handpicked stays, flight recommendations, and day-by-day schedules in seconds.
                </motion.p>

                {/* Glassmorphic Search Form */}
                <motion.form
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    onSubmit={handleSubmit}
                    className="mx-auto mt-10 max-w-3xl"
                >
                    <div className="relative group rounded-3xl border border-slate-200 dark:border-amber-500/30 bg-white/90 dark:bg-slate-900/80 p-5 md:p-6 shadow-xl dark:shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-300 focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-amber-500/20">

                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            rows={3}
                            placeholder="e.g. Plan a 5-day luxury getaway to Paris with gourmet dining, iconic museums, and boutique hotel stays..."
                            className="w-full resize-none border-0 bg-transparent p-1 text-base md:text-lg font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-0 leading-relaxed"
                        />

                        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800/90">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                                <Wand2 className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 animate-pulse" />
                                <span>AI Copilot Active</span>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                suppressHydrationWarning
                                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer"
                            >
                                <span>Generate Itinerary</span>
                                <Send className="h-4 w-4" />
                            </motion.button>
                        </div>
                    </div>
                </motion.form>

                {/* Suggestion Chips */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
                >
                    {suggestions.map((suggestion) => {
                        const isSelected = activeChip === suggestion.id;
                        const Icon = suggestion.icon;

                        return (
                            <motion.button
                                key={suggestion.id}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                type="button"
                                suppressHydrationWarning
                                onClick={() => handleChipClick(suggestion)}
                                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold border transition-all duration-200 cursor-pointer ${isSelected
                                    ? "bg-amber-500 border-amber-400 text-slate-950 font-black shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                                    : "bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 backdrop-blur-md"
                                    }`}
                            >
                                <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-slate-950" : "text-amber-500 dark:text-amber-400"}`} />
                                <span>{suggestion.label}</span>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Real-time Interactive AI Studio Showcase Card (Replacing Video) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="mt-14 relative mx-auto max-w-4xl"
                >
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-purple-500/20 opacity-80 blur-xl pointer-events-none"></div>

                    <div className="relative rounded-3xl border border-slate-200 dark:border-amber-500/30 shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-white/95 dark:bg-slate-900/90 backdrop-blur-2xl overflow-hidden p-6 sm:p-8 text-left space-y-6">

                        {/* Top Studio Controls Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 shadow-md">
                                    <Wand2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-slate-900 dark:text-white">AI Trip Copilot Dashboard</h3>
                                    <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> Gemini 2.5 Flash Engine Running
                                    </p>
                                </div>
                            </div>

                            {/* View Switcher Tabs */}
                            <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
                                <button
                                    onClick={() => setActiveTab("itinerary")}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "itinerary"
                                        ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                                        }`}
                                >
                                    Daily Plan
                                </button>
                                <button
                                    onClick={() => setActiveTab("hotels")}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "hotels"
                                        ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                                        }`}
                                >
                                    Boutique Hotels
                                </button>
                                <button
                                    onClick={() => setActiveTab("budget")}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "budget"
                                        ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                                        }`}
                                >
                                    Budget Split
                                </button>
                            </div>
                        </div>

                        {/* Interactive Dynamic Tab Body */}
                        <AnimatePresence mode="wait">
                            {activeTab === "itinerary" && (
                                <motion.div
                                    key="itinerary"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                                        <span className="uppercase tracking-wider text-amber-500">Day 1 • Paris Historic Center</span>
                                        <span>Estimated Walking: 2.4 km</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-2">
                                            <div className="flex items-center justify-between text-[11px] font-black text-amber-500">
                                                <span>09:00 AM</span>
                                                <Clock className="w-3.5 h-3.5" />
                                            </div>
                                            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Louvre Museum Priority Entry</h4>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Explore Mona Lisa and classic art wings with reserved fast-track access.</p>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-2">
                                            <div className="flex items-center justify-between text-[11px] font-black text-amber-500">
                                                <span>01:30 PM</span>
                                                <Clock className="w-3.5 h-3.5" />
                                            </div>
                                            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Le Bistro Gourmet Lunch</h4>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Authentic French cuisine in Saint-Germain-des-Prés dining court.</p>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-2">
                                            <div className="flex items-center justify-between text-[11px] font-black text-amber-500">
                                                <span>06:00 PM</span>
                                                <Clock className="w-3.5 h-3.5" />
                                            </div>
                                            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Seine River Sunset Cruise</h4>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Panoramic boat tour showcasing illuminated bridges and Eiffel Tower light show.</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "hotels" && (
                                <motion.div
                                    key="hotels"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                >
                                    <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-start gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center shrink-0">
                                            <Hotel className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                                                <Star className="w-3.5 h-3.5 fill-amber-500" /> 4.9 (420 reviews)
                                            </div>
                                            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Hotel Brighton Paris</h4>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">Tuileries Garden View • $280/night</p>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-start gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center shrink-0">
                                            <Hotel className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                                                <Star className="w-3.5 h-3.5 fill-amber-500" /> 4.8 (310 reviews)
                                            </div>
                                            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Le Meurice Luxury Residence</h4>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">Place Vendôme • $450/night</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "budget" && (
                                <motion.div
                                    key="budget"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-4"
                                >
                                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                                        <span>Total Estimated Budget (5 Days):</span>
                                        <span className="text-base font-black text-amber-500">$1,850 USD</span>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden flex">
                                        <div className="bg-amber-500 h-full w-[45%]" title="Hotels (45%)" />
                                        <div className="bg-orange-500 h-full w-[30%]" title="Dining & Food (30%)" />
                                        <div className="bg-emerald-400 h-full w-[25%]" title="Activities & Tickets (25%)" />
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-semibold gap-2">
                                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Hotels: $832</span>
                                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Dining: $555</span>
                                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Activities: $463</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Bottom Stats Footer inside Card */}
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-amber-500" />
                                <span>100% Custom Tailored</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span>4.9/5 Rating (50,000+ Journeys)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span>Free & Instant Export</span>
                            </div>
                        </div>

                    </div>
                </motion.div>

            </div>
        </section>
    );

}
