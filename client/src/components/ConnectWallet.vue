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
      class="relative w-full h-full flex flex-row justify-start items-start space-x-28 text-gray-800"
    >
      <div class="relative w-[30%]">
        <div class="absolute left-5 pt-10 text-white">
          <RouterLink to="/">Logo</RouterLink>
        </div>
        <div class="w-full h-screen min-w-[320px]">
          <img
            :src="imageSrc"
            class="w-full h-full flex-auto object-cover object-center"
          />
        </div>
      </div>
      <div class="relative w-[70%]">
        <div class="min-w-[448px] max-w-md flex flex-col py-10 gap-8">
          <div class="flex flex-col gap-5">
            <h1 class="text-4xl font-semibold">Connect wallet</h1>
            <p class="text-lg text-gray-500">
              Choose how you want to connect. There are several wallet
              providers.
            </p>
          </div>
          <div class="relative flex flex-col gap-4">
            <div
              class="relative flex flex-row gap-8 items-center border-b pb-3"
            >
              <div
                v-for="blockchain in blockchainOptions"
                :key="blockchain.id"
                v-on:click="selectBlockchain(blockchain.id)"
                :class="{
                  'text-gray-800': blockchain.id == blockchainNetwork,
                  'text-gray-400': blockchain.id != blockchainNetwork,
                }"
                class="text-base font-medium hover:text-gray-800 cursor-pointer"
              >
                {{ blockchain.name }}
              </div>
              <div
                class="hidden absolute w-16 h-0.5 rounded-t-xl bg-gray-800 bottom-0 transition-all delay-75 duration-300"
              ></div>
            </div>
            <div class="relative flex flex-col gap-2">
              <h1 class="text-xs text-gray-500">Popular</h1>
              <div
                v-on:click="connectWallet(wallet, $route.query.redirect)"
                class="w-full border rounded-xl p-3 text-lg font-medium cursor-pointer"
                v-for="wallet in listOfBlockchainWallets"
                :key="wallet"
              >
                {{ wallet}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
