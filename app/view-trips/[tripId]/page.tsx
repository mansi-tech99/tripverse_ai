"use client"

import Itinerary from "@/app/create-new-trip/_components/Itinerary";
import { Trip } from "@/app/my-trips/page";
import { useTripDetail, useUserDetail } from "@/app/provider";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Compass } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function ViewTrip() {
    const params = useParams();
    const router = useRouter();
    const tripParam = params?.tripId || params?.tripid;
    const [userDetail] = useUserDetail();
    const convex = useConvex();
    const [tripData, setTripData] = useState<Trip | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();

    useEffect(() => {
        if (userDetail && tripParam) {
            GetTrip();
        } else if (!userDetail) {
            setLoading(false);
        }
    }, [userDetail, tripParam]);

    const GetTrip = async () => {
        if (!userDetail?._id || !tripParam) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const result = await convex.query(api.tripDetail.GetTripById, {
                uid: userDetail._id,
                tripid: String(tripParam)
            });
            console.log("Fetched trip details:", result);
            setTripData(result);
            if (result?.tripDetail) {
                setTripDetailInfo(result.tripDetail);
            }
        } catch (error) {
            console.error("Error loading trip:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#060913] text-slate-100 font-sans pt-24 pb-20 px-4 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Back Button Bar */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-between"
                >
                    <button
                        onClick={() => router.push("/my-trips")}
                        className="group flex items-center gap-2 text-xs font-black text-slate-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 px-5 py-2.5 rounded-2xl transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4 text-amber-400 transition-transform group-hover:-translate-x-1" />
                        <span>Back to My Trips</span>
                    </button>

                    <Link href="/create-new-trip">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 text-xs font-black text-slate-950 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-5 py-2.5 rounded-2xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] cursor-pointer"
                        >
                            <Compass className="w-4 h-4" />
                            <span>Plan New Trip</span>
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Main Content State */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 bg-slate-900/80 rounded-3xl border border-amber-500/20 backdrop-blur-xl shadow-2xl">
                        <Loader2 className="w-10 h-10 text-amber-400 animate-spin mb-4" />
                        <h3 className="text-lg font-black text-white">Loading your custom itinerary...</h3>
                        <p className="text-xs text-slate-400 mt-1">Gathering your hotel recommendations and daily schedules</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Itinerary tripData={tripData?.tripDetail || tripDetailInfo || undefined} />
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default ViewTrip;

