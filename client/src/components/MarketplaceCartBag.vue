<script setup lang="ts">
import { inject } from "vue";
import { CloseIcon } from "./icons";
import { ButtonMiscellenous } from "./buttonui";
const {
  showMarketplaceCartBagCallback,
  showMarketplaceCartBag,
  matchedRoutesComposable,
} = inject<any>("provider");
</script>
<template>
  <div
    :class="{
      'sticky top-20 sf:top-0 mb-5 border dark:border-darkTheme-border lf:fixed lf:z-30 lf:right-0 lf:border-none sm:mr-5':
        showMarketplaceCartBag && matchedRoutesComposable,
      hidden: !showMarketplaceCartBag,
      'fixed z-30 dark:border-darkTheme-border right-0 mr-5':
        showMarketplaceCartBag && !matchedRoutesComposable,
    }"
    class="w-full h-full sf:pt-3 sm:w-[28%] sm:min-w-[320px] sm:h-[85vh] lf:shadow-2xl sm:rounded-2xl overflow-y-auto dark:text-white animate-slide-in-right"
  >
    <div
      class="relative w-full h-full flex flex-col gap-8 p-6 bg-white dark:bg-darkTheme"
    >
      <close-icon
        @click="showMarketplaceCartBagCallback"
        class="absolute right-3 top-3"
      />
      <div class="flex flex-col gap-2.5">
        <h1 class="font-semibold text-2xl pr-4">So much space for NFTs!</h1>
        <p class="text-base text-gray-500 dark:text-darkTheme-text">
          Add NFTs to your bag to check out and get hold of them.
        </p>
      </div>
      <button-miscellenous
        :has-list-content="false"
        class="w-full flex justify-center bg-gray-100 hover:bg-gray-200 dark:bg-darkTheme-bg dark:hover:bg-darkTheme-hover items-center h-12 text-base text-gray-800 dark:text-white font-semibold rounded-2xl py-3"
        >Explore Ethereum NFTs</button-miscellenous
      >
    </div>
  </div>
</template>
