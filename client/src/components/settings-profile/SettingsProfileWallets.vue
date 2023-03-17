<script setup lang="ts">
import { markRaw, ref, inject } from "vue";
import { ButtonMiscellenous } from "../buttonui";
import {
  EthereumIcon,
  PolygonIcon,
  MenuDotsIcon,
  CopyToClipBoardIcon,
} from "../icons";
import { shortenAddress } from "@/utils";
//Marketplace supported blockchains
const { wallet } = inject<any>("provider");
const blockchainAndAddressOptions = [
  {
    id: "ethereum",
    name: "ethereum",
    icon: markRaw(EthereumIcon),
    address: wallet.value[0].current_account,
  },
  {
    id: "polygon",
    name: "polygon",
    icon: markRaw(PolygonIcon),
    address: wallet.value[0].current_account,
  },
];
console.log(wallet.value);

const viewOnEtherScan = [
  { id: "viewOnEtherScan", name: "View on Etherscan", icon: false },
];
const linkToEtherscan = ref<string>(viewOnEtherScan[0].id);
const viewOnEtherscanAction = (option: { id: string }) => {
  linkToEtherscan.value = option.id;
  console.log(`${option.id}`);
};
</script>
<template>
  <div class="relative">
    <h1 class="text-gray-800 text-xl">Manage Wallets</h1>
    <p class="py-0.5 font-light">
      Add one or more wallets to showcase all your NFTs in one place
    </p>
    <div
      class="w-full h-auto flex flex-col gap-3 border text-gray-800 dark:border-darkTheme-border rounded-2xl p-3 mt-4 text-base font-light"
    >
      <div
        v-for="(data, index) in blockchainAndAddressOptions"
        :key="data.id + index"
        class="flex flex-row justify-between items-center hover:bg-gray-50 hover:rounded-2xl p-2"
      >
        <div class="flex flex-row gap-3">
          <div class="flex flex-row items-center gap-3">
            <div
              class="flex justify-center items-center h-10 w-10 min-w-[40px] bg-gray-50 dark:bg-darkTheme-bg rounded-full overflow-hidden"
            >
              <component class="w-full h-full" :is="data.icon"></component>
            </div>
            <div class="flex flex-col">
              <span class="text-lg font-semibold">{{
                shortenAddress(data.address, 15)
              }}</span>
              <ul
                class="flex text-xs text-gray-400 dark:text-darkTheme-text font-normal gap-2"
              >
                <li class="whitespace-nowrap capitalize">
                  {{ data.name }}
                </li>
              </ul>
            </div>
          </div>
          <CopyToClipBoardIcon />
        </div>
        <div class="flex flex-col items-end">
          <button-miscellenous
            @selection-action="viewOnEtherscanAction"
            :list-of-options="viewOnEtherScan"
            :is-active-option="linkToEtherscan"
            :has-list-content="true"
            :compute-list-content="false"
            class="rounded-2xl py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-darkTheme-bg dark:text-darkTheme-text dark:hover:bg-darkTheme-hover dark:hover:text-darkTheme-text-b"
          >
            <MenuDotsIcon />
          </button-miscellenous>
        </div>
      </div>
      <ButtonMiscellenous
        :has-list-content="false"
        class="bg-gray-100 text-gray-800 font-normal rounded-2xl hover:bg-gray-200 py-2 dark:bg-darkTheme-bg dark:hover:bg-darkTheme-hover cursor-not-allowed"
        >Link Wallet</ButtonMiscellenous
      >
    </div>
  </div>
</template>
