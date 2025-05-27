<template>
	<div class="flex flex-col min-h-screen">
		<div class="flex flex-row flex-grow">
			<div class="basis-2/3">
				<div class="w-fit lg:mx-auto mx-6">
					<Breadcrumb
						:home="home"
						:model="items"
						:pt="{
							root: {
								class: 'flex justify-center bg-transparent border-0 mt-8',
							},
						}"
					/>
					<div class="flex flex-col p-4 mt-4">
						<h1 class="font-bold">Please verify your age</h1>
						<div class="flex flex-col align-items-center mt-4">
							<div>
								<Checkbox
									v-model="ofLegalAge"
									name="ofLegalAge"
									:binary="true"
								/>
								<label
									for="ofLegalAge"
									class="ml-2"
								>
									Are you over 18?
								</label>
							</div>
							<small class="p-error">{{ ageErrorMessage || "&nbsp;" }}</small>
						</div>
					</div>
					<div v-if="customerVaultStore.ofLegalAge">
						<div class="p-2">
							<h1 class="font-bold mb-8">Contact Information</h1>
							<div>
								<span class="p-float-label mt-4">
									<InputText
										name="email"
										v-model="email"
										class="min-w-[20rem]"
									/>
									<label for="email">Email</label>
								</span>
								<small class="p-error">{{
									emailErrorMessage || "&nbsp;"
								}}</small>
							</div>
						</div>
						<div class="p-2">
							<div>
								<h1 class="font-bold mb-8">Where's this order going?</h1>
								<div class="flex flex-row gap-3">
									<div>
										<span class="p-float-label">
											<InputText
												id="FirstName"
												v-model="firstName"
											/>
											<label for="FirstName">First name</label>
										</span>
										<small class="p-error">{{ firstNameErrorMessage }}</small>
									</div>
									<div>
										<span class="p-float-label">
											<InputText
												id="LastName"
												v-model="lastName"
											/>
											<label for="LastName">Last name</label>
										</span>
										<small class="p-error">{{ lastNameErrorMessage }}</small>
									</div>
								</div>
								<div class="flex flex-row gap-3 mt-8">
									<div>
										<span class="p-float-label">
											<InputText
												id="ZipCode"
												v-model="zipcode"
											/>
											<label for="ZipCode">Zipcode</label>
										</span>
										<small class="p-error"
											>{{ zipcodeErrorMessage || "&nbsp;" }}
										</small>
									</div>

									<div class="flex flex-col">
										<Dropdown
											v-model="selectedCity"
											class="w-[125%]"
											showClear
											:options="countryList"
											optionLabel="name"
											placeholder="Select a City"
										/>
										<small class="p-error"
											>{{ selectedCityErrorMessage || "&nbsp;" }}
										</small>
									</div>
								</div>
								<div>
									<span class="p-float-label">
										<InputText
											id="StreetAndHouseNumber"
											v-model="streetAndHouseNumber"
											class="w-full"
										/>
										<label for="StreetAndHouseNumber"
											>Street and house number</label
										>
									</span>
									<small class="p-error"
										>{{ streetAndHouseNumberErrorMessage || "&nbsp;" }}
									</small>
								</div>
								<div class="flex flex-row gap-3">
									<div>
										<span class="p-float-label mt-4">
											<InputText
												v-model="customerVaultStore.customerInfo.floor"
											/>
											<label for="floor">Apt/Floor/Suite</label>
										</span>
									</div>
									<div>
										<span class="p-float-label mt-4">
											<InputText v-model="state" />
											<label for="state">State</label>
										</span>
										<small class="p-error">{{ stateErrorMessage }} </small>
									</div>
								</div>
							</div>
							<div class="flex mt-8">
								<Button class="mx-auto"
									><nuxt-link to="/checkout/shipping"
										>Continue to Shipping</nuxt-link
									></Button
								>
							</div>
						</div>
					</div>
				</div>
			</div>
			<client-only>
				<SideVoucherBar class="basis-1/3 border-l-2" />
			</client-only>
		</div>
	</div>
</template>

