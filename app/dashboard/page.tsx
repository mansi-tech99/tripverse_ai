// app/dashboard/page.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder logout logic – redirect to home page
        window.location.assign("/");
    };

    return (
        <section className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-900 via-blue-500 to-sky-200 p-4 sm:p-6">
            {/* 3D Floating Card */}
            <Card className="w-full max-w-2xl rounded-[2rem] bg-white/95 backdrop-blur-xl border-t-4 border-l-4 border-white/80 shadow-[20px_20px_60px_rgba(30,58,138,0.5),-10px_-10px_40px_rgba(255,255,255,0.2)]">
                <CardHeader className="space-y-4 text-center pb-8 pt-8">
                    <div className="flex justify-center">
                        {/* 3D Icon Container */}
                        <div className="bg-linear-to-br from-sky-300 to-blue-500 p-4 rounded-2xl shadow-[0_8px_16px_rgba(59,130,246,0.4),inset_0_2px_4px_rgba(255,255,255,0.6)] transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                            <Calendar className="w-12 h-12 text-white drop-shadow-md" />
                        </div>
                    </div>
                    <CardTitle className="text-4xl font-extrabold tracking-tight text-blue-950 drop-shadow-sm">
                        Dashboard
                    </CardTitle>
                    <p className="text-sm font-medium text-blue-800/80">
                        Your personalized travel hub
                    </p>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Sample Form – Carved Input */}
                    <form onSubmit={handleLogout} className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="search" className="font-bold text-blue-950 ml-1">Search Trips</Label>
                            <Input
                                id="search"
                                type="text"
                                placeholder="e.g. Bali, Paris…"
                                className="h-12 bg-sky-50/50 border-2 border-sky-100 focus-visible:ring-4 focus-visible:ring-blue-500/20 focus-visible:border-blue-400 shadow-[inset_0_3px_6px_rgba(0,0,0,0.05)] rounded-xl text-blue-950 font-medium transition-all"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-14 bg-linear-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-black text-lg rounded-xl shadow-[0_6px_0_#1e3a8a] active:shadow-none active:translate-y-1 transition-all duration-150 ease-in-out group"
                        >
                            Sign Out <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center pt-6">
                    <Link href="/" className="text-blue-600 font-bold hover:text-blue-500 transition-colors">
                        Return Home
                    </Link>
                </CardFooter>
            </Card>
        </section>
    );
}
