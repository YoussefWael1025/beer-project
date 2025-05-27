<template>
  <header class="shadow-sm bg-sky-700 relative">
    <nav class="mx-auto p-4 text-center">
      <NuxtLink to="/" class="absolute top-4 left-5 text-white font-bold">
        Frontend Starter - Beer API
      </NuxtLink>
      <NuxtLink to="/checkout" class="font-bold text-white text-center"
        >Checkout</NuxtLink
      >
      <NuxtLink to="/search">
        <i class="pi pi-search text-white text-xl absolute top-4 right-5"></i>
      </NuxtLink>
    </nav>
  </header>
</template>

<script setup></script>