<script setup>
	import * as yup from "yup";
	definePageMeta({
		layout: "custom",
	});
	const customerVaultStore = useCustomerVaultStore();
	const obj = {
		name: "emad",
		age: "24",
		school: "Th-rosenheim",
	};

	const countryList = [
		{ name: "Albania" },
		{ name: "Andorra" },
		{ name: "Austria" },
		{ name: "Belarus" },
		{ name: "Belgium" },
		{ name: "Bosnia and Herzegovina" },
		{ name: "Bulgaria" },
		{ name: "Croatia" },
		{ name: "Cyprus" },
		{ name: "Czech Republic" },
		{ name: "Denmark" },
		{ name: "Estonia" },
		{ name: "Finland" },
		{ name: "France" },
		{ name: "Germany" },
		{ name: "Greece" },
		{ name: "Hungary" },
		{ name: "Iceland" },
		{ name: "Ireland" },
		{ name: "Italy" },
		{ name: "Kosovo" },
		{ name: "Latvia" },
		{ name: "Liechtenstein" },
		{ name: "Lithuania" },
		{ name: "Luxembourg" },
		{ name: "Malta" },
		{ name: "Moldova" },
		{ name: "Monaco" },
		{ name: "Montenegro" },
		{ name: "Netherlands" },
		{ name: "North Macedonia" },
		{ name: "Norway" },
		{ name: "Poland" },
		{ name: "Portugal" },
		{ name: "Romania" },
		{ name: "Russia" },
		{ name: "San Marino" },
		{ name: "Serbia" },
		{ name: "Slovakia" },
		{ name: "Slovenia" },
		{ name: "Spain" },
		{ name: "Sweden" },
		{ name: "Switzerland" },
		{ name: "Ukraine" },
		{ name: "United Kingdom" },
		{ name: "Vatican City" },
	];

	const AddressList = [
		{ name: "PickUp Address 1" },
		{ name: "PickUp Address 2" },
		{ name: "PickUp Address 3" },
		{ name: "PickUp Address 4" },
		{ name: "PickUp Address 5" },
	];

	const home = ref({
		label: "ShoppingCart",
		route: "/ShoppingCart",
	});

	const items = ref([
		{ label: "Information", route: "ShoppingCart" },
		{ label: "Shipping" },
		{ label: "Payment" },
	]);

	const stringValidation = yup
		.string()
		.test(
			"alphabetical",
			"Only alphabetical characters are allowed",
			function (value) {
				if (value) {
					return /^[a-zA-Z]+$/.test(value);
				}
				return true;
			}
		)
		.required();

	// const schema = yup.object({
	//   ofLegalAge: yup.required("Please confirm that you are over 18."),
	//   email: yup.string().email().required(),
	//   firstName: stringValidation,
	//   lastName: stringValidation,
	//   zipcode: yup
	//     .string()
	//     .matches(/^\d{5}$/, "Please enter a 5-digit numeric code")
	//     .required("Please enter a zipcode"),
	//   selectedCity: yup.object().required("Please select a country"),
	//   state: stringValidation,
	//   streetAndHouseNumber: yup
	//     .string()
	//     .matches(
	//       /^[a-zA-Z0-9, .]*$/,
	//       "Only alphabetical characters, numbers, commas and dots are allowed"
	//     )
	//     .required("Please enter a valid street and house number"),
	// });

	const { value: ofLegalAge, errorMessage: ageErrorMessage } = useField(
		"ofLegalAge",
		(ofLegalAge) => {
			if (!ofLegalAge) {
				return "Please confirm that you are over 18.";
			}
			return true;
		}
	);

	const { value: email, errorMessage: emailErrorMessage } = useField(
		"email",
		yup.string().email().required()
	);

	const { value: firstName, errorMessage: firstNameErrorMessage } = useField(
		"firstName",
		stringValidation
	);

	const { value: lastName, errorMessage: lastNameErrorMessage } = useField(
		"lastName",
		stringValidation
	);

	const { value: zipcode, errorMessage: zipcodeErrorMessage } = useField(
		"zipcode",
		yup
			.string()
			.matches(/^\d{5}$/, "Please enter a 5-digit numeric code")
			.required("Please enter a zipcode")
	);

	const { value: selectedCity, errorMessage: selectedCityErrorMessage } =
		useField("selectedCity", yup.object().required("Please select a country"));

	const { value: state, errorMessage: stateErrorMessage } = useField(
		"state",
		stringValidation
	);

	const {
		value: streetAndHouseNumber,
		errorMessage: streetAndHouseNumberErrorMessage,
	} = useField(
		"streetAndHouseNumber",
		yup
			.string()
			.matches(
				/^[a-zA-Z0-9, .]*$/,
				"Only alphabetical characters, numbers, commas and dots are allowed"
			)
			.required("Please enter a valid street and house number")
	);

	customerVaultStore.ofLegalAge = ref(ofLegalAge);

	customerVaultStore.customerInfo.email = ref(email);

	customerVaultStore.customerInfo.firstName = ref(firstName);

	customerVaultStore.customerInfo.lasttName = ref(lastName);

	customerVaultStore.customerInfo.zipcode = ref(zipcode);

	customerVaultStore.customerInfo.selectedCity = ref(selectedCity);

	customerVaultStore.customerInfo.streetAndHouseNumber =
		ref(streetAndHouseNumber);

	customerVaultStore.customerInfo.state = ref(state);
</script>
