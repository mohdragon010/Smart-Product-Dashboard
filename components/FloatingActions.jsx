"use client";

import { useStore } from "@/stores/useStore";
import { ShoppingCart, ArrowUp } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function FloatingActions() {
    const cartCount = useStore(s => s.cart.reduce((a, b) => a + b.quantity, 0));
    const [isVisible, setIsVisible] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            if (window.scrollY > 100) {
                setIsCartVisible(true);
            } else {
                setIsCartVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0, y: 20 }}
                    >
                        <Button
                            size="icon"
                            variant="secondary"
                            className="w-14 h-14 rounded-2xl shadow-2xl bg-card border border-border/50 backdrop-blur-xl hover:bg-muted"
                            onClick={scrollToTop}
                        >
                            <ArrowUp className="w-6 h-6" />
                        </Button>
                    </motion.div>
                )}

                {isCartVisible && cartCount > 0 && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0, y: 20 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Link href="/cart">
                            <Button
                                size="icon"
                                className="w-14 h-14 rounded-2xl shadow-2xl bg-primary text-primary-foreground relative group"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                <span className="absolute -top-2 -right-2 bg-foreground text-background text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-background shadow-lg group-hover:scale-110 transition-transform">
                                    {cartCount}
                                </span>
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
