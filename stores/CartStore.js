export const useCartStore = defineStore("cartStore", {
  state: () => {
    const cart = [];
    const cartSize = 0;
    const quantity = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return { cart, cartSize, quantity };
  },
  actions: {
    addToCart(beerId, beerName, event) {
      event.stopPropagation();
      const existingProduct = this.cart.find((beer) => beer.id === beerId);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push({ id: beerId, name: beerName, quantity: 1 });
      }
    },
    deleteFromCart(beerId, event) {
      event.stopPropagation();
      const index = this.cart.findIndex((beer) => beer.id === beerId);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
    updateCart() {
      let total = 0
      this.cart.forEach((item) => {
        total += item.quantity;
      });
      return this.cartSize = total;
    },
  },
});