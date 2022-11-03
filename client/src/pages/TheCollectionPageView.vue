<script setup lang="ts">
import { ref } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import type { ChildrenLinksType } from "@/types";
import { ButtonMiscellenous } from "@/components/buttonui";

const router = useRouter();
const route = useRoute();

const collectionDetailLinks = [
  { id: "TableAssets", title: "items" },
  { id: "Activity", title: "activity" },
];

const routerLinkActive = ref(route.name);
const activateAndUpdateRouter = (link: ChildrenLinksType) => {
  routerLinkActive.value = link.id;
  router.replace({
    path: `/${route.params.id}/${link.title}`,
  });
};
</script>
<template>
  <section
    class="relative w-full max-w-screen-2xl px-4 sm:px-6 md:px-7 lg:px-8 pt-4 pb-20 m-auto dark:text-darkTheme-text"
  >
    <div class="relative">
      <div class="rounded-2xl bg-gray-100 w-full h-72 max-h-72 overflow-hidden">
        <img
          class="w-full h-full object-center object-cover min-h-full min-w-full"
          src="https://rarible.mypinata.cloud/ipfs/QmRVx1g2ncnsxZ2o86MYcxGLC7ypnuVHfhi5MCtTbPjEg6"
        />
      </div>
      <div
        class="absolute bg-gray-400 h-28 w-28 rounded-3xl z-10 left-8 -bottom-6 ring-4 ring-offset-0 ring-white dark:ring-darkTheme-bg"
      ></div>
    </div>
    <div class="w-full flex flex-row justify-between pt-12">
      <div class="flex flex-col">
        <div class="w-9/12 flex flex-col space-y-2 text-gray-400">
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
        <div class="flex flex-row pt-12 space-x-3">
          <ButtonMiscellenous
            class="text-sm rounded-2xl bg-gray-900 hover:bg-black text-darkTheme-text-b"
            >Create Marketplace</ButtonMiscellenous
          >
          <div
            class="w-80 flex justify-between items-center border rounded-2xl p-2 relative"
          >
            <span class="px-4 flex w-8/12 flex-wrap text-sm"
              >Place a bid for any NFT from this collection</span
            >
            <ButtonMiscellenous
              class="text-xs rounded-xl bg-gray-900 hover:bg-black text-darkTheme-text-b"
              >Place a bid</ButtonMiscellenous
            >
          </div>
        </div>
      </div>
      <div
        class="border dark:border-darkTheme-border rounded-3xl h-auto w-80 p-5"
      >
        <div class="flex flex-col space-y-3">
          <div class="flex flex-row justify-between items-center">
            <span class="text-gray-400">Floor</span>
            <span class="font-medium dark:text-darkTheme-text-b"
              >1.2454 ETH</span
            >
          </div>
          <div class="flex flex-row justify-between items-center">
            <span class="text-gray-400">Volume</span>
            <span class="font-medium dark:text-darkTheme-text-b"
              >55.587 ETH</span
            >
          </div>

          <div class="flex flex-row justify-between items-center">
            <span class="text-gray-400">Items</span>
            <span class="font-medium dark:text-darkTheme-text-b">100K</span>
          </div>

          <div class="flex flex-row justify-between items-center">
            <span class="text-gray-400">Owners</span>
            <span class="font-medium dark:text-darkTheme-text-b">34.5K</span>
          </div>
          <hr class="dark:border-darkTheme-border" />
          <div class="flex flex-row justify-between items-center">
            <span class="text-gray-400">Blockchain</span>
            <span class="font-medium dark:text-darkTheme-text-b">Ethereum</span>
          </div>
          <div class="flex flex-row justify-between items-center">
            <span class="text-gray-400">Address</span>
            <span class="font-medium dark:text-darkTheme-text-b"
              >0x34d...86e1c</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="relative pt-7">
      <ul
        class="w-full flex justify-start items-center space-x-5 py-2 border-b text-gray-400 dark:border-b-darkTheme-border"
      >
        <li
          :class="{ 'text-gray-700': routerLinkActive === link.id }"
          class="capitalize font-semibold cursor-pointer"
          v-for="(link, index) in collectionDetailLinks"
          :key="link.id + index"
          @click="activateAndUpdateRouter(link)"
        >
          {{ link.title }}
        </li>
      </ul>
      <RouterView />
    </div>
  </section>
</template>
