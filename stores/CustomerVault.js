export const useCustomerVaultStore = defineStore("customerVaultStore", {
  state: () => {
    const ofLegalAge = false;

    const deliveryType = null;

    const selectedPickUpLocation = null;

    const customerInfo = [];

    return { ofLegalAge, selectedPickUpLocation, deliveryType, customerInfo };
  },
});
