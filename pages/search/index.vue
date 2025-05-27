<template>
	<div class="flex flex-col">
		<section>
			<h1 class="text-center font-bold text-3xl m-4 p-4">Bierfinder</h1>
			<div class="flex my-4">
				<div class="ml-auto mr-auto flex items-center w-fit relative">
					<i class="absolute left-3 pi pi-search text-gray-500" />
					<inputText
						v-model="searchInput"
						@input="debounced"
						class="px-10 py-3"
						placeholder="Search"
					/>
				</div>
			</div>
		</section>
		<span
			class="text-center"
			v-if="beerStore.noSearch"
		>
			<p class="m-6">Sorry, keine Biere gefunden.</p>
		</span>

		<GridListSection />

		<section>
			<div
				v-if="!beerStore.noSearch"
				class="grid gap-4 p-4 mx-14"
				:class="{
					'grid-cols-1 xl:grid-cols-6': beerStore.isGrid,
					'grid-cols-1': beerStore.isList,
				}"
			>
				<div
					v-for="beer in beerStore.filteredBeerData"
					class="p-12 bg-white shadow-lg rounded-lg product flex hover:cursor-pointer"
					:class="{ 'flex-col': !beerStore.isList }"
					:id="beer.id"
					@click="beerStore.getBeerById(beer.id)"
				>
					<img
						src="https://education-team-2020.s3.eu-west-1.amazonaws.com/api_assets/ironbeers/buzz.webp"
						:alt="beer.name"
						class="h-52 object-contain"
						:class="{ 'w-fit': beerStore.isList, 'mr-2': beerStore.isList }"
					/>
					<h3
						class="text-xl font-extrabold mt-2 overflow-hidden text-ellipsis whitespace-nowrap"
						:class="{ 'text-center': !beerStore.isList }"
					>
						{{ beer.name }}
					</h3>
					<Button
						class="mt-4 h-fit"
						:id="beer.id"
						@click="cartStore.addToCart(beer.id, beer.name, $event)"
						label="Add To Cart"
						rounded
					/>
				</div>
			</div>
		</section>

		<Dialog
			v-model:visible="beerStore.visible"
			v-if="beerStore.beerProductPerId[0]"
			modal
			:dismissableMask="true"
			:pt="{ mask: { style: 'background-color: rgba(169, 169, 169, 0.5)' } }"
			class="w-5/6 lg:w-1/3 shadow-lg p-4 bg-white rounded-md"
		>
			<template #container>
				<div>
					<div class="self-center">
						<p class="absolute top-4 left-4 p-2">
							{{ beerStore.beerProductPerId[0].name }}
						</p>
						<i
							class="pi pi-times absolute top-7 right-4 hover:cursor-pointer"
							@click="beerStore.visible = false"
						></i>
					</div>
					<figure class="self-center mt-12 p-4">
						<img
							src="https://education-team-2020.s3.eu-west-1.amazonaws.com/api_assets/ironbeers/buzz.webp"
							class="object-contain w-14 mx-auto"
							:alt="beerStore.beerProductPerId[0].name"
						/>
						<figcaption class="text-center p-2 italic">
							{{ beerStore.beerProductPerId[0].tagline }}
						</figcaption>
					</figure>
					<div class="grid grid-cols-2 gap-4 p-4">
						<p>Beschreibung</p>
						<p>
							{{
								beerStore.beerProductPerId[0].description ?? "some description"
							}}
						</p>
						<p>Volumen:</p>
						<p>{{ beerStore.beerProductPerId[0].volume?.value ?? 15 }}</p>
						<p>Inhalt:</p>
						<p>
							{{ beerStore.beerProductPerId[0].volume?.value ?? 10 }}
							{{ beerStore.beerProductPerId[0].volume?.unit ?? "ml" }}
						</p>
						<p>Passt zu folgenden Speisen</p>
						<ul
							v-if="
								beerStore.beerProductPerId.length &&
								beerStore.beerProductPerId[0].food_pairing
							"
						>
							<li
								v-for="foodPair in beerStore.beerProductPerId[0].food_pairing"
							>
								{{ foodPair }}
							</li>
						</ul>
						<p v-else>Keine Speisen gefunden</p>
					</div>
				</div>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
	import debounce from "lodash/debounce";

	// Store access

	const beerStore = useBeerStore();

	const cartStore = useCartStore();

	// Global Variables

	const searchInput = ref("");

	// Setting visible to false to override any other value

	beerStore.visible = false;

	// debounce search function

	const debounced = debounce(search, 750);

	// Get Beer Product Data

	await beerStore.getAllProducts();

	// Initializing noSearch to true to override any other value

	beerStore.noSearch = true;

	// Filters beerData based on search Input
	// If valid search input => output filtered beer Products
	// If no valid search input => output search not found

	function search() {
		beerStore.filteredBeerData = beerStore.beerProducts.filter((beer) =>
			beer.name.toLowerCase().includes(searchInput.value.toLowerCase())
		);
		beerStore.noSearch = beerStore.filteredBeerData.length === 0 ? true : false;

		if (searchInput.value.length === 0) {
			beerStore.noSearch = true;
		}
	}
</script>
