"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    },[]);
    if(!mounted) return null;


    const isDark = theme === "dark" || (theme === "system" && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-accent/50 transition-colors duration-200 border border-border shadow-sm"
            aria-label="Toggle theme"
        >
                <motion.div
                    key={isDark ? "dark" : "light"}
                    initial={{ y: 10, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -10, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    {isDark ? (
                        <Sun className="h-5 w-5 text-yellow-500 fill-yellow-500/20" />
                    ) : (
                        <Moon className="h-5 w-5 text-blue-600 fill-blue-600/10" />
                    )}
                </motion.div>
        </motion.button>
    )
}

