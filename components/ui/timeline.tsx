"use client";

import type { TripInfo } from "../../app/create-new-trip/_components/types";
import { Sparkles } from "lucide-react";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data, tripData }: { data: TimelineEntry[], tripData?: TripInfo }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.getBoundingClientRect().height);
      }
    };

    updateHeight();
    const resizeObserver = new ResizeObserver(() => updateHeight());
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-slate-50/50 dark:bg-slate-950/50 font-sans rounded-3xl"
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto py-6 px-4 md:px-8">
        <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Curated Travel Schedule</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
          Your Trip Itinerary from <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">{tripData?.origin || "Origin"}</span> to <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">{tripData?.destination || "Destination"}</span>
        </h2>
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto pb-16">
        {data.map((item, index) => (
          <motion.div
            key={`${item.title}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex justify-start pt-8 md:pt-14 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-28 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-slate-900 border border-orange-500/30 dark:border-orange-500/30 flex items-center justify-center shadow-lg">
                <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 ring-4 ring-orange-500/20" />
              </div>
              <h3 className="hidden md:block text-2xl md:pl-20 md:text-3xl font-extrabold text-slate-800 dark:text-slate-200 tracking-tight">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-16 pr-2 md:pl-4 w-full">
              <h3 className="md:hidden block text-xl mb-4 text-left font-extrabold text-slate-800 dark:text-slate-200">
                {item.title}
              </h3>
              {item.content}
            </div>
          </motion.div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[3px] bg-slate-200/80 dark:bg-slate-800/80 rounded-full"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-b from-orange-500 via-amber-500 to-emerald-500 rounded-full shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

