<template>
  <div class="flex flex-col min-h-screen">
    <CheckoutNavBar />
    <div class="flex flex-row flex-grow">
      <section class="basis-2/3">
        <div class="w-fit lg:mx-auto mx-6">
          <Breadcrumb
            :home="home"
            :model="items"
            :pt="{ root: { class: 'bg-transparent border-0 mt-8' } }"
          />
          <div class="flex flex-col gap-3 mt-4 p-4 border-2">
            <div class="flex flex-row justify-between pb-4 border-b-2">
              <span class="text-gray-500">Contact</span>
              <span>{{ customerVaultStore.customerInfo.email }}</span>
              <nuxt-link class="underline text-gray-500" to="/checkout"
                >Change</nuxt-link
              >
            </div>
            <div class="flex flex-row justify-between gap-10">
              <span class="text-gray-500">Ship to</span>
              <span
                >{{ customerVaultStore.customerInfo.streetAndHouseNumber
                }}{{ customerVaultStore.customerInfo.floor }}
                {{ customerVaultStore.customerInfo.state }},
                {{ customerVaultStore.customerInfo.selectedCity.name }}</span
              >
              <nuxt-link class="underline text-gray-500" to="/checkout"
                >Change</nuxt-link
              >
            </div>
          </div>
          <div class="mt-4">
            <h1 class="font-bold text-2xl">
              How do you want your order delivered?
            </h1>
            <p class="text-sm pr-12 mb-4">
              Please allow 1-3 days processing time before your order ships.
              Thanks for your patience.
            </p>
            <div class="flex flex-col gap-3 mt-4 p-4 border-2">
              <div class="pb-4 border-b-2">
                <div class="flex align-items-center mt-4">
                  <RadioButton
                    v-model="deliveryType"
                    value="Standard Shipping"
                  />
                  <label for="Standard" class="ml-2">Standard Shipping</label>
                </div>
                <span class="text-sm text-gray-400 italic ml-4"
                  >8 to 10 business days</span
                >
              </div>
              <div>
                <div class="flex align-items-center mt-4">
                  <RadioButton
                    v-model="deliveryType"
                    value="Express Shipping"
                  />
                  <label for="Express" class="ml-2">Express Shipping</label>
                </div>
                <span class="text-sm text-gray-400 italic ml-4"
                  >5 to 6 business days</span
                >
              </div>
            </div>
            <small class="p-error">{{ deliveryTypeErrorMessage }} </small>
          </div>
          <div class="flex flex-row justify-around mt-8">
            <Button
              ><nuxt-link to="/checkout/payment"
                >Continue To Payment</nuxt-link
              ></Button
            >
            <nuxt-link
              to="/checkout"
              class="underline self-center text-gray-500"
              >Return to information</nuxt-link
            >
          </div>
        </div>
      </section>
      <client-only>
        <SideVoucherBar class="basis-1/3 border-l-2" />
      </client-only>
    </div>
    <Footer />
  </div>
</template>

<script setup>
const customerVaultStore = useCustomerVaultStore();

const home = ref({
  label: "ShoppingCart",
  route: "/ShoppingCart",
});

const items = ref([
  { label: "Information", route: "ShoppingCart" },
  { label: "Shipping" },
  { label: "Payment" },
]);

const { value: deliveryType, errorMessage: deliveryTypeErrorMessage } =
  useField("deliveryType", (deliveryType) => {
    if (!deliveryType) {
      return "Please selected your prefered delivery.";
    }
    return true;
  });

customerVaultStore.deliveryType = deliveryType;
</script>
