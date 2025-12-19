"use client";

import { useStore } from "@/stores/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";

export default function NotificationToast() {
    const notification = useStore(s => s.notification);

    return (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-100 pointer-events-none">
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="bg-foreground text-background px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-border/10 backdrop-blur-xl"
                    >
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span className="text-sm font-black uppercase tracking-tighter whitespace-nowrap">
                            {notification}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
