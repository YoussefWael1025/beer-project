<template>
	<header class="shadow-sm bg-sky-700">
		<nav class="mx-auto p-4 text-center">
			<NuxtLink
				to="/"
				class="font-bold text-white"
				>Frontend Starter - Beer API</NuxtLink
			>
			<NuxtLink
				v-if="!rootRoute"
				class="hover:cursor-pointer"
				@click="visible = true"
			>
				<client-only>
					<i
						class="pi pi-cart-plus text-xl text-slate-200 absolute top-3 left-3 p-2"
						>{{ " " + cartStore.updateCart() }}
					</i>
				</client-only>
			</NuxtLink>
			<NuxtLink to="/search">
				<i class="pi pi-search text-white text-xl absolute top-4 right-5"></i>
			</NuxtLink>
		</nav>
	</header>
	<Sidebar
		v-model:visible="visible"
		class="w-128"
	>
		<template #header>
			<h1 class="p-4 mr-12 text-center">Deine Produkte</h1>
		</template>
		<hr />
		<section class="p-4 m-4">
			<p v-if="!cartStore.cartSize">Deine Kart ist Leer...</p>
			<Cart />
		</section>
		<Button
			v-if="cartStore.cartSize"
			class="p-4 mt-4 flex mx-auto"
		>
			<nuxt-link to="/ShoppingCart">Proceed To Checkout</nuxt-link>
		</Button>
	</Sidebar>
</template>

<script setup>
	const cartStore = useCartStore();
	const visible = ref(false);
	const route = useRoute();
	const rootRoute = computed(() => route.path === "/");

	const cartSize = computed(() => {
		if (process.client) {
			if (localStorage.getItem("cartStore")) {
				cartStore.$state.value = JSON.parse(localStorage.getItem("cartStore"));
			}
			return JSON.parse(localStorage.getItem("cartStore")).cartSize;
		}
	});
</script>
