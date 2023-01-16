<script setup lang="ts">
import { ref } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import type { ChildrenLinksType } from "@/types";
import { ButtonMiscellenous } from "@/components/buttonui";
import { MenuDotsIcon, ShareIcon } from "@/components/icons";

const router = useRouter();
const route = useRoute();

const collectionDetailLinks = [
  { id: "TableCollectionAssets", title: "items" },
  { id: "CollectionActivity", title: "activity" },
];

const collectionMenuList = [
  { id: "Claim ownership", name: "Claim ownership", icon: false },
  { id: "Report page", name: "Report page", icon: false },
];

const routerLinkActive = ref(route.name);
const activateAndUpdateRouter = (link: ChildrenLinksType) => {
  routerLinkActive.value = link.id;
  router.replace({
    path: `/collection/${route.params.id}/${link.title}`,
  });
};

const isActiveMenuAction = ref<string>(collectionMenuList[0].id);
const collectionMenuAction = (option: { id: string }) => {
  isActiveMenuAction.value = option.id;
  console.log(`${option.id}`);
};
</script>
<template>
  <div class="relative">
    <div
      class="relative rounded-2xl bg-gray-100 dark:bg-darkTheme-bg w-full h-72 max-h-72"
    >
      <img
        class="w-full h-full object-center object-cover min-h-full min-w-full rounded-2xl"
        src="https://rarible.mypinata.cloud/ipfs/QmRVx1g2ncnsxZ2o86MYcxGLC7ypnuVHfhi5MCtTbPjEg6"
      />
      <div
        class="absolute -bottom-5 bg-gray-400 h-28 w-28 rounded-3xl z-10 left-8 ring-4 ring-offset-0 ring-white dark:ring-darkTheme"
      ></div>
    </div>
    <div class="relative w-full flex flex-col pt-12">
      <div class="relative flex flex-row mmf:flex-col justify-between gap-10">
        <div
          class="relative w-9/12 flex flex-col space-y-2 text-gray-400 dark:text-darkTheme-text"
        >
          <h1
            class="text-4xl text-gray-800 dark:text-darkTheme-text-b font-medium"
          >
            {{ $route.params.id }}
          </h1>
          <span>Created by</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </div>
        <div
          class="w-80 mmf:w-full border dark:border-darkTheme-border text-gray-400 dark:text-darkTheme-text rounded-3xl h-auto p-5"
        >
          <div class="flex flex-col space-y-3">
            <div class="flex flex-row justify-between items-center">
              <span>Floor</span>
              <span class="font-medium dark:text-darkTheme-text-b"
                >1.2454 ETH</span
              >
            </div>
            <div class="flex flex-row justify-between items-center">
              <span>Volume</span>
              <span class="font-medium dark:text-darkTheme-text-b"
                >55.587 ETH</span
              >
            </div>

            <div class="flex flex-row justify-between items-center">
              <span>Items</span>
              <span class="font-medium dark:text-darkTheme-text-b">100K</span>
            </div>

            <div class="flex flex-row justify-between items-center">
              <span>Owners</span>
              <span class="font-medium dark:text-darkTheme-text-b">34.5K</span>
            </div>
            <hr class="dark:border-darkTheme-border" />
            <div class="flex flex-row justify-between items-center">
              <span>Blockchain</span>
              <span class="font-medium dark:text-darkTheme-text-b"
                >Ethereum</span
              >
            </div>
            <div class="flex flex-row justify-between items-center">
              <span>Address</span>
              <span class="font-medium dark:text-darkTheme-text-b"
                >0x34d...86e1c</span
              >
            </div>
          </div>
        </div>
      </div>
      <div
        class="relative flex flex-row items-center mmf:justify-center flex-wrap pt-6 lmax:mt-0 -mt-16 gap-3"
      >
        <button-miscellenous
          :has-list-content="false"
          class="text-sm rounded-2xl py-3 bg-gray-900 font-medium dark:bg-white dark:text-gray-700 hover:bg-black text-darkTheme-text-b"
          >Create Marketplace</button-miscellenous
        >
        <div
          class="w-80 flex justify-between border dark:border-darkTheme-border rounded-2xl p-2 relative"
        >
          <span class="px-4 flex w-8/12 flex-wrap text-xs"
            >Place a bid for any NFT from this collection</span
          >
          <button-miscellenous
            :has-list-content="false"
            class="text-xs py-2 rounded-xl bg-gray-900 font-medium dark:bg-white dark:text-gray-700 hover:bg-black text-darkTheme-text-b"
            >Place a bid</button-miscellenous
          >
        </div>
        <button-miscellenous
          :has-list-content="false"
          class="rounded-2xl py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-darkTheme-bg dark:text-darkTheme-text dark:hover:bg-darkTheme-hover dark:hover:text-darkTheme-text-b"
        >
          <share-icon />
        </button-miscellenous>
        <button-miscellenous
          @selection-action="collectionMenuAction"
          :list-of-options="collectionMenuList"
          :is-active-option="isActiveMenuAction"
          :has-list-content="true"
          :compute-list-content="false"
          class="rounded-2xl py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-darkTheme-bg dark:text-darkTheme-text dark:hover:bg-darkTheme-hover dark:hover:text-darkTheme-text-b"
        >
          <MenuDotsIcon />
        </button-miscellenous>
      </div>
    </div>
    <div class="relative pt-8">
      <ul
        class="w-full flex justify-start items-center space-x-5 py-2 border-b text-gray-400 dark:text-darkTheme-text dark:border-b-darkTheme-border"
      >
        <li
          :class="{
            'text-gray-700 dark:text-darkTheme-text-b':
              routerLinkActive === link.id,
          }"
          class="capitalize font-semibold cursor-pointer"
          v-for="(link, index) in collectionDetailLinks"
          :key="link.id + index"
          @click="activateAndUpdateRouter(link)"
        >
          {{ link.title }}
        </li>
      </ul>
      <router-view />
    </div>
  </div>
</template>
