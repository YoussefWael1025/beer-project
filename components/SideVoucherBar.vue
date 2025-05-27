<template>
  <section>
    <div
      v-for="item in cartStore.cart"
      class="flex flex-row justify-between m-8 border-b-2 pb-8"
    >
      <span>{{ item.name }}</span>
      <div class="flex gap-3">
        <span> Qty: {{ item.quantity }}</span>
        <span>Price: {{ item.quantity * 2 }} EUR</span>
      </div>
    </div>
    <div class="m-8 border-b-2 pb-8 flex flex-row gap-3">
      <div class="grow">
        <span class="p-float-label">
          <InputText v-model="paymentStore.discountCode" class="w-full" />
          <label for="discountCode">Discount code or gift card</label>
        </span>
        <div class="flex flex-col">
          <small class="italic">hint: use dec25</small>
          <small v-if="!paymentStore.validVoucher" class="p-error"
            >invalid or expired voucher</small
          >
        </div>
      </div>
      <Button @click="checkDiscountCode()" class="h-fit">Apply</Button>
    </div>
    <div class="m-8 pb-8 border-b-2">
      <div class="flex justify-between mb-4">
        <span>Subtotal</span>
        <span>{{ cartStore.cartSize * 2 }} EUR</span>
      </div>

      <div v-if="paymentStore.voucher" class="flex justify-between mb-4">
        <span class="italic font-bold">December Voucher</span>
        <span> 25% off</span>
      </div>
      <div v-if="customerVaultStore.deliveryType" class="flex justify-between">
        <span
          >{{
            customerVaultStore.deliveryType === "Express Shipping"
              ? "Express "
              : "Standard"
          }}
          Shipping
        </span>
        <span>{{
          customerVaultStore.deliveryType === "Standard Shipping"
            ? "free"
            : "10 EUR"
        }}</span>
      </div>
    </div>
    <div class="m-8 flex justify-between">
      <span class="font-bold">Total</span>
      <span>{{
        cartStore.cartSize * 2 -
        (paymentStore.voucher ? (1 / 4) * (cartStore.cartSize * 2) : 0) +
        (customerVaultStore.deliveryType === "Express Shipping" ? 10 : 0)
      }} EUR</span>
    </div>
  </section>
</template>

<script setup>
const paymentStore = usePaymentStore();
const customerVaultStore = useCustomerVaultStore();
const cartStore = useCartStore();
const checkDiscountCode = () => {
  if (paymentStore.discountCode === "dec25") {
    paymentStore.validVoucher = true;
    paymentStore.voucher = true;
  } else {
    paymentStore.validVoucher = false;
    paymentStore.voucher = false;
  }
};
</script>
