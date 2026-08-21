"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ticket, Clock, MapPin, ExternalLink, Map } from "lucide-react";
import { Activity } from "./types";

interface PlaceCardItemProps {
    activity: Activity;
    destination?: string;
    actIndex?: number;
}

function PlaceCardItem({ activity, destination, actIndex = 0 }: PlaceCardItemProps) {
    const [photoUrl, setPhotoUrl] = useState<string>(activity.place_image_url || "");
    const [loading, setLoading] = useState<boolean>(!activity.place_image_url);

    useEffect(() => {
        if (!activity.place_image_url && activity.place_name) {
            GetGooglePlaceDetail();
        }
    }, [activity, destination]);

    const GetGooglePlaceDetail = async () => {
        try {
            setLoading(true);
            const cleanName = activity.place_name ? activity.place_name.split(":")[0] : "";
            const result = await axios.post("/api/google-place-detail", {
                placeName: cleanName || activity.place_name,
                destination: destination || activity.place_address || ""
            });

            if (result.data?.photoUrl) {
                setPhotoUrl(result.data.photoUrl);
            }
        } catch (error) {
            console.error("Error fetching place photo:", error);
        } finally {
            setLoading(false);
        }
    };

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        activity.place_name + ", " + (activity.place_address || destination || "")
    )}`;

    return (
        <div className="group flex flex-col justify-between bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 backdrop-blur-md">
            <div>
                <div className="relative w-full h-[190px] overflow-hidden rounded-2xl mb-4 bg-slate-100 dark:bg-slate-800">
                    <img
                        src={photoUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'}
                        alt={activity.place_name || "Place image"}
                        className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${loading ? "animate-pulse brightness-90" : ""
                            }`}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80';
                        }}
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                        #{actIndex + 1} Place
                    </div>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                    {activity.place_name}
                </h4>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {activity.place_details}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    {activity.ticket_pricing && (
                        <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400">
                            <Ticket className="w-4 h-4 shrink-0" />
                            <span>Ticket: {activity.ticket_pricing}</span>
                        </div>
                    )}
                    {activity.best_time_to_visit && (
                        <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                            <Clock className="w-4 h-4 shrink-0" />
                            <span>Best Time: {activity.best_time_to_visit}</span>
                        </div>
                    )}
                    {activity.time_travel_each_location && (
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span>Time Needed: {activity.time_travel_each_location}</span>
                        </div>
                    )}
                </div>
            </div>

            <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-orange-600 hover:text-white dark:bg-slate-800 dark:hover:bg-orange-600 dark:hover:text-white rounded-xl transition-all shadow-sm active:scale-98 cursor-pointer"
            >
                <Map className="w-4 h-4" /> View Location on Maps <ExternalLink className="w-3.5 h-3.5" />
            </a>
        </div>
    );
}

export default PlaceCardItem;

