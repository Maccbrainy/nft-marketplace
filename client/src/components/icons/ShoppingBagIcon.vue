<script setup lang="ts">
import { inject } from "vue";

const { showMarketplaceCartBagCallback, marketplaceCartBagItems } =
  inject<any>("provider");
</script>
<template>
  <button
    v-on:click="showMarketplaceCartBagCallback"
    class="relative outline-none"
  >
    <span
      v-if="marketplaceCartBagItems.length > 0"
      class="absolute right-0 bg-red-500 px-2 rounded-lg py-0.5 text-white text-center text-xs"
      >{{ marketplaceCartBagItems.length }}</span
    >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2.0"
      stroke="currentColor"
      class="w-8 h-8 dark:text-white cursor-pointer font-bold"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  </button>
</template>
