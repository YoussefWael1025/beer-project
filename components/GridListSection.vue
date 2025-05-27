<template>
  <section
    v-if="!beerStore.noSearch"
    class="relative w-11/12 mx-auto rounded-md h-20 bg-zinc-100 flex items-center"
  >
    <div
      class="flex border-2 border-solid rounded-lg w-fit absolute right-8 overflow-hidden"
    >
      <NuxtLink @click="beerStore.toggleViewList"
        ><i
          class="pi pi-bars p-3 hover:cursor-pointer"
          :class="{
            'bg-blue-700': beerStore.isList,
            'bg-white': beerStore.isGrid,
          }"
        ></i
      ></NuxtLink>
      <NuxtLink @click="beerStore.toggleViewGrid"
        ><i
          class="pi pi-th-large p-3 hover:cursor-pointer"
          :class="{
            'bg-blue-700': beerStore.isGrid,
            'bg-white': beerStore.isList,
          }"
        ></i
      ></NuxtLink>
    </div>
  </section>
</template>

<script setup>
//initialize our Store
const beerStore = useBeerStore();
</script>
