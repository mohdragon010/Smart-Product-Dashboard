export const useProductsStore = (set, get) => {
    const applyFiltersAndSort = (products, search, category, sortConfig, priceRange) => {
        // First filter
        let filtered = products.filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = category === "all" || p.category === category;
            const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
            return matchesSearch && matchesCategory && matchesPrice;
        });

        // Then sort
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                let valA = a[sortConfig.key];
                let valB = b[sortConfig.key];

                if (typeof valA === 'string') {
                    valA = valA.toLowerCase();
                    valB = valB.toLowerCase();
                }

                if (valA < valB) return sortConfig.order === 'asc' ? -1 : 1;
                if (valA > valB) return sortConfig.order === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    };

    return {
        products: [],
        filteredProducts: [],
        loading: true,
        isLoadingMore: false,
        skip: 0,
        limit: 20,
        search: "",
        category: "all",
        sortConfig: { key: null, order: 'asc', label: 'Default' },
        priceRange: [0, 2000],

        setProducts: (products) => set({ products }),
        setSkip: (num) => set({ skip: num }),
        setLoading: (state) => set({ loading: state }),
        setIsLoadingMore: (state) => set({ isLoadingMore: state }),
        setLimit: (num) => set({ limit: num }),

        setSearch: (str) => {
            const { products, category, sortConfig, priceRange } = get();
            const filtered = applyFiltersAndSort(products, str, category, sortConfig, priceRange);
            set({ search: str, filteredProducts: filtered });
        },

        setCategory: (cat) => {
            const { products, search, sortConfig, priceRange } = get();
            const filtered = applyFiltersAndSort(products, search, cat, sortConfig, priceRange);
            set({ category: cat, filteredProducts: filtered });
        },

        setSort: (config) => {
            const { products, search, category, priceRange } = get();
            const filtered = applyFiltersAndSort(products, search, category, config, priceRange);
            set({ sortConfig: config, filteredProducts: filtered });
        },

        setPriceRange: (range) => {
            const { products, search, category, sortConfig } = get();
            const filtered = applyFiltersAndSort(products, search, category, sortConfig, range);
            set({ priceRange: range, filteredProducts: filtered });
        },

        fetchProducts: async () => {
            const { skip, limit, products, search, category, sortConfig, priceRange } = get();

            try {
                const noLimit = search !== "" || category !== "all" || priceRange[0] !== 0 || priceRange[1] !== 2000;

                if (skip === 0 || noLimit) {
                    set({ loading: true });
                } else {
                    set({ isLoadingMore: true });
                }

                const fetchLimit = noLimit ? 0 : limit;
                const fetchSkip = noLimit ? 0 : skip;

                const res = await fetch(`https://dummyjson.com/products?limit=${fetchLimit}&skip=${fetchSkip}`);
                const data = await res.json();

                let updatedProducts;
                if (skip === 0 || noLimit) {
                    updatedProducts = data.products;
                } else {
                    updatedProducts = [...products, ...data.products];
                }

                const filtered = applyFiltersAndSort(updatedProducts, search, category, sortConfig, priceRange);

                set({ products: updatedProducts, filteredProducts: filtered });
            } catch (err) {
                console.error("Fetch Products Error:", err);
            } finally {
                set({ loading: false, isLoadingMore: false });
            }
        }
    };
};
