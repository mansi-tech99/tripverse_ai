// app/destinations/page.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, ArrowRight, MapPin, Compass } from "lucide-react";
import { motion } from "framer-motion";

export default function DestinationsPage() {
    return (
        <section className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-br from-blue-900 via-blue-500 to-sky-200 p-4 sm:p-6">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl mb-12"
            >
                <Card className="rounded-[2rem] bg-white/95 backdrop-blur-xl border-t-4 border-l-4 border-white/80 shadow-[20px_20px_60px_rgba(30,58,138,0.5),-10px_-10px_40px_rgba(255,255,255,0.2)]">
                    <CardHeader className="flex flex-col items-center space-y-4 pt-8 pb-4">
                        <h1 className="text-4xl font-extrabold text-blue-950 drop-shadow-sm">Explore Destinations</h1>
                        <p className="text-sm font-medium text-blue-800/80 text-center max-w-2xl">
                            Find the perfect place for your next adventure. Filter by continent, budget, or vibe.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form className="flex flex-col sm:flex-row gap-4 items-center">
                            <div className="flex-1 w-full">
                                <Label htmlFor="search" className="sr-only">Search destinations</Label>
                                <Input
                                    id="search"
                                    placeholder="Search cities, countries…"
                                    className="h-12 bg-sky-50/50 border-2 border-sky-100 focus-visible:ring-4 focus-visible:ring-blue-500/20 focus-visible:border-blue-400 shadow-[inset_0_3px_6px_rgba(0,0,0,0.05)] rounded-xl text-blue-950 font-medium"
                                />
                            </div>
                            <Button type="submit" className="h-12 px-6 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-black rounded-xl shadow-[0_6px_0_#1e3a8a] active:shadow-none active:translate-y-[6px] transition-all duration-150 ease-in-out">
                                Search <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Popular Cities List – reuse component */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-5xl"
            >
                {/* Assuming PopularCityList is exported as default */}
                {/* If it is a named export, adjust import accordingly */}
                {/* <PopularCityList ...props /> */}
                {/* Placeholder for now */}
                <Card className="rounded-[2rem] bg-white/95 backdrop-blur-xl border-t-4 border-l-4 border-white/80 shadow-[20px_20px_60px_rgba(30,58,138,0.5),-10px_-10px_40px_rgba(255,255,255,0.2)]">
                    <CardHeader className="text-center py-6">
                        <CardTitle className="text-3xl font-extrabold text-blue-950">Popular Cities</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {/* Example city cards */}
                        {["Paris", "Tokyo", "New York", "Sydney", "Cairo", "Rio de Janeiro"].map((city) => (
                            <div key={city} className="flex items-center gap-4 bg-sky-50/50 border-2 border-sky-100 rounded-xl p-4 shadow-[inset_0_3px_6px_rgba(0,0,0,0.05)]">
                                <MapPin className="w-6 h-6 text-blue-600" />
                                <span className="font-bold text-blue-950">{city}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    );
}
