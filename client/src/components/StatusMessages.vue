<script setup lang="ts">
import { inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ButtonMiscellenous } from "./buttonui";
const route = useRoute();
const router = useRouter()
const { blockchainNetwork, chooseHowToConnectWallet } = inject<any>("provider");

console.log("Check route redirect path:", route);
console.log("Check route redirect path:", router);
// console.log("Check router redirect path:", router);
</script>
<template>
  <section
    class="relative min-h-[72vh] max-h-screen flex flex-col justify-center items-center gap-4 min-w-[320px] max-w-xs text-gray-800 dark:text-white font-medium m-auto"
  >
    <h1 class="text-2xl">Connect wallet</h1>
    <p class="text-center text-gray-400 dark:text-darkTheme-text font-normal">
      {{
        `Connect ${blockchainNetwork} wallet of your profile to see this page`
      }}
    </p>
    <button-miscellenous
      v-on:click="chooseHowToConnectWallet($route.redirectedFrom?.path)"
      class="bg-gray-100 rounded-xl hover:bg-gray-200 py-2.5 dark:bg-darkTheme-bg dark:hover:bg-darkTheme-hover text-sm"
      :has-list-content="false"
      :compute-list-content="false"
      >Connect wallet</button-miscellenous
    >
  </section>
</template>
