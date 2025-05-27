<template>
	<div
		class="grid gap-4 p-4 mx-14"
		:class="{
			'grid-cols-1 xl:grid-cols-6': beerStore.isGrid,
			'grid-cols-1 min-w-[30%] mb-32 self-center': beerStore.isList,
		}"
	>
		<div
			v-for="beer in beerData"
			class="p-12 bg-white shadow-lg rounded-lg product flex hover:cursor-pointer"
			:class="{
				'flex-col': beerStore.isGrid,
				'flex-col xl:flex-row gap-8': beerStore.isList,
			}"
			:id="beer.id"
			@click="getBeerId(beer.id)"
		>
			<img
				src="https://education-team-2020.s3.eu-west-1.amazonaws.com/api_assets/ironbeers/buzz.webp"
				:alt="beer.name"
				class="h-52 object-contain"
				:class="{
					'xl:w-fit w-full': beerStore.isList,
					'mr-2': beerStore.isList,
				}"
			/>
			<div
				class="flex flex-col justify-between"
				:class="{ 'w-[24rem]': beerStore.isList }"
			>
				<h3
					class="text-xl text-center font-extrabold mt-2 overflow-hidden text-ellipsis whitespace-nowrap"
					:class="{ 'text-center': beerStore.isGrid }"
				>
					{{ beer.name }}
				</h3>
				<Button
					class="mt-4 h-fit"
					:class="{ 'w-48 self-center': beerStore.isList }"
					@click="cartStore.addToCart(beer.id, beer.name, $event)"
					label="Add To Cart"
					rounded
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
	//Store access

	const beerStore = useBeerStore();

	const cartStore = useCartStore();

	//defining emits

	const emit = defineEmits(["beer-id"]);

	//Global variables

	const beerData = ref(null);

	const first = inject("first");

	//intiallizing first page beer Products

	await beerStore.getProductsPerPage(first.value + 1);

	beerData.value = beerStore.beerProductsPerPage;

	//Watches for changes in the variable "first" from the parent component
	//On variable change, refetch with the new page number

	watch(first, async (newPage) => {
		await beerStore.getProductsPerPage(newPage + 1);
		beerData.value = beerStore.beerProductsPerPage;
	});

	//Emit beerId to parent component

	const getBeerId = (beerId) => {
		emit("beer-id", beerId);
	};
</script>
