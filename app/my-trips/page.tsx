"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useConvex } from "convex/react";
import { useUserDetail } from "../provider";
import { api } from "@/convex/_generated/api";
import { Compass, Sparkles, Loader2, Plus, ArrowRight } from "lucide-react";
import { TripInfo } from "../create-new-trip/_components/types";
import MyTripCardItem from "./_components/MyTripCardItem";
import { motion } from "framer-motion";

export type Trip = {
    tripId: any;
    tripDetail: TripInfo;
    _id: string;
};

function MyTrips() {
    const [myTrips, setMyTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [userDetail] = useUserDetail();
    const convex = useConvex();

    const GetUserTrip = async () => {
        if (!userDetail?._id) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const result = await convex.query(api.tripDetail.GetUserTrips, {
                uid: userDetail._id
            });
            setMyTrips(result || []);
        } catch (error) {
            console.error("Error fetching user trips:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userDetail) {
            GetUserTrip();
        } else {
            setLoading(false);
        }
    }, [userDetail]);

    return (
        <div className="p-6 md:px-16 lg:px-28 pt-28 pb-20 min-h-screen bg-[#060913] text-slate-100 font-sans">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                            <span>Your Saved Travel Collection</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                            My Saved <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">Itineraries</span>
                        </h1>
                    </div>

                    <Link href="/create-new-trip">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all flex items-center gap-2 text-xs cursor-pointer"
                        >
                            <Plus className="w-4 h-4 stroke-[3]" /> Create New Trip
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Content Section */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center p-8 bg-slate-900/80 rounded-3xl border border-amber-500/20 backdrop-blur-xl shadow-xl">
                        <Loader2 className="w-8 h-8 text-amber-400 animate-spin mb-3" />
                        <p className="text-xs font-bold text-slate-300">Fetching your custom itineraries...</p>
                    </div>
                ) : myTrips && myTrips.length > 0 ? (
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {myTrips.map((trip: Trip) => (
                            <motion.div
                                key={trip._id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 }
                                }}
                            >
                                <MyTripCardItem trip={trip} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center min-h-[45vh] text-center max-w-lg mx-auto p-10 bg-slate-900/80 rounded-3xl border border-amber-500/30 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)] space-y-5"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                            <Compass className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-black text-white">No Saved Trips Found</h3>
                        <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                            Start designing personalized daily schedules, handpicked hotels, and curated local spots using our AI engine.
                        </p>
                        <Link href="/create-new-trip">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all text-xs cursor-pointer flex items-center gap-2"
                            >
                                <span>Plan Your First Trip</span>
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default MyTrips;
