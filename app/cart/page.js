"use client";

import { useStore } from "@/stores/useStore";
import CartCard from "@/components/CartCard";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight, Trash2, ArrowLeft, CheckCircle2, CreditCard, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function CartPage() {
    const cart = useStore(s => s.cart);
    const clearCart = useStore(s => s.clearCart);
    const [isClient, setIsClient] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleCheckout = () => {
        setIsCheckingOut(true);
        // Simulate API call
        setTimeout(() => {
            setIsCheckingOut(false);
            setIsSuccess(true);
            setTimeout(() => {
                clearCart();
            }, 500);
        }, 2000);
    };

    if (!isClient) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
                />
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="container mx-auto px-6 pt-32 min-h-screen flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-green-500/10 p-10 rounded-full mb-8 relative"
                >
                    <CheckCircle2 className="w-20 h-20 text-green-500" />
                    <motion.div
                        className="absolute inset-0 border-4 border-green-500 rounded-full"
                        initial={{ scale: 0.8, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                </motion.div>
                <h1 className="text-4xl font-black mb-4">Order Confirmed!</h1>
                <p className="text-muted-foreground mb-12 max-w-md text-lg">
                    Thank you for your purchase. We've sent a confirmation email and will notify you when your items ship.
                </p>
                <Link href="/products">
                    <Button size="lg" className="rounded-full px-10 h-14 bg-green-600 hover:bg-green-700 shadow-xl shadow-green-500/20">
                        Continue Shopping
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </Link>
            </div>
        );
    }

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 100 || cart.length === 0 ? 0 : 10;
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-6 py-20 pt-32 min-h-screen flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-muted/50 p-10 rounded-full mb-8"
                >
                    <ShoppingBag className="w-16 h-16 text-muted-foreground" />
                </motion.div>
                <h1 className="text-4xl font-black mb-4">Your cart is empty</h1>
                <p className="text-muted-foreground mb-10 max-w-sm text-lg leading-relaxed">
                    Looks like you haven't added anything yet. Quality products are waiting for you!
                </p>
                <Link href="/products">
                    <Button size="lg" className="rounded-2xl px-10 h-14 shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all text-lg font-bold">
                        Start Shopping
                        <ArrowRight className="ml-3 w-5 h-5" />
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-10 pt-32 min-h-screen mb-20">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
                >
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase">
                            <Sparkles className="w-4 h-4" />
                            Premium Checkout
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-foreground">My Cart</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <p className="text-muted-foreground font-medium">
                            {cart.reduce((a, b) => a + b.quantity, 0)} Items
                        </p>
                        <div className="h-4 w-px bg-border/50" />
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors font-bold uppercase tracking-tighter text-xs"
                            onClick={clearCart}
                        >
                            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                            Clear All
                        </Button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-7 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <CartCard product={item} />
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <div className="pt-8 flex justify-center lg:justify-start">
                            <Link href="/products">
                                <Button variant="link" className="text-muted-foreground hover:text-primary transition-colors gap-2 text-lg font-bold">
                                    <ArrowLeft className="w-5 h-5" />
                                    Browse more products
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="sticky top-32 bg-card border border-border/50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-primary/5"
                        >
                            <h2 className="text-2xl font-black mb-8">Summary</h2>

                            <div className="space-y-5 mb-8">
                                <div className="flex justify-between text-muted-foreground font-semibold text-lg">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground font-semibold text-lg">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="h-px bg-border/50 my-6" />
                                <div className="flex justify-between text-3xl font-black">
                                    <span>Total</span>
                                    <span className="text-primary">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Button
                                    className="w-full h-16 rounded-2xl text-xl font-black shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all gap-3"
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                >
                                    {isCheckingOut ? (
                                        <>
                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><CreditCard className="w-6 h-6" /></motion.div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Checkout Now
                                            <ArrowRight className="w-6 h-6" />
                                        </>
                                    )}
                                </Button>

                                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-bold uppercase tracking-widest py-2">
                                    <Lock className="w-3 h-3" />
                                    Secure SSL Encryption
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-border/50">
                                <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                                    By clicking Checkout, you agree to our Terms of Service. VAT and local taxes included where applicable.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
