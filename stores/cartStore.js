export const createCartStore = (set, get) => ({
    cart: [],
    notification: null,

    addToCart: (product) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            const newCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            set({ cart: newCart, notification: `${product.title} quantity increased!` });
        } else {
            set({ cart: [...cart, { ...product, quantity: 1 }], notification: `${product.title} added to cart!` });
        }

        // Clear notification after 3 seconds
        setTimeout(() => {
            set({ notification: null });
        }, 3000);
    },

    removeFromCart: (productId) => {
        const { cart } = get();
        const product = cart.find(p => p.id === productId);
        set({
            cart: cart.filter(item => item.id !== productId),
            notification: product ? `${product.title} removed from cart.` : null
        });
        setTimeout(() => set({ notification: null }), 3000);
    },

    increaseQuantity: (productId) => {
        const { cart } = get();
        const newCart = cart.map(item =>
            item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        set({ cart: newCart });
    },

    decreaseQuantity: (productId) => {
        const { cart } = get();
        const item = cart.find(i => i.id === productId);

        if (!item) return;

        if (item.quantity > 1) {
            const newCart = cart.map(i =>
                i.id === productId
                    ? { ...i, quantity: i.quantity - 1 }
                    : i
            );
            set({ cart: newCart });
        } else {
            const newCart = cart.filter(i => i.id !== productId);
            set({ cart: newCart, notification: `${item.title} removed from cart.` });
            setTimeout(() => set({ notification: null }), 3000);
        }
    },

    clearCart: () => {
        set({ cart: [], notification: "Cart cleared." });
        setTimeout(() => set({ notification: null }), 3000);
    },
});