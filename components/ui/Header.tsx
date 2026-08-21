// components/ui/Header.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { FaMoon, FaSun } from "react-icons/fa";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "AI Planner", href: "/planner" },
    { name: "Packages", href: "/packages" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

export default function Header() {
    const [isDark, setIsDark] = useState(false);

    // Initialise dark mode based on system preference or existing class
    useEffect(() => {
        const darkClass = document.documentElement.classList.contains("dark");
        setIsDark(darkClass);
    }, []);

    const toggleDark = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }
        setIsDark(!isDark);
    };

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-12">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-primary dark:text-white">
                    Tripverse AI
                </Link>
                {/* Nav */}
                <nav className="hidden md:flex space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
                {/* Right side actions */}
                <div className="flex items-center space-x-4">
                    {/* Search Icon placeholder */}
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-600 dark:text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                            />
                        </svg>
                    </button>
                    {/* Login / Sign Up */}
                    <Link
                        href="/login"
                        className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition"
                    >
                        Login / Sign Up
                    </Link>
                    {/* Dark mode toggle */}
                    <button
                        onClick={toggleDark}
                        aria-label="Toggle dark mode"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
                    </button>
                </div>
            </div>
        </header>
    );
}
