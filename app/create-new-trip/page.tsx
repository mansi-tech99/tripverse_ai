"use client";

import React, { useState } from "react";
import ChatBox from "./_components/ChatBox";
import Itinerary from "./_components/Itinerary";
import type { TripInfo } from "./_components/types";

export default function Page() {
  const [tripData, setTripData] = useState<TripInfo | undefined>(undefined);

  return (
    <main className="pt-24 pb-8 min-h-screen bg-slate-50 dark:bg-slate-950 px-4 md:px-8">
      <div className="mx-auto max-w-7xl h-[calc(100vh-7rem)]">
        <div className="grid h-full grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">

          {/* Left Chat Panel */}
          <div className="lg:col-span-5 xl:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 h-full overflow-hidden">
            <ChatBox onTripGenerated={setTripData} />
          </div>

          {/* Right Itinerary Panel */}
          <div className="lg:col-span-7 xl:col-span-8 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 h-full">
            <Itinerary tripData={tripData} />
          </div>

        </div>
      </div>
    </main>
  );
}