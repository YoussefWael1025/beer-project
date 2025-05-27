<template>
	<div class="flex flex-col">
		<section class="text-center m-4">
			<h1 class="text-3xl font-bold p-4">Unsere Biere</h1>
		</section>

		<GridListSection class="hidden xl:flex" />

		<BeerCard
			@beer-id="getBeerId"
			@click="showDialog"
		/>
		<Dialog
			v-model:visible="visible"
			v-if="beerStore.beerProductPerId[0]"
			modal
			:dismissableMask="true"
			:pt="{
				mask: {
					style: 'background-color: rgba(169, 169, 169, 0.5)',
				},
			}"
			class="w-5/6 lg:w-1/3 shadow-lg p-4 bg-white rounded-md"
		>
			<template #container>
				<div v-if="!beerStore.loading">
					<div class="self-center">
						<p class="absolute top-4 left-4 p-2">
							{{ beerStore.beerProductPerId[0].name }}
						</p>
						<i
							class="pi pi-times absolute top-7 right-4 hover:cursor-pointer"
							@click="hideDialog"
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

				<div v-if="beerStore.loading">
					<Skeleton
						width="10rem"
						class="mb-4 mt-2"
					></Skeleton>
					<i
						class="pi pi-times absolute top-4 right-4 hover:cursor-pointer"
						@click="visible = false"
					></i>
					<div class="mt-2 pt-4">
						<Skeleton class="mb-2"></Skeleton>
						<Skeleton
							width="10rem"
							class="mb-2"
						></Skeleton>
						<Skeleton
							width="5rem"
							class="mb-2"
						></Skeleton>
						<Skeleton
							height="2rem"
							class="mb-2"
						></Skeleton>
						<Skeleton
							width="10rem"
							height="4rem"
						></Skeleton>
					</div>
				</div>
			</template>
		</Dialog>
		<Paginator
			v-model:first="first"
			:rows="1"
			:totalRecords="3"
			template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
			class="fixed w-full bottom-[56px]"
		/>
	</div>
</template>

<script setup>
	// Store access

	const beerStore = useBeerStore();
	const cartStore = useCartStore();
	// initializing noSearch to false to override any other value

	beerStore.noSearch = false;

	// Global variables

	const visible = ref(false);

	const beerData = ref(beerStore.beerProductPerId);

	const first = ref(0);

	// Allows access of "first" a deep child component

	provide("first", first);

	// Triggers loading skeleton and call beerStore to fetch our beerData

	const getBeerId = async (beerId) => {
		beerStore.isLoading();

		await beerStore.getBeerById(beerId);

		beerData.value = beerStore.beerProductPerId;

		beerStore.notLoading();
	};

	// Triggers Dialog to Show

	function showDialog() {
		visible.value = true;
	}

	// Triggers Dialog to Show

	function hideDialog() {
		visible.value = false;
	}
</script>
