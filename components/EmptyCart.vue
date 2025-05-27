<template>
  <section
    v-if="!cartStore.cartSize"
    class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-8 flex flex-col justify-items-center items-center border-2 bg-slate-100"
  >
    <img
      class="rounded-full w-32 object-contain"
      src="/img/emptyBeer.png"
      alt="beer"
    />
    <p>Your cart is empty :(</p>
    <Button class="flex mx-auto my-4"
      ><nuxt-link to="/products">Continue Shopping</nuxt-link></Button
    >
  </section>
</template>
<script setup>
const cartStore = useCartStore();
</script>
