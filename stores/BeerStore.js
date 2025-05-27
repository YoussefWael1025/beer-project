export const useBeerStore = defineStore("beerStore", {
  state: () => {
    const beerProductsPerPage = [];
    const beerProducts = [];
    const beerProductPerId = [];
    const filteredBeerData = [];
    const cart = [];
    const loading = false;
    const isGrid = true;
    const isList = false;
    const noSearch = true;
    const visible = false;
    const cartSize = 0;
    const quantity = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return {
      beerProducts,
      beerProductsPerPage,
      beerProductPerId,
      filteredBeerData,
      cart,
      loading,
      isGrid,
      isList,
      noSearch,
      visible,
      cartSize,
      quantity,
    };
  },
  actions: {
    async getProductsPerPage(pageNumber) {
      try {
        const res = await fetch(
          `https://api.openbrewerydb.org/v1/breweries?page=${pageNumber}&per_page=10`
        );

        if (!res.ok) {
          throw new Error(
            `HTTP error! missing page query! status: ${res.status}`
          );
        }
        const data = await res.json();
        this.beerProductsPerPage = data;
      } catch (error) {
        console.log("Error:", error);
      }
    },
    async getAllProducts() {
      try {
        const res = await fetch(`https://api.openbrewerydb.org/v1/breweries`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        this.beerProducts = data;
      } catch (error) {
        console.log("Error:", error);
      }
    },
    async getBeerById(beerId) {
      this.loading = true;
      try {
        if (this.beerProductPerId.id != beerId) {
          const res = await fetch(
            `https://api.openbrewerydb.org/v1/breweries?/${beerId}`
          );

          if (!res.ok) {
            throw new Error(
              `HTTP error! missing id query! status: ${res.status}`
            );
          }
          const data = await res.json();

          this.beerProductPerId = data;

          this.visible = true;

          this.loading = false;
        }
      } catch (error) {
        console.log("Error:", error);
      }
    },
    isLoading() {
      return (this.loading = true);
    },
    notLoading() {
      return (this.loading = false);
    },
    toggleViewGrid() {
      this.isGrid = true;
      this.isList = false;
    },
    toggleViewList() {
      this.isGrid = false;
      this.isList = true;
    },
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
        this.cart[index].quantity--;
        if (this.cart[index].quantity === 0) {
          this.cart.splice(index, 1);
        }
      }
    },
    updateCart() {
      this.cartSize = 0;
      this.cart.forEach((item) => {
        this.cartSize += item.quantity;
      });
      return this.cartSize;
    },
  },
});
