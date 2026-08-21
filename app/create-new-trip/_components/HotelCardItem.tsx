"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, Wallet, MapPin, ExternalLink } from "lucide-react";
import { HotelInfo } from "./types";

interface HotelCardItemProps {
    hotel: HotelInfo;
    destination?: string;
    index?: number;
}

function HotelCardItem({ hotel, destination, index = 0 }: HotelCardItemProps) {
    const [photoUrl, setPhotoUrl] = useState<string>(hotel.hotel_image_url || hotel.image || "");
    const [loading, setLoading] = useState<boolean>(!(hotel.hotel_image_url || hotel.image));

    useEffect(() => {
        if (!(hotel.hotel_image_url || hotel.image) && (hotel.hotel_name || hotel.name)) {
            GetGooglePlaceDetail();
        }
    }, [hotel, destination]);

    const GetGooglePlaceDetail = async () => {
        try {
            setLoading(true);
            const hotelName = hotel.hotel_name || hotel.name || "";
            const cleanName = hotelName.split(":")[0];
            const result = await axios.post("/api/google-place-detail", {
                placeName: cleanName || hotelName,
                destination: destination || hotel.hotel_address || ""
            });

            if (result.data?.photoUrl) {
                setPhotoUrl(result.data.photoUrl);
            }
        } catch (error) {
            console.error("Error fetching hotel photo:", error);
        } finally {
            setLoading(false);
        }
    };

    const hotelTitle = hotel.hotel_name || hotel.name || 'Boutique Hotel';
    const hotelPrice = hotel.price_per_night || hotel.price || 'Contact hotel';
    const searchQuery = encodeURIComponent(`${hotelTitle} ${hotel.hotel_address || destination || ''}`);

    return (
        <div className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-md">
            <div>
                <div className="relative w-full h-[200px] overflow-hidden rounded-2xl mb-4 bg-slate-100 dark:bg-slate-800">
                    <img
                        src={photoUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'}
                        alt={hotelTitle}
                        className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${loading ? "animate-pulse brightness-90" : ""
                            }`}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
                        }}
                    />
                    <div className="absolute top-3 right-3 bg-slate-950/70 backdrop-blur-md text-yellow-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-white/20">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span>{hotel.rating || 4.5}</span>
                    </div>
                </div>

                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-50 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                    {hotelTitle}
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1 leading-normal line-clamp-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    {hotel.hotel_address || destination}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                    {hotel.description || "Top rated stay with excellent amenities and convenient location."}
                </p>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Price:</span>
                    <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Wallet className="w-4 h-4" />
                        {hotelPrice}
                    </span>
                </div>
            </div>

            <a
                href={`https://www.google.com/search?q=${searchQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-bold text-white bg-slate-900 hover:bg-orange-600 dark:bg-slate-800 dark:hover:bg-orange-600 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
            >
                Book / Check Availability <ExternalLink className="w-3.5 h-3.5" />
            </a>
        </div>
    );
}

export default HotelCardItem;
