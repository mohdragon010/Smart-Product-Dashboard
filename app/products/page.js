"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Loader2, ChevronDown, Filter, ArrowUpDown, SearchX, Eye, DollarSign, X } from "lucide-react";
import { useStore } from "@/stores/useStore"
import { Input } from "@/components/ui/input";
import ProductModal from "@/components/ProductModal";
import { Slider } from "@/components/ui/slider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Products() {
    const products = useStore(s => s.filteredProducts);
    const totalLoaded = useStore(s => s.products.length);
    const skip = useStore(s => s.skip);
    const setSkip = useStore(s => s.setSkip);
    const loading = useStore(s => s.loading);
    const isLoadingMore = useStore(s => s.isLoadingMore);
    const limit = useStore(s => s.limit);
    const fetchProducts = useStore(s => s.fetchProducts);
    const search = useStore(s => s.search);
    const setSearch = useStore(s => s.setSearch);
    const category = useStore(s => s.category);
    const setCategory = useStore(s => s.setCategory);
    const sortConfig = useStore(s => s.sortConfig);
    const setSort = useStore(s => s.setSort);
    const priceRange = useStore(s => s.priceRange);
    const setPriceRange = useStore(s => s.setPriceRange);
    const addToCart = useStore(s => s.addToCart);

    const isFiltered = search !== "" || category !== "all" || priceRange[0] !== 0 || priceRange[1] !== 2000;

    const resetFilters = () => {
        setSearch("");
        setCategory("all");
        setPriceRange([0, 2000]);
    };

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleQuickView = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const categories = [
        "beauty",
        "fragrances",
        "furniture",
        "groceries",
        "home-decoration",
        "kitchen-accessories",
        "laptops",
        "lighting",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "mobile-accessories",
        "motorcycle",
        "skin-care",
        "smartphones",
        "sports-accessories",
        "sunglasses",
        "tablets",
        "tops",
        "vehicle",
        "womens-bags",
        "womens-dresses",
        "womens-jewellery",
        "womens-shoes",
        "womens-watches"
    ]

    const sortOptions = [
        { key: null, order: "asc", label: "Default" },
        { key: "price", order: "asc", label: "Price: Low to High" },
        { key: "price", order: "desc", label: "Price: High to Low" },
        { key: "rating", order: "desc", label: "Top Rated" },
        { key: "title", order: "asc", label: "Name: A-Z" },
        { key: "title", order: "desc", label: "Name: Z-A" },
    ];

    useEffect(() => {
        const isFiltering = search !== "" || category !== "all";
        const timer = setTimeout(() => {
            fetchProducts();
        }, isFiltering || search ? 400 : 0);

        return () => clearTimeout(timer);
    }, [skip, search, category, fetchProducts]);

    if (loading && totalLoaded === 0) {
        return (
            <div className="container mx-auto px-6 py-10 pt-24 min-h-screen">
                <div className="flex flex-col gap-8">
                    <Skeleton className="h-10 w-48 mb-4 mx-auto md:mx-0" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <Card key={i} className="overflow-hidden border-border/50">
                                <Skeleton className="aspect-square w-full" />
                                <CardHeader className="p-4">
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-full" />
                                </CardHeader>
                                <CardFooter className="p-4 mt-auto">
                                    <Skeleton className="h-9 w-full rounded-md" />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-10 pt-24 min-h-screen">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-[10px] uppercase tracking-[0.2em]">
                            Premium Collection 2024
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.8] uppercase italic">
                            Featured <br />
                            <span className="text-primary not-italic">Products</span>
                        </h1>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-right">
                        <p className="text-4xl font-black italic text-foreground tracking-tighter">
                            {products.length}<span className="text-primary italic">/</span>{totalLoaded}
                        </p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mr-1">
                            Items Loaded Successfully
                        </p>
                    </div>
                </div>

                <div className="sticky top-24 z-40 -mx-2 px-2 py-4 bg-background/80 backdrop-blur-xl border-y border-border/40 flex flex-col gap-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        <div className="relative w-full lg:flex-1 group">
                            <Input
                                placeholder="Search our database..."
                                className="w-full h-14 bg-muted/50 border-none rounded-2xl pl-12 pr-12 text-lg font-bold placeholder:text-muted-foreground/50 transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                <SearchX className="w-5 h-5" />
                            </div>
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        <div className="flex gap-3 w-full lg:w-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="h-14 px-6 rounded-2xl bg-card border border-border/50 text-foreground hover:bg-muted font-black uppercase tracking-tighter flex items-center gap-3 transition-all">
                                        <Filter className="w-4 h-4 text-primary" />
                                        {category === "all" ? "All Categories" : category.replace(/-/g, ' ')}
                                        <ChevronDown className="w-4 h-4 opacity-30" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-64 p-2 rounded-[1.5rem] border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl max-h-[400px] overflow-y-auto">
                                    <DropdownMenuItem onClick={() => setCategory("all")} className="rounded-xl font-bold uppercase tracking-tighter py-3 px-4">
                                        Show Everything
                                    </DropdownMenuItem>
                                    <div className="h-px bg-border/50 my-2" />
                                    {categories.map((cat) => (
                                        <DropdownMenuItem
                                            key={cat}
                                            onClick={() => setCategory(cat)}
                                            className="rounded-xl font-bold uppercase tracking-tighter py-3 px-4"
                                        >
                                            {cat.replace(/-/g, ' ')}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="h-14 px-6 rounded-2xl bg-card border border-border/50 text-foreground hover:bg-muted font-black uppercase tracking-tighter flex items-center gap-3 transition-all">
                                        <ArrowUpDown className="w-4 h-4 text-primary" />
                                        {sortConfig.label}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-64 p-2 rounded-[1.5rem] border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl">
                                    {sortOptions.map((option) => (
                                        <DropdownMenuItem
                                            key={`${option.key}-${option.order}`}
                                            onClick={() => setSort(option)}
                                            className="rounded-xl font-bold uppercase tracking-tighter py-3 px-4"
                                        >
                                            {option.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {isFiltered && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-14 w-14 rounded-2xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all"
                                    onClick={resetFilters}
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-6 px-4 py-2">
                        <div className="flex items-center gap-4 flex-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground w-20">Price Range</span>
                            <Slider
                                value={priceRange}
                                onValueChange={setPriceRange}
                                max={2000}
                                step={10}
                                className="flex-1"
                            />
                            <div className="flex items-center gap-2 min-w-[120px] justify-end">
                                <span className="text-sm font-black italic">${priceRange[0]}</span>
                                <span className="text-muted-foreground opacity-30">—</span>
                                <span className="text-sm font-black italic">${priceRange[1]}</span>
                            </div>
                        </div>
                        {isFiltered && (
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                Filters Active
                            </div>
                        )}
                    </div>
                </div>

                {/* Products Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: (index % limit) * 0.05 }}
                            >
                                <Card className="group h-full overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-card flex flex-col">
                                    <div className="relative aspect-4/5 overflow-hidden bg-muted">
                                        <Image
                                            src={product.thumbnail}
                                            alt={product.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        />

                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="rounded-full h-11 w-11 shadow-xl hover:scale-110 transition-transform"
                                                onClick={() => handleQuickView(product)}
                                            >
                                                <Eye className="w-5 h-5 text-primary" />
                                            </Button>
                                        </div>

                                        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm border border-border/50">
                                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                            {product.rating}
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col cursor-pointer" onClick={() => handleQuickView(product)}>
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <h3 className="font-bold text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                                                {product.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                                            {product.description}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="text-2xl font-black">${product.price}</span>
                                            <Button
                                                size="sm"
                                                className="rounded-xl font-bold px-4"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart(product);
                                                }}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                ) : !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 px-4 text-center bg-muted/30 rounded-3xl border border-dashed border-border/50"
                    >
                        <div className="bg-background p-6 rounded-full shadow-sm mb-6">
                            <SearchX className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">No products found</h3>
                        <p className="text-muted-foreground max-w-md mx-auto mb-8">
                            We couldn't find any products matching your search "{search}" in {category === "all" ? "all categories" : category}. Try adjusting your filters or search terms.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearch("");
                                setCategory("all");
                            }}
                        >
                            Reset All Filters
                        </Button>
                    </motion.div>
                )}


                {/* Load More Button */}
                {products.length > 0 && products.length % limit === 0 && (search === "" && category === "all") && (
                    <div className="flex justify-center mt-12 pb-10">
                        <Button
                            size="lg"
                            variant="outline"
                            className="px-10 rounded-full min-w-[220px] shadow-sm hover:border-primary transition-all duration-300"
                            onClick={() => setSkip(skip + limit)}
                            disabled={isLoadingMore}
                        >
                            {isLoadingMore ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Loading Products...
                                </>
                            ) : (
                                "Load More Products"
                            )}
                        </Button>
                    </div>
                )}
            </div>

            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}