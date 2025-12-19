"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "./themeToggle";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "@/stores/useStore";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const cart = useStore(s => s.cart);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const cartCount = mounted ? cart.reduce((a, b) => a + b.quantity, 0) : 0;

    const Links = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Cart", href: "/cart" },
    ];

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-18 px-6 bg-background/80 border-b border-border/40 backdrop-blur-xl flex justify-between items-center fixed top-0 left-0 z-50 opacity-85"
        >
            {/* Brand Logo */}
            <Link href="/">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex items-center gap-2 group cursor-pointer"
                >
                    <div className="w-9 h-9 bg-primary flex items-center justify-center rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-300">
                        <ShoppingBag className="text-primary-foreground h-5 w-5" />
                    </div>
                    <h1 className="text-foreground font-bold text-2xl tracking-tight">
                        Cart<span className="text-primary">ly</span>
                    </h1>
                </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
                <ul className="flex items-center gap-6">
                    {Links.map((link, index) => {
                        const isCart = link.name === "Cart";
                        return (
                            <Link href={link.href} key={index}>
                                <motion.li
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                                    className="text-muted-foreground hover:text-foreground font-medium transition-colors relative group py-2 flex items-center gap-1.5"
                                >
                                    {link.name}
                                    {isCart && mounted && cartCount > 0 && (
                                        <span className="bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                            {cartCount}
                                        </span>
                                    )}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                                </motion.li>
                            </Link>
                        );
                    })}
                </ul>

                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 1.8 }} className="flex items-center gap-3 pl-6 border-l border-border/50">
                    <ThemeToggle />
                </motion.div>
            </nav>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-4">
                <ThemeToggle />
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-foreground focus:outline-none"
                    aria-label="Toggle Navigation"
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.div>
                </button>
            </div>

            {/* Mobile Menu (Overlay) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-18 left-0 w-full bg-background border-b border-border flex flex-col md:hidden overflow-hidden shadow-2xl"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {Links.map((link, index) => {
                                const isCart = link.name === "Cart";
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 + index * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-xl font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-3 py-2 border-b border-border/10 last:border-0"
                                        >
                                            {link.name}
                                            {isCart && mounted && cartCount > 0 && (
                                                <span className="bg-primary text-primary-foreground text-[12px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                                                    {cartCount}
                                                </span>
                                            )}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}