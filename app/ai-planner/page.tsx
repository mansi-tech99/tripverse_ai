// app/ai-planner/page.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Bot, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AIPlannerPage() {
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
                        <h1 className="text-4xl font-extrabold text-blue-950 drop-shadow-sm">
                            AI Trip Planner
                        </h1>
                        <p className="text-sm font-medium text-blue-800/80 text-center max-w-2xl">
                            Tell us what you want, and our AI will craft a perfect itinerary.
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <form className="flex flex-col gap-4">
                            <Label htmlFor="prompt" className="sr-only">
                                Prompt
                            </Label>
                            <Input
                                id="prompt"
                                placeholder="e.g. 7‑day trip to Japan under $2000"
                                className="h-14 bg-sky-50/50 border-2 border-sky-100 focus-visible:ring-4 focus-visible:ring-blue-500/20 focus-visible:border-blue-400 shadow-[inset_0_3px_6px_rgba(0,0,0,0.05)] rounded-xl text-blue-950 font-medium"
                            />
                            <Button
                                type="submit"
                                className="w-full h-14 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-black rounded-xl shadow-[0_6px_0_#1e3a8a] active:shadow-none active:translate-y-[6px] transition-all duration-150 ease-in-out flex items-center justify-center gap-2"
                            >
                                <Bot className="w-5 h-5" />
                                Generate Plan
                                <ArrowRight className="w-5 h-5 ml-1" />
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Placeholder for AI chat UI */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-4xl"
            >
                <Card className="rounded-[2rem] bg-white/95 backdrop-blur-xl border-t-4 border-l-4 border-white/80 shadow-[20px_20px_60px_rgba(30,58,138,0.5),-10px_-10px_40px_rgba(255,255,255,0.2)]">
                    <CardHeader className="flex items-center gap-2">
                        <Loader2 className="animate-spin text-blue-600" />
                        <CardTitle className="text-xl font-bold text-blue-950">
                            Thinking...
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-blue-800/80">
                        {/* Replace with streaming response component later */}
                        <p>AI is generating your itinerary. Stay tuned!</p>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    );
}
