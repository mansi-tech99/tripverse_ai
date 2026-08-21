import { motion, useAnimation } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Counter } from '@/components/ui/Counter';

export const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-[#090d16]" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
            {/* Floating gradient lights */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-accent/20 blur-3xl animate-pulse delay-2000" />
            </div>

            <motion.div
                className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
            >
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white font-[SpaceGrotesk]">
                    Discover Your Perfect Journey with AI
                </h1>
                <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/80 font-[Inter]">
                    Plan personalized trips in seconds using intelligent itineraries, smart recommendations, AI travel assistant, and real‑time travel insights.
                </p>

                {/* AI Search Form */}
                <motion.form
                    className="mt-8 flex w-full max-w-xl flex-col gap-4 md:flex-row"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <input
                        type="text"
                        placeholder="Destination"
                        className="flex-1 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                        type="date"
                        className="rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        type="submit"
                        className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90 transition-colors"
                    >
                        Plan My Trip <ArrowRight size={18} />
                    </button>
                </motion.form>

                {/* Trusted‑by counters */}
                <motion.div
                    className="mt-12 flex flex-wrap justify-center gap-8 text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <Counter end={50000} label="Travelers" />
                    <Counter end={120} label="Countries" />
                    <Counter end={4.9} decimals={1} label="Rating" />
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <svg
                        className="h-6 w-6 animate-bounce text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 5v14m7-7H5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
};
