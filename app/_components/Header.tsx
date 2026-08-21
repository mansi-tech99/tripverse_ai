"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Globe2, Menu, X, Sparkles, Compass } from "lucide-react";
import { SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const path = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isLoaded) return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-slate-200/80 dark:border-amber-500/20 bg-white/90 dark:bg-slate-950/90 shadow-md backdrop-blur-2xl py-2.5"
          : "border-b border-slate-200/50 dark:border-slate-800/40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl py-3.5"
      )}
    >
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.35)] shrink-0"
          >
            <Globe2 className="h-4.5 w-4.5 stroke-[2.2]" />
          </motion.div>

          <div className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-amber-500">
              Tripverse
            </span>
            <span className="text-[8.5px] font-black uppercase tracking-[0.35em] text-amber-600 dark:text-amber-400">
              AI SAAS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1.5 md:flex p-1 rounded-full bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = path === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-xs transition-all duration-300 py-1.5 px-4 rounded-full font-bold",
                  isActive
                    ? "text-slate-950 bg-gradient-to-r from-amber-400 to-orange-500 font-black shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/80"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls Area */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Light / Dark / System Theme Toggle */}
          <ThemeToggle />

          {!user ? (
            <SignUpButton forceRedirectUrl="/create-new-trip">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                suppressHydrationWarning
                className="hidden items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-4 py-2 text-xs font-black text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_22px_rgba(245,158,11,0.5)] transition-all md:flex cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" /> Get Started
              </motion.button>
            </SignUpButton>
          ) : (
            <>
              {path === "/create-new-trip" ? (
                <Link href="/my-trips">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="hidden md:flex items-center justify-center gap-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 px-4 py-2 text-xs font-black text-slate-800 dark:text-slate-200 shadow-sm transition-all"
                  >
                    <Compass className="w-4 h-4 text-amber-500" /> My Trips
                  </motion.button>
                </Link>
              ) : (
                <Link href="/create-new-trip">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="hidden md:flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-4 py-2 text-xs font-black text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Create New Trip
                  </motion.button>
                </Link>
              )}

              <div className="ml-0.5 border-l border-slate-200 dark:border-slate-800 pl-2.5">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8 ring-2 ring-amber-500/50 transition-transform hover:scale-105"
                    }
                  }}
                />
              </div>
            </>
          )}

          {/* Mobile Drawer Trigger */}
          <button
            suppressHydrationWarning
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors md:hidden"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-slate-200 dark:border-amber-500/20 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col space-y-2.5 p-5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-xs font-bold py-2.5 px-4 rounded-xl transition-all",
                    path === item.href
                      ? "text-slate-950 bg-gradient-to-r from-amber-400 to-orange-500 font-black shadow-sm"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-2 border-t border-slate-200 dark:border-slate-900">
                {!user ? (
                  <SignUpButton forceRedirectUrl="/create-new-trip">
                    <button
                      suppressHydrationWarning
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-2.5 text-xs font-black text-slate-950 shadow-md"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Get Started Free
                    </button>
                  </SignUpButton>
                ) : (
                  <Link
                    href="/create-new-trip"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-2.5 text-xs font-black text-slate-950 shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Create New Trip
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

