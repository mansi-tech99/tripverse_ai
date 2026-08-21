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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16 px-4 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Back Button Bar */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => router.push("/my-trips")}
                        className="group flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl transition-all shadow-sm active:scale-95 cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span>Back to My Trips</span>
                    </button>

                    <Link
                        href="/create-new-trip"
                        className="flex items-center gap-2 text-xs font-extrabold text-white bg-orange-600 hover:bg-orange-700 px-4 py-2.5 rounded-2xl transition-all shadow-md active:scale-95"
                    >
                        <Compass className="w-4 h-4" />
                        <span>Plan New Trip</span>
                    </Link>
                </div>

                {/* Main Content State */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <Loader2 className="w-10 h-10 text-orange-600 animate-spin mb-4" />
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Loading your custom itinerary...</h3>
                        <p className="text-xs text-slate-500 mt-1">Gathering your hotel recommendations and daily schedules</p>
                    </div>
                ) : (
                    <Itinerary tripData={tripData?.tripDetail || tripDetailInfo || undefined} />
                )}
            </div>
        </div>
    );
}

export default ViewTrip;