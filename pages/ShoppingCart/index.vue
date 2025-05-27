<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <section v-if="cartStore.cartSize" class="flex flex-col mt-12">
      <div class="grid grid-cols-3 gap-4 p-4 justify-items-center">
        <p>Description</p>
        <p>Quantity</p>
        <p>Remove</p>
      </div>
      <div v-for="beer in cartStore.cart">
        <div
          v-if="beer.quantity"
          class="grid grid-cols-3 gap-4 px-4 py-8 justify-items-center items-center border-t-2"
        >
          <p>{{ beer.name }}</p>
          <Dropdown
            v-if="beer.quantity"
            v-model="beer.quantity"
            :options="cartStore.quantity"
            :placeholder="beer.quantity + ''"
            class="w-fit"
          />
          <Button @click="cartStore.deleteFromCart(beer.id, $event)"
            >Delete</Button
          >
        </div>
      </div>
    </section>

    <section v-if="cartStore.cartSize" class="flex">
      <Button class="flex mx-auto my-4"
        ><nuxt-link to="/products">Continue Shopping</nuxt-link></Button
      >
      <Button class="flex mx-auto my-4"
        ><nuxt-link to="/checkout">Proceed To Checkout</nuxt-link></Button
      >
    </section>
    <EmptyCart />
    <Footer />
  </div>
</template>

<script setup>
const cartStore = useCartStore();
</script>
