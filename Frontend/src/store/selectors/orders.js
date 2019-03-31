export const getCartItems = store => {
    const cartItems = store.cart;
    const products = store.products;
    return cartItems.map(({ id, size, color }) => {
        const product = products.find(
            ({ name: currentName }) => currentName === id
        );
        return { ...product, size, color };
    });
};
