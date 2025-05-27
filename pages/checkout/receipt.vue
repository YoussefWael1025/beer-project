<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <section class="w-2/5 mx-auto mb-8">
      <div class="mx-12 my-8 pb-4">
        <h1 class="font-bold text-4xl text-center w-fit mx-auto">Thank You!</h1>
      </div>
      <div ref="printableContent">
        <div class="border-y-2 py-8">
          <h1 class="text-2xl mb-4">Order Receipt</h1>
          <div class="flex flex-col lg:flex-row justify-between">
            <div class="flex flex-col">
              <span><b>Date:</b> {{ currentDate }}</span>
              <span><b>Order ID:</b> {{ orderId }}</span>
              <span><b>Customer Number:</b> {{ customerNumber }}</span>
            </div>
            <div>
              <span><b>Billed to:</b></span>
              <ul>
                <li>
                  Visa...
                  {{ String(paymentStore.creditInfo.cardNumber).slice(-4) }}
                </li>
                <li>{{ customerVaultStore.customerInfo.firstName }}</li>
                <li>
                  {{ customerVaultStore.customerInfo.streetAndHouseNumber }}
                </li>
                <li>
                  {{ customerVaultStore.customerInfo.selectedCity.name }},
                  {{ customerVaultStore.customerInfo.zipcode }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="py-8">
          <h1 class="text-2xl">Overview</h1>
          <div class="grid grid-cols-4 gap-6 pt-8">
            <span><b>Description</b></span>
            <span><b>Price</b></span>
            <span><b>Qty</b></span>
            <span><b>Total</b></span>
          </div>
          <div
            v-for="item in cartStore.cart"
            class="grid grid-cols-4 gap-6 pt-8"
          >
            <span>{{ item.name }}</span>
            <span>2 EUR</span>
            <span>{{ item.quantity }}</span>
            <span>{{ item.quantity * 2 }} EUR</span>
          </div>
          <div class="grid grid-cols-4 gap-6 pt-8">
            <span class="font-bold"
              >{{ customerVaultStore.deliveryType }}:</span
            >
            <span class="italic">{{
              (customerVaultStore.deliveryType = "Express Shipping"
                ? "10 EUR"
                : "Free")
            }}</span>
          </div>
          <div class="grid grid-cols-4 gap-6 pt-8">
            <span class="font-bold">Voucher:</span>
            <span class="italic">25% OFF</span>
          </div>
          <div class="grid grid-cols-4 pt-8">
            <span><b>Total:</b></span>
            <span
              ><b
                >{{
                  cartStore.cartSize * 2 -
                  (paymentStore.voucher
                    ? (1 / 4) * (cartStore.cartSize * 2)
                    : 0) +
                  (customerVaultStore.deliveryType === "Express Shipping"
                    ? 10
                    : 0)
                }}
                EUR</b
              ></span
            >
          </div>
        </div>
      </div>
      <div class="flex justify-evenly border-t-2 pt-8">
        <Button @click="printContent">Print Receipt</Button>
        <Button><nuxt-link to="/products">Back to Shop</nuxt-link></Button>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
const cartStore = useCartStore();

const paymentStore = usePaymentStore();

const customerVaultStore = useCustomerVaultStore();

const printableContent = ref(null);

const currentDate = ref(null);

const orderId = ref(null);

const customerNumber = ref(null);

const min = 1000000;

const max = 9999999;

const randomSevenDigitNumber =
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomSixDigitNumber =
  Math.floor(Math.random() * (max / 10 - min / 10 + 1)) + min / 10;

orderId.value = randomSevenDigitNumber;

customerNumber.value = randomSixDigitNumber;

const today = new Date();

const formatedDate = today.toLocaleDateString("en-US");

currentDate.value = formatedDate;

const printContent = () => {
  const contentToPrint = printableContent.value;

  if (contentToPrint) {
    const printWindow = window.open("", "_blank");
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => Array.from(styleSheet.cssRules))
      .flat()
      .map((rule) => rule.cssText)
      .join("\n");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            ${styles}
          </style>
        </head>
        <body>
          ${contentToPrint.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
};
</script>

<style scoped>
body {
  font-size: 12px;
}
</style>
