"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShoppingBasket, ShieldCheck, Sparkles, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-32 pb-20 px-6">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/4" />

      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start gap-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              The Future of E-Commerce
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-foreground italic uppercase">
              Shop <span className="text-primary not-italic">Smarter</span>. <br />
              <span className="opacity-50">Live</span> Better.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Experience the next generation of online shopping. Blazing fast, intuitively designed, and built for your portfolio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
              <Link href="/products">
                <Button size="lg" className="rounded-2xl px-10 h-16 text-lg font-black group shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all w-full sm:w-auto">
                  Start Exploring
                  <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-2xl px-10 h-16 text-lg font-bold border-2 w-full sm:w-auto hover:bg-muted/50">
                How it Works
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-6 border-t border-border/50 w-full mt-8">
              <div>
                <p className="text-3xl font-black text-foreground">1M+</p>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Happy Users</p>
              </div>
              <div>
                <p className="text-3xl font-black text-foreground">50K+</p>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Products</p>
              </div>
              <div>
                <p className="text-3xl font-black text-foreground">24/7</p>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Award Winning Support</p>
              </div>
              <div>
                <p className="text-3xl font-black text-foreground">99.9%</p>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Satisfaction Rate</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square w-full max-w-xl mx-auto">
              {/* Glass Card 1 */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 z-20 w-64 p-6 rounded-3xl bg-card/40 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white">
                    <ShoppingBasket className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-bold">Latest Order</p>
                    <p className="text-sm font-black italic">iPhone 15 Pro</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-border/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 2, delay: 1 }}
                    className="h-full bg-orange-500"
                  />
                </div>
              </motion.div>

              {/* Glass Card 2 */}
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-0 z-20 w-56 p-6 rounded-3xl bg-primary/20 backdrop-blur-3xl border border-primary/20 shadow-2xl flex flex-col items-center gap-2 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white mb-2 shadow-lg shadow-primary/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <p className="text-sm font-black italic">100% Secure Checkout</p>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none">Verified Merchant</p>
              </motion.div>

              {/* Main Background Circle */}
              <div className="absolute inset-0 bg-primary/30 rounded-[3rem] rotate-6 scale-95 opacity-20" />
              <div className="absolute inset-0 bg-blue-500/20 rounded-[3rem] -rotate-3 scale-100 opacity-20" />

              {/* Main Content Area */}
              <div className="absolute inset-0 rounded-[3rem] overflow-hidden bg-card border border-border/50 shadow-inner p-4">
                <div className="w-full h-full bg-muted rounded-[2.5rem] flex items-center justify-center relative group">
                  <Zap className="w-32 h-32 text-primary opacity-10 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-linear-to-br from-transparent to-primary/5 transition-opacity duration-700" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Features Floating Section */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Zap className="w-6 h-6" />, title: "Instant Search", desc: "Our lightning fast algorithm finds any product in milliseconds." },
            { icon: <Globe className="w-6 h-6" />, title: "Global Reach", desc: "Shipping to over 140 countries with real-time tracking." },
            { icon: <ShieldCheck className="w-6 h-6" />, title: "Privacy First", desc: "Your data is encrypted and never sold. Standard security." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2rem] bg-card border border-border/50 shadow-xl flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black italic">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
