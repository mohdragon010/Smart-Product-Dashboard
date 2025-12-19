"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useStore } from "@/stores/useStore";

export default function CartCard({ product }) {
    const increaseQuantity = useStore((s) => s.increaseQuantity);
    const decreaseQuantity = useStore((s) => s.decreaseQuantity);
    const removeFromCart = useStore((s) => s.removeFromCart);

    return (
        <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 group rounded-3xl">
            <CardContent className="p-5 flex gap-5 items-center">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-muted border border-border/50">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="112px"
                    />
                </div>

                <div className="flex flex-1 flex-col justify-between h-28 py-1">
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <h3 className="font-bold text-lg md:text-xl line-clamp-1 text-foreground tracking-tight">{product.title}</h3>
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mt-0.5">{product.category.replace(/-/g, ' ')}</p>
                        </div>
                        <p className="font-black text-xl text-primary">${(product.price * product.quantity).toFixed(2)}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-secondary/80 rounded-2xl p-1 border border-border/50">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-xl hover:bg-background shadow-sm transition-all"
                                onClick={() => decreaseQuantity(product.id)}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center text-sm font-black">{product.quantity}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-xl hover:bg-background shadow-sm transition-all"
                                onClick={() => increaseQuantity(product.id)}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors rounded-xl"
                            onClick={() => removeFromCart(product.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
