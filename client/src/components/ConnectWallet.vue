<script setup lang="ts">
import { computed, inject } from "vue";
const blockchainOptions = [
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    wallets: ["MetaMask", "WalletConnect"],
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    wallets: ["Install Phantom"],
  },
  {
    id: "polygon",
    name: "Polygon",
    symbol: "MATIC",
    wallets: ["MetaMask", "WalletConnect"],
  },
];
const { selectBlockchain, blockchainNetwork, connectWallet } =
  inject<any>("provider");

const listOfBlockchainWallets = computed(() => {
  let wallets;
  switch (blockchainNetwork.value) {
    case blockchainOptions[0].id:
      wallets = blockchainOptions[0].wallets
      break;
    case blockchainOptions[1].id:
      wallets = blockchainOptions[1].wallets
      break;
    default:
      wallets = blockchainOptions[2].wallets
      break;
  }
  return wallets;
});
const imageSrc = `https://assets.raribleuserdata.com/prod/v1/image/t_image_big/aHR0cHM6Ly9jbG9uZXgtYXNzZXRzLnJ0Zmt0LmNvbS9pbWFnZXMvOTg3NS5wbmc=`;
</script>
<template>
  <section class="relative max-h-screen">
    <div
      class="relative w-full h-full flex flex-row justify-start items-start sm:space-x-10 md:space-x-16 lg:space-x-28 text-gray-800 dark:text-white"
    >
      <div class="relative sm:w-[30%]">
        <div class="absolute left-5 pt-8 sm:pt-10">
          <RouterLink to="/" class="text-white text-xl font-bold">InterestQQ</RouterLink>
        </div>
        <div class="sf:hidden h-screen max-w-[380px]">
          <img
            :src="imageSrc"
            class="w-full h-full flex-auto object-cover object-center"
          />
        </div>
      </div>
      <div class="relative w-full flex sm:w-[70%] sf:pt-10">
        <div class="max-w-sm flex flex-col py-10 gap-8 sf:px-5">
          <div class="flex flex-col gap-5">
            <h1 class="text-4xl font-semibold">Connect wallet</h1>
            <p class="text-lg text-gray-500 dark:text-darkTheme-text">
              Choose how you want to connect. There are several wallet
              providers.
            </p>
          </div>
          <div class="relative flex flex-col gap-4">
            <div
              class="relative flex flex-row gap-8 items-center border-b dark:border-darkTheme-border pb-3"
            >
              <div
                v-for="blockchain in blockchainOptions"
                :key="blockchain.id"
                v-on:click="selectBlockchain(blockchain.id)"
                :class="{
                  'text-gray-800 dark:text-white': blockchain.id == blockchainNetwork,
                  'text-gray-500 dark:text-darkTheme-text': blockchain.id != blockchainNetwork,
                }"
                class="text-base font-medium hover:text-gray-800 dark:hover:text-white cursor-pointer"
              >
                {{ blockchain.name }}
              </div>
              <div
                class="hidden absolute w-16 h-0.5 rounded-t-xl bg-gray-800 bottom-0 transition-all delay-75 duration-300"
              ></div>
            </div>
            <div class="relative flex flex-col gap-2">
              <h1 class="text-xs text-gray-500 dark:text-darkTheme-text">Popular</h1>
              <div
                v-on:click="connectWallet(dappWallet, $route.query.redirect)"
                class="w-full transition-all duration-300 border dark:border-darkTheme-border dark:hover:border-darkTheme-hover-b rounded-xl p-3 text-lg font-medium cursor-pointer transform active:scale-95"
                v-for="dappWallet in listOfBlockchainWallets"
                :key="dappWallet"
              >
                {{ dappWallet}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
