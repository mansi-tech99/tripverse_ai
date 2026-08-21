"use client";

import React, { useState } from "react";
import Hero from "./_components/Hero";
import { PopularCityList } from "./_components/PopularCityList";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Zap, Shield, Globe, MapPin, ArrowRight, CheckCircle2,
  Clock, Wallet, Users, Compass, Star, ChevronDown, HelpCircle, Heart,
  Building, Navigation, CompassIcon
} from "lucide-react";
import Link from "next/link";

const FEATURE_TABS = [
  {
    id: "copilot",
    label: "AI Copilot Engine",
    icon: Zap,
    title: "Conversational Trip Architect",
    desc: "Describe your dream trip in natural language. Our AI understands travel styles, budget caps, activity pace, and group constraints automatically.",
    stats: "Sub-2 Second Generation",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "budget",
    label: "Smart Budget Allocation",
    icon: Wallet,
    title: "Precision Cost Estimation",
    desc: "Get transparent breakdowns of hotel costs, food, entry tickets, and local commute expenses tuned to your personal financial comfort.",
    stats: "99.4% Budget Accuracy",
    color: "from-amber-400 to-emerald-400",
  },
  {
    id: "itinerary",
    label: "Dynamic Timeline",
    icon: Clock,
    title: "Optimized Daily Schedules",
    desc: "Every day is packed with chronological activities, optimal visitation hours, and geo-distance map links for hassle-free travel.",
    stats: "100% Geo-Mapped Routes",
    color: "from-orange-500 to-amber-500",
  },
];

const SAMPLE_PREVIEWS = [
  {
    id: "paris",
    city: "Paris, France",
    tagline: "Romantic Culture & Gastronomy",
    duration: "5 Days",
    budget: "Luxury",
    hotels: ["Le Meurice", "Hotel Plaza Athénée"],
    highlights: ["Private Eiffel Tower Tour", "Louvre Fast Track", "Seine River Dinner Cruise"],
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "tokyo",
    city: "Tokyo, Japan",
    tagline: "Futuristic Neon & Traditional Shrines",
    duration: "7 Days",
    budget: "Moderate",
    hotels: ["Keio Plaza Shinjuku", "Trunk Hotel Shibuya"],
    highlights: ["Shibuya Crossing at Night", "Senso-ji Temple Walk", "Akihabara Tech Exploration"],
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "bali",
    city: "Bali, Indonesia",
    tagline: "Tropical Paradise & Villa Retreats",
    duration: "6 Days",
    budget: "Relaxed",
    hotels: ["Ubud Hanging Gardens", "Seminyak Beach Resort"],
    highlights: ["Tegallalang Rice Terraces", "Uluwatu Cliff Sunset", "Sacred Monkey Forest"],
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Describe Your Vision",
    desc: "Enter your destination, dates, budget, and travel preferences into our AI prompt box.",
    icon: CompassIcon,
  },
  {
    step: "02",
    title: "AI Synthesis & Curation",
    desc: "Our Gemini engine selects matching boutique stays, optimizes daily routes, and calculates total cost.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Customize & Explore",
    desc: "Review your day-by-day itinerary, save to your collection, and start your journey with confidence.",
    icon: Navigation,
  },
];

