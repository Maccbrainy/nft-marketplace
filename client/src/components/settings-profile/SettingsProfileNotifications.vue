<script setup lang="ts">
import { ref } from "vue";
import WidgetButtonToggle from "../WidgetButtonToggle.vue";

const onSalesNotification = ref<boolean>(true);
const onListingsNotification = ref<boolean>(true);
const onSuccessfulBidsNotification = ref<boolean>(true);
const onBidsAndOutbidsNotification = ref<boolean>(true);
const onExpiredBidsNotification = ref<boolean>(true);
const onPurchasesNotification = ref<boolean>(true);

const onSalesNotificationHandler = (payload: boolean) => {
  onSalesNotification.value = payload
  console.log("onSalesNotification:", payload);
};
const onListingsNotificationHandler = (payload: boolean) => {
  onListingsNotification.value = payload
  console.log("onListingsNotification:", payload);
};
const onSuccessfulBidsNotificationHandler = (payload: boolean) => {
  onSuccessfulBidsNotification.value = payload
  console.log("onSuccessfulBidsNotification:", payload);
};
const onBidsAndOutbidsNotificationHandler = (payload: boolean) => {
  onBidsAndOutbidsNotification.value = payload
  console.log("onBidsAndOutbidsNotification:", payload);
};
const onExpiredBidsNotificationHandler = (payload: boolean) => {
  onExpiredBidsNotification.value = payload
  console.log("onExpiredBidsNotification:", payload);
};
const onPurchasesNotificationHandler = (payload: boolean) => {
  onPurchasesNotification.value = payload
  console.log("onPurchasesNotification:", payload);
};
</script>
<template>
  <div class="relative">
    <h1 class="text-gray-800 text-xl">Notifications</h1>
    <p class="py-0.5 font-light">
      Select the kinds of notifications you’d like receive to your email and
      in-app notifications center
    </p>
    <div class="border rounded-2xl mt-4 p-5 space-y-6">
      <widget-button-toggle
        title="Sales"
        description="When one of your NFT sells"
        v-on:on-toggle-handler="onSalesNotificationHandler"
        :switch-provider="onSalesNotification"
      />
      <widget-button-toggle
        title="Listings"
        description="When an item is successfully listed on the marketplace"
        v-on:on-toggle-handler="onListingsNotificationHandler"
        :switch-provider="onListingsNotification"
      />
      <widget-button-toggle
        title="Successful bids"
        description="When your bid was successful and the NFT is in your wallet"
        v-on:on-toggle-handler="onSuccessfulBidsNotificationHandler"
        :switch-provider="onSuccessfulBidsNotification"
      />
      <widget-button-toggle
        title="Bids & Outbids"
        description="When someone bids on one of your items or outbids yours bids"
        v-on:on-toggle-handler="onBidsAndOutbidsNotificationHandler"
        :switch-provider="onBidsAndOutbidsNotification"
      />
      <widget-button-toggle
        title="Expired bids"
        description="When your bid expires or gets deactivated because of insufficient funds"
        v-on:on-toggle-handler="onExpiredBidsNotificationHandler"
        :switch-provider="onExpiredBidsNotification"
      />
      <widget-button-toggle
        title="Purchases"
        description="When a purchase is successful and you have received the NFT in your wallet"
        v-on:on-toggle-handler="onPurchasesNotificationHandler"
        :switch-provider="onPurchasesNotification"
      />
    </div>
  </div>
</template>
