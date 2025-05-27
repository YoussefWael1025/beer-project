export default defineNuxtPlugin(() => {
  const cartStore = useCartStore();
  watch(
    cartStore.$state,
    async (state) => {
      // persist the whole state to the local storage whenever it changes
      localStorage.setItem("cartStore", JSON.stringify(state));
    },
    { deep: true }
  );

    cartStore.$state = JSON.parse(localStorage.getItem("cartStore"));
});
