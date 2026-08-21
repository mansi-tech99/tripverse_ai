"use client";

import React from "react";
import type { TripInfo } from "./types";
import { Sparkles, MapPin, Calendar, Wallet, Users, Hotel, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function TripDetailView({ trip }: { trip: TripInfo }) {
    if (!trip) return null;

    const totalActivities = trip.itinerary?.reduce(
        (acc, day) => acc + (day.activities?.length || 0),
        0
    ) || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="m-4 rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-slate-900/90 p-5 backdrop-blur-md shadow-xl text-slate-900 dark:text-slate-100"
        >
            <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider text-orange-600 dark:text-orange-400">
                        Trip Overview
                    </span>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Generated
                </span>
            </div>

            <div className="space-y-3">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                            {trip.destination}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 ml-7">
                            Departing from <span className="font-semibold text-slate-700 dark:text-slate-300">{trip.origin || "Origin"}</span>
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-orange-500" /> Duration
                        </span>
                        <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{trip.duration}</p>
                    </div>

                    <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <Wallet className="w-3 h-3 text-emerald-500" /> Budget
                        </span>
                        <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{trip.budget}</p>
                    </div>

                    <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <Users className="w-3 h-3 text-sky-500" /> Travelers
                        </span>
                        <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{trip.group_size}</p>
                    </div>

                    <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <Hotel className="w-3 h-3 text-amber-500" /> Stays & Places
                        </span>
                        <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
                            {trip.hotels?.length || 0} Stays • {totalActivities} Spots
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

