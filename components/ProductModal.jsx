"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star, ShieldCheck, Truck, RefreshCcw, Box, Scale, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useStore } from "@/stores/useStore";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

export default function ProductModal({ product, isOpen, onClose }) {
    const addToCart = useStore(s => s.addToCart);

    if (!product) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-transparent shadow-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="relative w-full bg-card border border-border/50 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                >
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 aspect-square relative bg-muted p-8 flex items-center justify-center">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={product.thumbnail}
                                alt={product.title}
                                fill
                                className="object-contain"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </motion.div>

                        {/* Category Badge */}
                        <div className="absolute bottom-6 left-6 px-4 py-1.5 bg-background/80 backdrop-blur-md border border-border/50 rounded-full text-xs font-bold uppercase tracking-wider text-primary">
                            {product.category.replace(/-/g, ' ')}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        {product.rating}
                                    </div>
                                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">120+ Verfied Reviews</span>
                                </div>
                                <DialogHeader className="p-0 text-left">
                                    <DialogTitle className="text-4xl font-black tracking-tighter leading-none mb-2 uppercase italic">{product.title}</DialogTitle>
                                    <DialogDescription className="text-sm font-bold text-primary flex items-center gap-2 mb-4">
                                        <Box className="w-4 h-4" />
                                        Brand: {product.brand || "Premium Selection"}
                                    </DialogDescription>
                                </DialogHeader>
                                <p className="text-4xl font-black text-primary tracking-tighter italic">${product.price}</p>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-4"
                            >
                                <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                                    {product.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 py-6 border-y border-border/50">
                                    <div className="flex items-center gap-3">
                                        <Scale className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none">Weight</p>
                                            <p className="text-sm font-black">{product.weight}kg</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Ruler className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none">Dimensions</p>
                                            <p className="text-sm font-black">{product.dimensions?.width}x{product.dimensions?.height}cm</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 pt-4">
                                    <div className="flex items-center gap-3 text-sm font-bold text-foreground/80">
                                        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                            <Truck className="w-5 h-5" />
                                        </div>
                                        Free Express Shipping
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-bold text-foreground/80">
                                        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        Lifetime Quality Guarantee
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-bold text-foreground/80">
                                        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                            <RefreshCcw className="w-5 h-5" />
                                        </div>
                                        Hassle-Free Returns
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="pt-4 space-y-4"
                            >
                                <Button
                                    size="lg"
                                    className="w-full h-16 rounded-[1.5rem] text-xl font-black shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all gap-3 uppercase italic"
                                    onClick={() => {
                                        addToCart(product);
                                        onClose();
                                    }}
                                >
                                    <ShoppingCart className="w-6 h-6" />
                                    Secure My Order
                                </Button>
                                <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">
                                    <ShieldCheck className="w-3 h-3" />
                                    Verified Secure Transaction
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
