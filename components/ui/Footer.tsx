"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    FaXTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaFacebookF,
    FaYoutube,
    FaGithub,
} from "react-icons/fa6";
import Link from "next/link";
import { Globe2, Send, Sparkles, Heart } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const socialIcons = [
        { Icon: FaXTwitter, label: "Twitter", href: "#" },
        { Icon: FaInstagram, label: "Instagram", href: "#" },
        { Icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
        { Icon: FaFacebookF, label: "Facebook", href: "#" },
        { Icon: FaYoutube, label: "YouTube", href: "#" },
        { Icon: FaGithub, label: "GitHub", href: "#" },
    ];

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Create Trip", href: "/create-new-trip" },
        { name: "My Trips", href: "/my-trips" },
        { name: "Pricing", href: "/pricing" },
        { name: "Contact Us", href: "/contact" },
    ];

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newsletterEmail) return;
        setSubscribed(true);
    };

    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-[#04060d] text-slate-100 pt-24 pb-8 px-6 md:px-12 lg:px-24 font-sans">

            {/* Subtle Ambient Background Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[120px]" />
                <div className="absolute top-40 -left-40 h-[500px] w-[500px] rounded-full bg-orange-600/5 blur-[120px]" />
            </div>

            <div className="relative max-w-7xl mx-auto z-10 space-y-20">

                {/* Top Grid: Brand & Newsletter */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

                    {/* Left Brand Area */}
                    <div className="lg:col-span-5 space-y-6">
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                                <Globe2 className="h-6 w-6 stroke-[2]" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">
                                Tripverse{" "}
                                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                                    AI
                                </span>
                            </span>
                        </Link>

                        <p className="text-sm text-slate-400 font-normal leading-relaxed max-w-sm">
                            Architecting luxury travel itineraries, handpicked hotel recommendations, and day-by-day exploration schedules in seconds using generative AI intelligence.
                        </p>

                        {/* Premium "Powered By" Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs font-medium text-amber-400/90 w-fit">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Powered by Gemini AI Engine v3.0</span>
                        </div>
                    </div>

                    {/* Middle Quick Links */}
                    <div className="lg:col-span-3 space-y-5 lg:pl-8">
                        <h4 className="text-sm font-semibold text-slate-100">Quick Navigation</h4>
                        <ul className="space-y-3.5">
                            {navLinks.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200 flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-amber-400 transition-colors" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Newsletter Subscription */}
                    <div className="lg:col-span-4 space-y-5">
                        <h4 className="text-sm font-semibold text-slate-100">Join the Travel Club</h4>
                        <p className="text-sm text-slate-400 font-normal leading-relaxed">
                            Receive curated secret travel destinations and AI feature updates straight to your inbox.
                        </p>

                        {subscribed ? (
                            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium flex items-center gap-2">
                                <Sparkles className="w-4 h-4" /> Welcome to the club!
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="relative flex items-center mt-2">
                                <input
                                    type="email"
                                    required
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="w-full pl-5 pr-32 py-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 text-sm font-medium focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="absolute right-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 shadow-md"
                                >
                                    <span>Subscribe</span>
                                    <Send className="w-3.5 h-3.5" />
                                </motion.button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Bottom Footer Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
                    <p className="text-sm text-slate-500 flex items-center gap-1.5">
                        © {currentYear} Tripverse AI. Crafted with
                        <Heart className="w-4 h-4 text-amber-500 fill-amber-500 mx-0.5" />
                        for global explorers.
                    </p>

                    {/* Social Media Icons */}
                    <div className="flex items-center gap-3">
                        {socialIcons.map(({ Icon, label, href }) => (
                            <motion.a
                                key={label}
                                href={href}
                                aria-label={label}
                                whileHover={{ y: -3 }}
                                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all"
                            >
                                <Icon className="h-4 w-4" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}