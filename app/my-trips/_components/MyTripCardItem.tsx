import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Wallet, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import type { Trip } from '../page';
import { motion } from 'framer-motion';
import axios from 'axios';

type Props = {
    trip: Trip;
};

// Map of destination keys to cover photos
const DESTINATION_COVERS: Record<string, string> = {
    paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    tokyo: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    london: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
    'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80',
    rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80',
    bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    goa: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
    switzerland: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
};

const getCoverUrl = (destination?: string): string => {
    if (!destination) return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80';
    const key = destination.toLowerCase();
    for (const [dest, url] of Object.entries(DESTINATION_COVERS)) {
        if (key.includes(dest)) return url;
    }
    return `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80`;
};

function MyTripCardItem({ trip }: Props) {
    const detail = trip?.tripDetail;
    const [coverUrl, setCoverUrl] = useState<string>(getCoverUrl(detail?.destination));

    useEffect(() => {
        if (detail?.destination) {
            axios.post("/api/google-place-detail", {
                placeName: detail.destination,
                destination: detail.destination
            }).then((res) => {
                if (res.data?.photoUrl) {
                    setCoverUrl(res.data.photoUrl);
                }
            }).catch(() => { });
        }
    }, [detail?.destination]);

    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col justify-between border border-slate-800/80 hover:border-amber-500/40 rounded-3xl p-5 bg-slate-900/90 shadow-lg hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-300 backdrop-blur-xl"
        >
            <div>
                {/* Cover Image Container */}
                <div className="relative w-full h-[190px] overflow-hidden rounded-2xl mb-4 bg-slate-800">
                    <img
                        src={coverUrl}
                        alt={detail?.destination || "Trip Destination"}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                    {/* Group Badge */}
                    <span className="absolute bottom-3 left-3 text-[10px] font-black uppercase tracking-wider text-amber-400 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        {detail?.group_size || "Personal Trip"}
                    </span>
                </div>

                {/* Destination Title */}
                <h3 className="font-black text-xl text-white mb-2 truncate group-hover:text-amber-400 transition-colors">
                    {detail?.destination || "Custom Itinerary"}
                </h3>

                {/* Trip Metadata */}
                <div className="space-y-2 text-xs text-slate-400 mb-6 font-medium">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span><strong className="text-slate-300">From:</strong> {detail?.origin || "Anywhere"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span><strong className="text-slate-300">Duration:</strong> {detail?.duration || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Wallet className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span><strong className="text-slate-300">Budget:</strong> {detail?.budget || "N/A"}</span>
                    </div>
                </div>
            </div>

            {/* Action Link Button */}
            <Link
                href={`/view-trips/${trip?.tripId}`}
                className="flex items-center justify-center gap-2 w-full bg-slate-800/90 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 text-slate-200 hover:text-slate-950 border border-slate-700/60 hover:border-transparent rounded-2xl py-3 font-black text-xs transition-all duration-300 shadow-md active:scale-98 cursor-pointer"
            >
                <span>View Full Itinerary</span>
                <ArrowRight className="w-4 h-4" />
            </Link>
        </motion.div>
    );
}

export default MyTripCardItem;
