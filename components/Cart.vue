<template>
  <div
    class="flex flex-row justify-between mt-2"
    v-if="cartStore.cartSize"
    v-for="beer in cartStore.cart"
  >
    <h1
      v-if="beer.quantity"
      class="text-ellipsis whitespace-nowrap overflow-hidden mr-4"
    >
      - {{ beer.name }}
    </h1>
    <Dropdown
      v-if="beer.quantity"
      v-model="beer.quantity"
      :options="cartStore.quantity"
      :placeholder="beer.quantity + ''"
      class="w-fit"
    />
    <hr />
  </div>
</template>

<script setup>
const cartStore = useCartStore();
</script>
