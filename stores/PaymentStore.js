import { useCustomerVaultStore } from "./CustomerVault";

export const usePaymentStore = defineStore("paymentStore", {
  state: () => {
    const validVoucher = true;

    const voucher = false;

    const selectedPaymentMethod = "Credit Card";

    const discountCode = null;

    const billingAddress = "sameAsShipping";

    const billingInfo = [];

    const creditInfo = [];

    return {
      billingAddress,
      billingInfo,
      creditInfo,
      discountCode,
      selectedPaymentMethod,
      validVoucher,
      voucher,
    };
  },
});
