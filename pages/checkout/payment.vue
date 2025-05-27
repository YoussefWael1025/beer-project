<template>
	<div class="flex flex-col min-h-screen">
		<div class="flex flex-row flex-grow">
			<section class="basis-2/3">
				<div class="max-w-[30rem] lg:max-w-[40rem] mx-auto">
					<Breadcrumb
						:home="home"
						:model="items"
						:pt="{ root: { class: 'bg-transparent border-0 mt-8' } }"
					/>
					<div class="flex flex-col gap-3 mt-4 p-4 border-2">
						<div class="flex flex-row justify-between pb-4 border-b-2">
							<span class="text-gray-500">Contact</span>
							<span>{{ customerVaultStore.customerInfo.email }}</span>
							<nuxt-link
								class="underline text-gray-500"
								to="/checkout"
								>Change</nuxt-link
							>
						</div>
						<div class="flex flex-row justify-between gap-10 py-1">
							<span class="text-gray-500">Ship to</span>
							<span
								>{{ customerVaultStore.customerInfo.streetAndHouseNumber
								}}{{ customerVaultStore.customerInfo.floor }}
								{{ customerVaultStore.customerInfo.state }},
								{{ customerVaultStore.customerInfo.selectedCity.name }}</span
							>
							<nuxt-link
								class="underline text-gray-500"
								to="/checkout"
								>Change</nuxt-link
							>
						</div>
						<div class="flex flex-row justify-between border-t-2 pt-4 gap-10">
							<span class="text-gray-500">Shipping method</span>
							<span>{{ customerVaultStore.deliveryType }}</span>
							<nuxt-link
								class="underline text-gray-500"
								to="/checkout/shipping"
								>Change</nuxt-link
							>
						</div>
					</div>
					<div class="my-8">
						<h1 class="font-bold text-2xl mb-2">Payment</h1>
						<p class="text-sm pr-12 mb-4">
							All transactions are secured and encrypted.
						</p>
						<div>
							<Accordion
								v-model:activeIndex="accordionIndex"
								@click="paymentStore.paymentMethod"
							>
								<AccordionTab>
									<template #header>
										<span>Credit Card</span>
										<img
											class="object-contain h-6 absolute right-5"
											src="https://webservices.global-e.com/content/images/paymentMethods/pm.svg"
											alt="credit-card-icon"
										/>
									</template>
									<div>
										<div class="flex flex-row gap-3">
											<img
												src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/375px-Visa_2021.svg.png"
												class="w-10 object-contain"
												alt="visa"
											/>
											<img
												src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/250px-Mastercard_2019_logo.svg.png"
												class="w-10 object-contain"
												alt="mastercard"
											/>
											<img
												src="https://i.pinimg.com/564x/c9/10/94/c910944ac6247ed2d0d47279453c5959.jpg"
												class="w-10 object-contain"
												alt="american_express"
											/>
											<img
												src="https://upload.wikimedia.org/wikipedia/de/0/09/Diners_Club_Logo.svg"
												class="w-10 object-contain"
												alt="diner's_club"
											/>
											<p class="text-gray-500 text-sm self-center">
												And many more...
											</p>
										</div>
										<div class="mt-8 mb-4">
											<div>
												<span class="p-float-label">
													<InputText v-model="cardNumber" />
													<label for="cardNumber">Card number</label>
												</span>
												<small class="p-error"
													>{{ cardNumberErrorMessage }}
												</small>
											</div>
											<div class="flex flex-row gap-2 mt-8">
												<Dropdown
													v-model="selectedMonth"
													:options="monthsList"
													placeholder="Month"
												/>
												<Dropdown
													v-model="selectedYear"
													:options="yearsList"
													placeholder="Year"
												/>
												<small class="p-error"
													>{{ selectedMonthErrorMessage }}
												</small>
												<small class="p-error"
													>{{ selectedYearErrorMessage }}
												</small>
											</div>
											<div class="flex flex-row gap-3 mt-8">
												<div class="flex flex-col">
													<span class="p-float-label">
														<InputText v-model="CVV" />
														<label for="CVV">CVV</label>
													</span>
													<small class="p-error">{{ CVVErrorMessage }} </small>
												</div>
												<p class="italic text-gray-500 self-center">
													3 or 4 digits usually found on the signature strip
												</p>
											</div>
										</div>
									</div>
								</AccordionTab>
								<AccordionTab>
									<template #header>
										<span>Sofortuberweisung</span>
										<img
											class="object-contain h-6 absolute right-5"
											src="https://webservices.global-e.com/content/images/paymentMethods/pm_8.png"
											alt="sofort-icon"
										/>
									</template>
									<div class="flex flex-col p-6">
										<img
											class="object-contain h-24 mb-4"
											src="https://cdn.shopify.com/shopifycloud/shopify/assets/checkout_2021-01-25/offsite-908d79d8d532f6af67d7cc99244ede733729c29379c349ee015fbcea71fd8274.svg"
											alt="checkout-offsite"
										/>
										<p>
											After clicking “Complete order”, you will be redirected to
											Sofortuberweisung in order to complete your purchase
											securely.
										</p>
									</div>
								</AccordionTab>
								<AccordionTab>
									<template #header>
										<span>GiroPay</span>
										<img
											class="object-contain h-6 absolute right-5"
											src="https://webservices.global-e.com/content/images/paymentMethods/pm_17.png"
											alt="giropay-icon"
										/>
									</template>
									<div class="flex flex-col p-6">
										<img
											class="object-contain h-24 mb-4"
											src="https://cdn.shopify.com/shopifycloud/shopify/assets/checkout_2021-01-25/offsite-908d79d8d532f6af67d7cc99244ede733729c29379c349ee015fbcea71fd8274.svg"
											alt="checkout-offsite"
										/>
										<p>
											After clicking “Complete order”, you will be redirected to
											GiroPay in order to complete your purchase securely.
										</p>
									</div>
								</AccordionTab>
								<AccordionTab>
									<template #header>
										<span>PayPal</span>
										<img
											class="object-contain h-6 absolute right-5"
											src="https://webservices.global-e.com/content/images/paymentMethods/pm_4.png"
											alt="paypal-icon"
										/>
									</template>
									<div class="flex flex-col p-6">
										<img
											class="object-contain h-24 mb-4"
											src="https://cdn.shopify.com/shopifycloud/shopify/assets/checkout_2021-01-25/offsite-908d79d8d532f6af67d7cc99244ede733729c29379c349ee015fbcea71fd8274.svg"
											alt="checkout-offsite"
										/>
										<p>
											After clicking "Complete order" a pop-up will appear
											asking you to log in to your PayPal account. Review your
											payment and shipping details to complete your purchase.
											You will be redirected to the "Glossier" Order
											Confirmation page afterwards.
										</p>
									</div>
								</AccordionTab>
								<AccordionTab>
									<template #header>
										<span>Klarna</span>
										<img
											class="object-contain h-6 absolute right-5"
											src="https://webservices.global-e.com/content/images/paymentMethods/pm_116.png"
											alt="klarna-icon"
										/>
									</template>
									<div class="flex flex-col p-6">
										<img
											class="object-contain h-24 mb-4"
											src="https://cdn.shopify.com/shopifycloud/shopify/assets/checkout_2021-01-25/offsite-908d79d8d532f6af67d7cc99244ede733729c29379c349ee015fbcea71fd8274.svg"
											alt="checkout-offsite"
										/>
										<p>
											After clicking “Complete order”, you will be redirected to
											Klarna in order to complete your purchase securely.
										</p>
									</div>
								</AccordionTab>
							</Accordion>
						</div>
					</div>
					<div class="flex flex-row justify-around my-8">
						<Button
							><nuxt-link to="/checkout/receipt"
								>Complete Order</nuxt-link
							></Button
						>
						<nuxt-link
							to="/checkout/shipping"
							class="underline self-center text-gray-500"
							>Return to Shipping</nuxt-link
						>
					</div>
				</div>
			</section>
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

	const paymentStore = usePaymentStore();

	const accordionIndex = ref(0);

	const customerVaultStore = useCustomerVaultStore();

	const monthsList = ref([
		"01",
		"02",
		"03",
		"04",
		"05",
		"06",
		"07",
		"08",
		"09",
		"10",
		"11",
		"12",
	]);

	const yearsList = ref([
		2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034,
		2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042,
	]);

	const paymentMethods = {
		0: "Credit Card",
		1: "Sofortuberweisung",
		2: "GiroPay",
		3: "PayPal",
		4: "Klarna",
	};

	const home = ref({
		label: "ShoppingCart",
		route: "/ShoppingCart",
	});

	const items = ref([
		{ label: "Information", route: "/ShoppingCart" },
		{ label: "Shipping" },
		{ label: "Payment" },
	]);

	watch(accordionIndex, (index) => {
		paymentStore.selectedPaymentMethod = paymentMethods[index] || null;
	});

	const { value: cardNumber, errorMessage: cardNumberErrorMessage } = useField(
		"cardNumber",
		yup
			.string()
			.required("Card number is required")
			.matches(/^\d{16}$/, "Invalid card number")
	);

	const { value: selectedMonth, errorMessage: selectedMonthErrorMessage } =
		useField("selectedMonth", yup.string().required("Please select a Month"));

	const { value: selectedYear, errorMessage: selectedYearErrorMessage } =
		useField("selectedYear", yup.string().required("Please select a Year"));

	const { value: CVV, errorMessage: CVVErrorMessage } = useField(
		"CVV",
		yup
			.string()
			.matches(/^\d{3,4}$/, "Please enter a valid CVV")
			.required("Please enter a zipcode")
	);

	paymentStore.creditInfo.cardNumber = ref(cardNumber);

	paymentStore.creditInfo.selectedMonth = ref(selectedMonth);

	paymentStore.creditInfo.selectedYear = ref(selectedYear);

	paymentStore.creditInfo.CVV = ref(CVV);
</script>
