"use client";

import React, { useState } from "react";
import {
    Mail, Phone, MapPin, Send, MessageSquare, Sparkles, CheckCircle2,
    Clock, HelpCircle, ChevronDown, Globe2, ShieldCheck, HeartHandshake
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1200);
    };

    const faqs = [
        {
            q: "How does Tripverse AI generate custom travel plans?",
            a: "Our advanced generative AI model analyzes your destination, budget, group size, and travel duration to curate personalized hotel options, optimized daily schedules, and local attraction recommendations in seconds."
        },
        {
            q: "Can I save and edit my generated itineraries?",
            a: "Yes! All itineraries are saved under your personal 'My Trips' dashboard where you can review, copy summaries, or print your travel plans anytime."
        },
        {
            q: "Is Tripverse AI free to use?",
            a: "Yes, our core AI itinerary generation features are completely free for all registered users."
        },
        {
            q: "What if I need help during my trip?",
            a: "You can reach our 24/7 AI travel support team through this contact form or via email at support@tripverse.ai."
        }
    ];

    return (
        <div className="min-h-screen bg-[#060913] text-slate-100 font-sans pt-28 pb-20 px-4 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto space-y-16">

                {/* Page Hero Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                        <Sparkles className="w-4 h-4 animate-pulse text-amber-400" />
                        <span>24/7 Global Travel Concierge</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white">
                        We're Here to Help You <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">Explore</span>
                    </h1>

                    <p className="text-sm md:text-base text-slate-400 font-medium">
                        Have questions about your AI travel plans, feedback, or custom requests? Drop us a line and our travel experts will respond shortly.
                    </p>
                </motion.div>

                {/* Main Grid Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Contact Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-8 backdrop-blur-2xl">
                            <h3 className="text-xl font-black text-white flex items-center gap-2">
                                <HeartHandshake className="w-5 h-5 text-amber-400" />
                                Contact Information
                            </h3>

                            {/* Email Card */}
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                                    <Mail className="w-6 h-6 stroke-[2.2]" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">Email Support</h4>
                                    <p className="text-xs text-slate-400 mt-0.5">We reply within 24 hours</p>
                                    <a href="mailto:support@tripverse.ai" className="text-sm font-extrabold text-amber-400 hover:underline mt-1 block">
                                        support@tripverse.ai
                                    </a>
                                </div>
                            </div>

                            {/* Phone Card */}
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                                <div className="w-12 h-12 rounded-2xl bg-slate-800 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-md">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">Customer Support</h4>
                                    <p className="text-xs text-slate-400 mt-0.5">Mon - Fri, 9am - 8pm EST</p>
                                    <a href="tel:+18005558747" className="text-sm font-extrabold text-slate-200 hover:text-amber-400 transition-colors mt-1 block">
                                        +1 (800) 555-TRIP
                                    </a>
                                </div>
                            </div>

                            {/* Headquarters Card */}
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-md">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">Global Headquarters</h4>
                                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                        777 Travel Way, Suite 400<br />San Francisco, CA 94107
                                    </p>
                                </div>
                            </div>

                            {/* Security Banner */}
                            <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-slate-400 border-t border-slate-800">
                                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>Your details are kept 100% private and protected.</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-7"
                    >
                        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl backdrop-blur-2xl">
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-lg">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white">Message Received!</h3>
                                    <p className="text-xs text-slate-400 max-w-md">
                                        Thank you for contacting Tripverse AI. Our support team has received your message and will respond to <strong className="text-slate-200">{formData.email}</strong> within 24 hours.
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        suppressHydrationWarning
                                        onClick={() => {
                                            setSubmitted(false);
                                            setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
                                        }}
                                        className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs px-6 py-3.5 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all cursor-pointer"
                                    >
                                        Send Another Message
                                    </motion.button>
                                </div>
                            ) : (
                                <form suppressHydrationWarning onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl font-black text-white mb-1">
                                            Send Us a Message
                                        </h3>
                                        <p className="text-xs text-slate-400">
                                            Fill out the form below and we'll get back to you right away.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Name */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-300">
                                                Full Name <span className="text-amber-400">*</span>
                                            </label>
                                            <input
                                                suppressHydrationWarning
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="John Doe"
                                                className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-300">
                                                Email Address <span className="text-amber-400">*</span>
                                            </label>
                                            <input
                                                suppressHydrationWarning
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="john@example.com"
                                                className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject Dropdown */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-300">
                                            Subject Topic
                                        </label>
                                        <select
                                            suppressHydrationWarning
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                                        >
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Itinerary Help">AI Itinerary Help</option>
                                            <option value="Bug Report">Technical Issue / Bug</option>
                                            <option value="Partnership">Partnership & Business</option>
                                        </select>
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-300">
                                            Your Message <span className="text-amber-400">*</span>
                                        </label>
                                        <textarea
                                            suppressHydrationWarning
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="How can we help you plan your next trip?"
                                            className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        suppressHydrationWarning
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-sm py-4 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all cursor-pointer"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 animate-spin" /> Sending Message...
                                            </span>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" /> Send Message
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl max-w-4xl mx-auto space-y-6 backdrop-blur-2xl"
                >
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400">
                            <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white">
                            Got Questions? We've Got Answers
                        </h2>
                    </div>

                    <div className="space-y-4 pt-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaqIndex === index;
                            return (
                                <div
                                    key={index}
                                    className="border border-slate-800 rounded-2xl overflow-hidden transition-all"
                                >
                                    <button
                                        suppressHydrationWarning
                                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                                        className="w-full flex items-center justify-between p-4 md:p-5 text-left font-bold text-sm md:text-base text-slate-200 bg-slate-800/50 hover:bg-slate-800 transition-colors"
                                    >
                                        <span>{faq.q}</span>
                                        <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                                    </button>
                                    {isOpen && (
                                        <div className="p-4 md:p-5 text-xs md:text-sm text-slate-400 bg-slate-900/90 leading-relaxed border-t border-slate-800">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

