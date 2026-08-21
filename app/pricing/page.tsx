"use client";

import React, { useState } from "react";
import { Check, HelpCircle, Sparkles, Zap, ArrowRight, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Pricing() {
    const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

    const plans = [
        {
            name: "Explorer",
            tagline: "Perfect for casual travelers & weekend getaways",
            price: { monthly: 0, yearly: 0 },
            features: [
                "5 AI trip plans per day",
                "Standard AI response speed",
                "Handpicked hotel options",
                "Community support",
                "Basic activity schedules"
            ],
            cta: "Get Started Free",
            href: "/create-new-trip",
            popular: false,
            icon: Zap,
        },
        {
            name: "Voyager",
            tagline: "For frequent travelers who want unlimited power",
            price: { monthly: 9, yearly: 7 },
            features: [
                "Unlimited AI trip generation",
                "Priority high-speed AI engine",
                "Custom hotel & dining curation",
                "Export itineraries to PDF & Print",
                "Interactive Google Maps integration",
                "Ad-free premium experience",
            ],
            cta: "Upgrade to Voyager",
            href: "#",
            popular: true,
            icon: Sparkles,
        },
        {
            name: "Agency & Business",
            tagline: "For travel agencies, tour operators & teams",
            price: { monthly: 29, yearly: 24 },
            features: [
                "Everything in Voyager",
                "Multi-seat team workspace",
                "White-labeled PDF export with logo",
                "Developer API access",
                "Dedicated 24/7 VIP support manager",
                "Custom itinerary policies",
            ],
            cta: "Contact Sales",
            href: "/contact",
            popular: false,
            icon: ArrowRight,
        },
    ];

    const faqs = [
        {
            question: "How does the AI generate my custom trip?",
            answer: "Our generative AI engine cross-references your target destination, budget, group size, and travel duration to select matching hotel options, optimal visiting times, and top local attractions in seconds.",
        },
        {
            question: "Can I switch or cancel my plan anytime?",
            answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from your account settings with no hidden fees.",
        },
        {
            question: "Is there a money-back guarantee?",
            answer: "We offer a 14-day hassle-free money-back guarantee on all paid subscriptions. If you aren't satisfied, send us a quick note via our Contact page.",
        },
        {
            question: "Can I export my itineraries to PDF or Print?",
            answer: "Yes! Voyager and Business subscribers can export clean, print-ready PDF itineraries or copy text summaries to share with friends and travel companions.",
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#060913] text-slate-100 font-sans pt-28">

            {/* Hero Header */}
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center mt-6 mb-16 space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                >
                    <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                    <span>Transparent SaaS Pricing</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white"
                >
                    Simple Plans for <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">Every Traveler</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mx-auto max-w-2xl text-sm sm:text-base font-medium text-slate-400"
                >
                    Generate unlimited AI itineraries, export print-ready guides, and explore the world with luxury confidence.
                </motion.p>

                {/* Billing Toggle Switch */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="pt-6 flex items-center justify-center gap-4"
                >
                    <span className={`text-xs font-bold uppercase tracking-wider transition ${billingPeriod === "monthly" ? "text-white font-black" : "text-slate-500"}`}>
                        Monthly Billing
                    </span>

                    <button
                        suppressHydrationWarning
                        onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
                        className="relative flex h-7 w-14 cursor-pointer rounded-full bg-slate-900 border border-slate-800 p-1 transition duration-300 ring-2 ring-amber-500/20"
                    >
                        <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-md transition duration-300 ${billingPeriod === "yearly" ? "translate-x-7" : "translate-x-0"
                                }`}
                        />
                    </button>

                    <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition ${billingPeriod === "yearly" ? "text-white font-black" : "text-slate-500"}`}>
                        Annual Billing
                        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-black text-emerald-400">
                            Save 20%
                        </span>
                    </span>
                </motion.div>
            </div>

            {/* Pricing Card Grid */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-24 w-full">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
                    {plans.map((plan, index) => {
                        const Icon = plan.icon;
                        const price = billingPeriod === "monthly" ? plan.price.monthly : plan.price.yearly;

                        return (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                className={`relative flex flex-col justify-between rounded-3xl p-8 bg-slate-900/90 backdrop-blur-xl transition-all duration-300 shadow-xl border ${plan.popular
                                    ? "border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.2)] md:-translate-y-2 z-10"
                                    : "border-slate-800/80 hover:border-slate-700"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-4 py-1 text-[10px] font-black text-slate-950 uppercase tracking-widest shadow-lg">
                                        Most Popular Plan
                                    </div>
                                )}

                                <div>
                                    <div className="flex items-center justify-between gap-4">
                                        <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${plan.popular ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-slate-800 text-slate-400"
                                            }`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                    </div>
                                    <p className="mt-2 text-xs font-medium text-slate-400">{plan.tagline}</p>

                                    <div className="mt-6 flex items-baseline gap-1">
                                        <span className="text-4xl font-black tracking-tight text-white">${price}</span>
                                        <span className="text-xs font-bold text-slate-400">/ month</span>
                                        {billingPeriod === "yearly" && price > 0 && (
                                            <span className="ml-2 text-[10px] font-black text-emerald-400 uppercase">Billed Yearly</span>
                                        )}
                                    </div>

                                    <ul className="mt-8 space-y-3.5 border-t border-slate-800/80 pt-6">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                                </div>
                                                <span className="text-xs font-bold text-slate-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-8 pt-4">
                                    <Link href={plan.href}>
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            suppressHydrationWarning
                                            className={`w-full rounded-2xl py-3.5 px-4 text-center text-xs font-black transition-all shadow-md cursor-pointer ${plan.popular
                                                ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                                                : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                                                }`}
                                        >
                                            {plan.cta}
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* FAQ Accordion Section */}
            <div className="bg-slate-950/80 py-20 border-t border-slate-800/80 backdrop-blur-xl">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-12">
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400">
                            <HelpCircle className="w-4 h-4" /> Got Questions?
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-md space-y-2">
                                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0" />
                                    {faq.question}
                                </h3>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
