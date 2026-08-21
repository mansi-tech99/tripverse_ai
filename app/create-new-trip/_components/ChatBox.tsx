"use client";

import React, { useState, useRef, useEffect } from "react";
import { Loader, Send, Sparkles, User, RefreshCw } from "lucide-react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUi from "./GroupSIzeUi";
import BudgetUi from "./BudgetUi";
import SelectDaysUi from "./SelectDaysUi";
import FinalUi from "./FinalUi";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTripDetail, useUserDetail } from "@/app/provider";
import TripDetailView from "./TripDetailView";
import { motion, AnimatePresence } from "framer-motion";
import type { TripInfo } from "./types";

type Message = {
  role: "user" | "assistant";
  content: string;
  ui?: string;
};

type ChatRequestMessage = Pick<Message, "role" | "content">;

const FINAL_CONFIRMATION = "Ok, Great! I am ready to plan my trip now.";

export default function ChatBox({ onTripGenerated }: { onTripGenerated?: (trip: TripInfo) => void }) {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [showTrip, setShowTrip] = useState(false);

  const [isFinal, setIsFinal] = useState(false);
  const [tripDetail, setTripDetail] = useState<TripInfo | undefined>(undefined);
  const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail);
  const [userDetail] = useUserDetail();
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const saveTripPlan = async (tripPlan: TripInfo) => {
    setTripDetail(tripPlan);
    setTripDetailInfo(tripPlan);
    if (onTripGenerated) {
      onTripGenerated(tripPlan);
    }

    if (userDetail?._id) {
      await SaveTripDetail({
        tripId: uuidv4(),
        uid: userDetail._id,
        tripDetail: tripPlan,
      });
    }
  };

  const handleReset = () => {
    setMessages([]);
    setIsFinal(false);
    setTripDetail(undefined);
    setShowTrip(false);
  };

  const onSend = async (text?: string) => {
    const input = text ?? userInput;

    if (!input.trim()) return;

    setLoading(true);
    setUserInput("");

    const newMsg: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, newMsg]);

    const requestMessages: ChatRequestMessage[] = [...messages, newMsg].map(
      ({ role, content }) => ({
        role,
        content,
      })
    );

    try {
      const aiResponse = await axios.post("/api/aimodel", {
        messages: requestMessages,
        isFinal,
      });

      const tripPlan = aiResponse.data?.trip_plan as TripInfo | undefined;
      const responseText = aiResponse.data?.resp ?? "";
      const assistantMessage: Message = {
        role: "assistant",
        content: responseText,
        ui: aiResponse.data?.ui ?? "",
      };

      if (isFinal) {
        if (tripPlan) {
          await saveTripPlan(tripPlan);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: responseText || "I couldn't generate a trip plan yet. Please try again.",
            },
          ]);
        }
      } else {
        if (assistantMessage.ui !== "final") {
          setMessages((prev) => [...prev, assistantMessage]);
        }

        if (assistantMessage.ui === "final") {
          setIsFinal(true);

          const finalMessages: ChatRequestMessage[] = [
            ...requestMessages,
            assistantMessage,
            { role: "user", content: FINAL_CONFIRMATION },
          ];

          const finalResponse = await axios.post("/api/aimodel", {
            messages: finalMessages,
            isFinal: true,
          });

          console.log("Trip Plan:", finalResponse.data?.trip_plan);

          const finalTripPlan = finalResponse.data?.trip_plan as TripInfo | undefined;

          if (finalTripPlan) {
            await saveTripPlan(finalTripPlan);

            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: "",
                ui: "final",
              },
            ]);
          } else {
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: "Unable to generate trip.",
              },
            ]);
          }
        }
      }
    } catch (error: unknown) {
      // Robust axios error handling and logging
      try {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error("API response error:", error.response.status, error.response.data);
          } else if (error.request) {
            console.error("API no response, request made:", error.request);
          } else {
            console.error("Axios error:", error.message);
          }
        } else {
          console.error("Non-Axios error:", error);
        }
      } catch (logErr) {
        console.error("Error while logging axios error:", logErr);
      }

      let serverMessage = "Something went wrong. Please try again.";
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data;
        if (data) {
          if (typeof data === "string") serverMessage = data;
          else if (typeof data === "object" && data !== null && "resp" in data && typeof (data as { resp?: unknown }).resp === "string") {
            serverMessage = (data as { resp: string }).resp;
          } else if (typeof data === "object" && data !== null && "error" in data && typeof (data as { error?: unknown }).error === "string") {
            serverMessage = (data as { error: string }).error;
          }
        } else {
          serverMessage = `Server returned status ${error.response.status}`;
        }
      } else if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
        serverMessage = error.message;
      }

      if (!isFinal) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: serverMessage,
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (value: string) => {
    setMessages((prev) =>
      prev.map((msg, index) =>
        index === prev.length - 1
          ? { ...msg, ui: "" }
          : msg
      )
    );

    onSend(value);
  };

  const RenderGenerativeUi = (ui: string) => {
    const normalized = ui?.toLowerCase();
    if (normalized === "groupsize") {
      return <GroupSizeUi onSelectedOption={handleOptionSelect} />;
    } else if (normalized === "budget" || normalized === "budgetui") {
      return <BudgetUi onSelectedOption={handleOptionSelect} />;
    } else if (normalized === "tripduration") {
      return <SelectDaysUi onSelectedOption={handleOptionSelect} />;
    } else if (normalized === "final") {
      return tripDetail ? (
        <FinalUi
          trip={tripDetail}
          viewTrip={() => setShowTrip(!showTrip)}
        />
      ) : (
        <FinalUi />
      );
    } else {
      return null;
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-white dark:bg-slate-950">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 px-4 sm:px-6 py-3.5 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-md shadow-orange-500/20">
            <Sparkles className="h-4 w-4" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-slate-950 bg-emerald-500" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 leading-none">
              TripVerse AI
            </h2>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Interactive Planner
            </span>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all cursor-pointer"
            title="Start New Trip"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New Trip</span>
          </button>
        )}
      </div>

      {/* Messages Section */}
      <section className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 scroll-smooth">
        {messages.length === 0 ? (
          <EmptyBoxState onSuggestionClick={(value) => onSend(value)} />
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((msg, index) =>
              msg.role === "user" ? (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-end justify-end gap-2.5"
                >
                  <div className="max-w-[85%] sm:max-w-[75%] rounded-3xl rounded-br-xs bg-gradient-to-tr from-orange-600 to-amber-600 px-5 py-3.5 text-sm text-white shadow-md shadow-orange-500/10">
                    <p className="leading-relaxed font-medium">{msg.content}</p>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
                    <User className="h-4 w-4" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start justify-start gap-2.5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white text-xs font-bold shadow-sm mt-1">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="max-w-[90%] sm:max-w-[85%] rounded-3xl rounded-tl-xs border border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 px-5 py-4 text-sm text-slate-800 dark:text-slate-200 shadow-sm backdrop-blur-sm">
                    {msg.content && <p className="leading-relaxed font-normal">{msg.content}</p>}
                    {RenderGenerativeUi(msg.ui ?? "")}
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        )}

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white text-xs font-bold shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-3 rounded-2xl rounded-tl-xs border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-3 shadow-sm text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Loader className="h-4 w-4 animate-spin text-orange-600 dark:text-orange-400" />
              <span>Thinking & planning...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </section>

      {/* Trip Detail Overlay */}
      {showTrip && tripDetail && (
        <TripDetailView trip={tripDetail} />
      )}

      {/* Input Section - Anchored to the bottom */}
      <div className="shrink-0 border-t border-slate-100 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 p-4 sm:p-5 backdrop-blur-md">
        <div className="relative mx-auto max-w-4xl rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500/50 transition-all">
          <textarea
            suppressHydrationWarning
            rows={2}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (userInput.trim() && !loading) onSend();
              }
            }}
            placeholder="Describe your dream trip (e.g., 5 days in Tokyo for a couple with moderate budget)..."
            className="min-h-[90px] sm:min-h-[100px] w-full resize-none rounded-3xl border-none bg-transparent p-4 pr-16 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none"
          />

          <div className="flex items-center justify-between px-4 pb-3 pt-1">
            <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 hidden sm:inline">
              Press <kbd className="rounded border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[10px]">Enter ↵</kbd> to send
            </span>

            <button
              suppressHydrationWarning
              onClick={() => onSend()}
              disabled={!userInput.trim() || loading}
              className="absolute bottom-3 right-3 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-orange-600 text-white transition hover:bg-orange-700 active:scale-95 disabled:opacity-30 disabled:hover:bg-orange-600 disabled:active:scale-100 disabled:cursor-not-allowed shadow-md shadow-orange-500/20"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
