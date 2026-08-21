"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Flame, ArrowRight, MapPin, Sparkles, Compass } from "lucide-react";
import Link from "next/link";

interface DummyContentProps {
    city: string;
    country: string;
    description: string;
    attractions: string[];
}

const DummyContent = ({
    city,
    country,
    description,
    attractions,
}: DummyContentProps) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold shadow-sm">
                    <MapPin className="w-5 h-5" />
                </span>
                <p className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">{country}</p>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {city}
            </h2>

            <p className="text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {description}
            </p>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-4">
                    <Sparkles className="w-5 h-5 text-orange-500" />
                    Top Recommended Spots
                </h3>

                <div className="flex flex-wrap gap-2.5">
                    {attractions.map((place) => (
                        <div
                            key={place}
                            className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-xs font-bold text-slate-800 dark:text-slate-200"
                        >
                            <Compass className="w-3.5 h-3.5 text-orange-500" />
                            <span>{place}</span>
                        </div>
                    ))}
                </div>

                <Link href="/create-new-trip">
                    <button className="mt-8 flex items-center justify-center gap-2 w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-8 py-3.5 rounded-2xl font-extrabold text-sm shadow-md transition-all duration-200 active:scale-98 cursor-pointer">
                        <span>Plan Trip to {city}</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

const data = [
    {
        category: "Paris, France",
        title: "Explore the City of Lights – Eiffel Tower, Louvre & More",
        src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
        content: (
            <DummyContent
                city="Paris"
                country="France"
                description="Paris is one of the world's most romantic cities, famous for its historic landmarks, art museums, luxury shopping, and charming cafés."
                attractions={["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Seine River"]}
            />
        ),
    },
    {
        category: "New York, USA",
        title: "Experience NYC – Times Square, Broadway & Central Park",
        src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
        content: (
            <DummyContent
                city="New York"
                country="USA"
                description="The city that never sleeps offers skyscrapers, Broadway shows, world-class shopping, and endless entertainment."
                attractions={["Times Square", "Central Park", "Statue of Liberty", "Brooklyn Bridge"]}
            />
        ),
    },
    {
        category: "Tokyo, Japan",
        title: "Discover Tokyo – Temples, Anime & Cherry Blossoms",
        src: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
        content: (
            <DummyContent
                city="Tokyo"
                country="Japan"
                description="Tokyo perfectly blends traditional temples with futuristic technology, vibrant nightlife, and amazing cuisine."
                attractions={["Shibuya", "Senso-ji Temple", "Tokyo Tower", "Akihabara"]}
            />
        ),
    },
    {
        category: "Rome, Italy",
        title: "Walk Through History – Colosseum & Vatican City",
        src: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
        content: (
            <DummyContent
                city="Rome"
                country="Italy"
                description="Rome is filled with ancient ruins, stunning architecture, delicious Italian food, and timeless history."
                attractions={["Colosseum", "Trevi Fountain", "Vatican", "Roman Forum"]}
            />
        ),
    },
    {
        category: "Dubai, UAE",
        title: "Luxury Meets Adventure – Burj Khalifa & Desert Safaris",
        src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
        content: (
            <DummyContent
                city="Dubai"
                country="UAE"
                description="Dubai is famous for luxury shopping, skyscrapers, desert adventures, and futuristic attractions."
                attractions={["Burj Khalifa", "Dubai Marina", "Palm Jumeirah", "Desert Safari"]}
            />
        ),
    },
    {
        category: "Bali, Indonesia",
        title: "Relax in Tropical Paradise – Beaches & Rice Terraces",
        src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
        content: (
            <DummyContent
                city="Bali"
                country="Indonesia"
                description="Bali is known for beaches, temples, waterfalls, yoga retreats, and lush green rice terraces."
                attractions={["Ubud", "Tanah Lot", "Seminyak", "Rice Terraces"]}
            />
        ),
    },
];

export function PopularCityList() {
    const cards = data.map((card, index) => (
        <Card key={card.category} card={card} index={index} />
    ));

    return (
        <section className="relative w-full py-20 overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-slate-200/60 dark:border-slate-800/60 pb-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 font-extrabold text-xs mb-3 border border-orange-200 dark:border-orange-900/40 uppercase tracking-wider">
                            <Flame className="h-3.5 w-3.5" />
                            <span>Trending Worldwide</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            Popular <span className="text-orange-600 dark:text-orange-500">Destinations</span>
                        </h2>

                        <p className="mt-2 text-sm md:text-base font-medium text-slate-600 dark:text-slate-400">
                            Handpicked locations loved by modern travelers. Explore top attractions and generate itineraries in one click.
                        </p>
                    </div>

                    <Link href="/create-new-trip" className="hidden md:inline-flex">
                        <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-extrabold text-xs border border-slate-200 dark:border-slate-800 hover:border-orange-500 transition-all shadow-sm active:scale-95 cursor-pointer">
                            <span>Explore All</span>
                            <ArrowRight className="h-4 w-4 text-orange-500" />
                        </button>
                    </Link>
                </div>
            </div>

            <div className="w-full relative z-10">
                <Carousel items={cards} />
            </div>
        </section>
    );
}