const REVIEWS = [
  {
    name: "Sophia Martinez",
    role: "Luxury Traveler",
    location: "Miami, USA",
    comment: "Tripverse AI saved me hours of research for my Paris trip! The hotel recommendations were spot on and the daily timeline flowed effortlessly.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Kenji Takahashi",
    role: "Solo Adventurer",
    location: "Tokyo, Japan",
    comment: "The budget estimation feature gave me complete peace of mind. It accurately predicted my food and transport costs across Rome!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Elena Rostova",
    role: "Family Explorer",
    location: "London, UK",
    comment: "Planning a 7-day trip with kids used to be overwhelming. Tripverse AI generated a balanced schedule with perfect activity spacing.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
];

const FAQS = [
  {
    q: "How fast does the AI generate a complete trip plan?",
    a: "Our AI engine processes your request and returns a full multi-day itinerary with hotel suggestions, daily activities, and budget estimates in under 2 seconds."
  },
  {
    q: "Are the generated trip itineraries free to use?",
    a: "Yes! Creating, viewing, and saving AI trip plans on Tripverse AI is 100% free for registered users."
  },
  {
    q: "Can I customize or edit my saved itineraries?",
    a: "Absolutely. Once saved under 'My Trips', you can revisit your travel plans anytime, update prompts, and regenerate tailored days."
  },
  {
    q: "How accurate are the hotel and activity recommendations?",
    a: "Our system combines Google Places data, Wikipedia context, and AI rating curation to ensure high-quality, verified destinations."
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("copilot");
  const [activePreview, setActivePreview] = useState("paris");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentFeature = FEATURE_TABS.find((t) => t.id === activeTab) || FEATURE_TABS[0];
  const currentPreview = SAMPLE_PREVIEWS.find((p) => p.id === activePreview) || SAMPLE_PREVIEWS[0];

  return (
    <div className="w-full bg-slate-50 dark:bg-[#060913] text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 overflow-hidden transition-colors duration-500">

      {/* Hero Section */}
      <Hero />

      {/* Interactive Feature Showcase Section with Toggle Effect */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-slate-100 via-white to-slate-100 dark:from-[#060913] dark:via-[#090d19] dark:to-[#060913] transition-colors duration-500">
        {/* Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              <span>Next-Gen Travel Engine</span>
            </motion.div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
              Powered by <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 dark:from-amber-300 dark:via-orange-400 dark:to-amber-500 bg-clip-text text-transparent drop-shadow-sm">Cyber-AI Intelligence</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto">
              Toggle through our core features below to see how our platform handles complex travel itineraries in real-time.
            </p>
          </div>

          {/* Interactive Feature Tabs Toggle Bar */}
          <div className="flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-amber-500/30 backdrop-blur-xl shadow-lg">
              {FEATURE_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer ${isActive
                      ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-105"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                      }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-amber-500 dark:text-amber-400"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feature Showcase Display Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-slate-200 dark:border-amber-500/30 bg-white/90 dark:bg-slate-900/80 p-8 sm:p-12 backdrop-blur-2xl shadow-xl dark:shadow-[0_0_40px_rgba(0,0,0,0.7)] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <div className="space-y-5">
                <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  {currentFeature.stats}
                </span>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {currentFeature.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {currentFeature.desc}
                </p>

                <div className="pt-4 flex items-center gap-4">
                  <Link href="/create-new-trip">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all cursor-pointer"
                    >
                      <span>Try AI Generator Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Visual Card Preview */}
              <div className="relative rounded-2xl border border-slate-200 dark:border-amber-500/20 bg-slate-100 dark:bg-slate-950/80 p-6 space-y-4 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400 animate-pulse" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Live AI Output</span>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
                </div>

                <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                    <span>Input Prompt</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">5 Days in Paris</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                    <span>Processing Engine</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Gemini 2.5 Flash</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                    <span>Response Time</span>
                    <span className="text-sky-600 dark:text-sky-400 font-bold">1.42s</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* How It Works 3-Step Process Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#060913]">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
              Simple 3-Step Workflow
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              How <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Tripverse AI</span> Works
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              From initial prompt to complete luxury travel schedule in three seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS_STEPS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * idx }}
                  className="relative p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg space-y-5 hover:border-amber-500/50 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-300 dark:text-slate-800">{item.step}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Sample Itinerary Preview Toggle Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-[#080c18] transition-colors duration-500">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-3 inline-block">
                Sample Itineraries
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Preview <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 dark:from-amber-300 dark:via-orange-400 dark:to-amber-500 bg-clip-text text-transparent">AI Trip Plans</span>
              </h2>
            </div>

            {/* Itinerary Preview Toggle Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {SAMPLE_PREVIEWS.map((prev) => (
                <button
                  key={prev.id}
                  onClick={() => setActivePreview(prev.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${activePreview === prev.id
                    ? "bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)] font-black"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                >
                  {prev.city}
                </button>
              ))}
            </div>
          </div>

          {/* Active Preview Showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPreview.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Image Banner */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-amber-500/30 min-h-[300px] shadow-xl dark:shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                <img
                  src={currentPreview.image}
                  alt={currentPreview.city}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-slate-950/80 px-2.5 py-1 rounded-full border border-white/10">
                    {currentPreview.tagline}
                  </span>
                  <h3 className="text-2xl font-black text-white drop-shadow-md">{currentPreview.city}</h3>
                </div>
              </div>

              {/* Details & Highlights */}
              <div className="lg:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-xl">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-extrabold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                      <Clock className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> {currentPreview.duration}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                      <Wallet className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> {currentPreview.budget} Budget
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Curated Highlights</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {currentPreview.highlights.map((h, i) => (
                        <div key={i} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Handpicked Hotels</h4>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-bold">{currentPreview.hotels.join(" • ")}</p>
                  </div>
                </div>

                <Link href="/create-new-trip">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer"
                  >
                    Generate Your Custom {currentPreview.city} Trip ⚡
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Popular City Carousel */}
      <PopularCityList />

      {/* Traveler Reviews Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#060913]">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
              Community Love
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Loved by <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Global Explorers</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              See what travelers around the world have to say about planning with Tripverse AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((rev, i) => (
              <motion.div
                key={rev.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i }}
                className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full object-cover border border-amber-500/30" />
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{rev.name}</h4>
                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{rev.role} • {rev.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-[#080c18]">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Questions Answered</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-extrabold text-sm sm:text-base text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-amber-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="p-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}