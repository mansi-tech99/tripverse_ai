"use client";

import React, { useState } from 'react';
import {
  Star, Wallet, Clock, MapPin, Ticket, ExternalLink, Calendar,
  Users, Printer, Copy, Check, Sparkles, Building2, Map, Compass, Globe
} from 'lucide-react';
import { Timeline } from '@/components/ui/timeline';
import type { TripInfo, HotelInfo, Activity } from './types';
import { motion } from 'framer-motion';
import PlaceCardItem from './PlaceCardItem';
import HotelCardItem from './HotelCardItem';

interface ItineraryProps {
  tripData?: TripInfo;
}

// Curated pools of high-resolution travel photos to ensure every place gets a distinct, unique image
const DIVERSE_HOTEL_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
];

const DIVERSE_ACTIVITY_IMAGES = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80'
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

// Function to generate dynamic contextual photo URLs for destinations/hotels/places
const getPlaceImage = (name: string, destination?: string, category: 'hotel' | 'activity' = 'activity'): string => {
  const hashKey = `${name || ''}-${destination || ''}`;
  const hash = Math.abs(hashString(hashKey));
  if (category === 'hotel') {
    return DIVERSE_HOTEL_IMAGES[hash % DIVERSE_HOTEL_IMAGES.length];
  }
  return DIVERSE_ACTIVITY_IMAGES[hash % DIVERSE_ACTIVITY_IMAGES.length];
};

// Curated high quality travel imagery for destination hero banners
const DESTINATION_IMAGES: Record<string, string> = {
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
  tokyo: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
  london: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
  'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
  rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
  bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
  dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  switzerland: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80'
};

const getHeroImage = (destination?: string): string => {
  if (!destination) return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80';
  const key = destination.toLowerCase().trim();
  for (const [destKey, url] of Object.entries(DESTINATION_IMAGES)) {
    if (key.includes(destKey)) return url;
  }
  return `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80&sig=${Math.abs(hashString(destination))}`;
};

const SAMPLE_FEATURED = [
  { name: "Paris, France", image: DESTINATION_IMAGES.paris, tag: "Romantic & Cultural", duration: "3 Days" },
  { name: "Tokyo, Japan", image: DESTINATION_IMAGES.tokyo, tag: "Futuristic & Culinary", duration: "5 Days" },
  { name: "Bali, Indonesia", image: DESTINATION_IMAGES.bali, tag: "Tropical & Relaxing", duration: "7 Days" },
  { name: "Rome, Italy", image: DESTINATION_IMAGES.rome, tag: "Historic & Ancient", duration: "4 Days" }
];

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 w-full max-w-5xl mx-auto my-auto space-y-8">
      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full min-h-[380px] sm:min-h-[440px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800"
      >
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
          alt="Travel background"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20"></div>

        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 text-white">
          <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full w-fit border border-white/20">
            <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-100">Live AI Trip Generator</span>
          </div>

          <div className="space-y-3 max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight drop-shadow-md">
              Ready to Design Your Ultimate Getaway?
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed drop-shadow">
              Chat with our AI travel assistant on the left panel to craft custom day-by-day schedules, handpicked accommodations, and curated local hidden gems!
            </p>
          </div>
        </div>
      </motion.div>

      {/* Featured Destination Inspiration */}
      <div className="w-full space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          <Compass className="w-4 h-4 text-orange-500" />
          <span>Popular Travel Inspiration</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SAMPLE_FEATURED.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 h-44 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>

              <div className="absolute inset-0 p-3.5 flex flex-col justify-end text-white">
                <span className="text-[10px] font-bold text-orange-400 bg-slate-900/70 px-2 py-0.5 rounded-full w-fit backdrop-blur-sm border border-white/10 mb-1">
                  {item.tag}
                </span>
                <h4 className="text-sm font-extrabold line-clamp-1">{item.name}</h4>
                <p className="text-[11px] text-slate-300 font-medium">{item.duration} suggested</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Itinerary({ tripData }: ItineraryProps) {
  const [copied, setCopied] = useState(false);

  if (!tripData) {
    return <EmptyState />;
  }

  const heroImage = getHeroImage(tripData.destination);

  const handleCopy = () => {
    const text = `Trip to ${tripData.destination}\nDuration: ${tripData.duration}\nBudget: ${tripData.budget}\nGroup: ${tripData.group_size}\nFrom: ${tripData.origin}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Hotel section configuration
  const hotelData = {
    title: "Recommended Hotels",
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-300 font-semibold text-sm">
          <Building2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <span>Handpicked Accommodations for Your Stay</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {tripData.hotels?.map((hotel: HotelInfo, index: number) => (
            <HotelCardItem
              key={index}
              hotel={hotel}
              destination={tripData.destination}
              index={index}
            />
          ))}
        </div>
      </div>
    )
  };

  // Day itinerary sections
  const itineraryData = (tripData.itinerary || []).map((dayPlan) => ({
    title: `Day ${dayPlan.day}`,
    content: (
      <div className="space-y-4">
        <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200/50 dark:border-orange-900/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 max-w-5xl">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">Day Plan</span>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-100">{dayPlan.day_plan || `Explore ${tripData.destination}`}</h4>
          </div>
          {dayPlan.best_time_to_visit_day && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 w-fit">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              <span>{dayPlan.best_time_to_visit_day}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {dayPlan.activities?.map((activity: Activity, actIndex: number) => (
            <PlaceCardItem
              key={actIndex}
              activity={activity}
              destination={tripData.destination}
              actIndex={actIndex}
            />
          ))}
        </div>
      </div>
    )
  }));

  const timelineData = [hotelData, ...itineraryData];

  return (
    <div className="relative w-full pb-16 p-4 sm:p-6">
      {/* Header Banner */}
      <div className="relative w-full min-h-[360px] md:min-h-[420px] rounded-3xl overflow-hidden shadow-2xl mb-10 border border-slate-200/80 dark:border-slate-800">
        <img
          src={heroImage}
          alt={tripData.destination}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20"></div>

        {/* Content Container */}
        <div className="relative z-10 p-6 md:p-12 h-full flex flex-col justify-between text-white max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-orange-400">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>AI Trip Plan</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-bold bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/30 px-3.5 py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
                title="Copy Trip Summary"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 text-xs font-bold bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/30 px-3.5 py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
                title="Print Itinerary"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight drop-shadow-lg text-white">
              {tripData.destination}
            </h1>
            <p className="text-sm md:text-base text-slate-200 font-medium max-w-2xl drop-shadow">
              Custom itinerary from <span className="text-orange-400 font-bold">{tripData.origin || "Anywhere"}</span>
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs font-bold">
                <Calendar className="w-4 h-4 text-orange-400" />
                <span>{tripData.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs font-bold">
                <Wallet className="w-4 h-4 text-emerald-400" />
                <span>{tripData.budget}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs font-bold">
                <Users className="w-4 h-4 text-sky-400" />
                <span>{tripData.group_size}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <Timeline data={timelineData} tripData={tripData} />
    </div>
  );
}

export default Itinerary;
