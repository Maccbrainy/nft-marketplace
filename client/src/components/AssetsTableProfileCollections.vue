<script setup lang="ts">
import { ref, type PropType } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { ChildrenLinksType } from "@/types";
import { AssetsCollectionLayout } from "@/layouts";
import { ButtonMiscellenous } from "@/components/buttonui";
import { MenuDotsIcon, ShareIcon } from "@/components/icons";
import WidgetHeroImageSettings from "@/components/WidgetHeroImageSettings.vue";
const props = defineProps({
  tableLinkLists: Array as PropType<ChildrenLinksType[]>,
  routePath: String
});
const router = useRouter();
const route = useRoute();

const moreAssetsMenuLists = [
  { id: "Claim ownership", name: "Claim ownership", icon: false },
  { id: "Report page", name: "Report page", icon: false },
];

const routerLinkActive = ref(route.name);
const activateAndUpdateRouter = (link: ChildrenLinksType) => {
  routerLinkActive.value = link.id;
  router.replace({
    path: `${props.routePath}/${link.slug}`,
  });
};

const isActiveMenuAction = ref<string>(moreAssetsMenuLists[0].id);
const collectionMenuAction = (option: { id: string }) => {
  isActiveMenuAction.value = option.id;
  console.log(`${option.id}`);
};
</script>
<template>
  <assets-collection-layout>
    <template #assets-hero>
      <widget-hero-image-settings />
    </template>
    <template #assets-description-details>
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
                <span class="font-medium dark:text-darkTheme-text-b"
                  >34.5K</span
                >
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
          <router-link
            v-if="$route.meta.name === 'itemsOwnedPage'"
            to="/settings"
          >
            <button-miscellenous
              :has-list-content="false"
              class="rounded-2xl py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium dark:bg-darkTheme-bg dark:text-darkTheme-text dark:hover:bg-darkTheme-hover dark:hover:text-darkTheme-text-b"
              >Edit profile</button-miscellenous
            >
          </router-link>

          <button-miscellenous
            v-if="$route.meta.name === 'itemsOwnedPage'"
            :has-list-content="false"
            class="rounded-2xl py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium dark:bg-darkTheme-bg dark:text-darkTheme-text dark:hover:bg-darkTheme-hover dark:hover:text-darkTheme-text-b"
            >Sell</button-miscellenous
          >
          <button-miscellenous
            v-if="$route.meta.name === 'CollectionPage'"
            :has-list-content="false"
            class="text-sm rounded-2xl py-3 bg-gray-900 font-medium dark:bg-white dark:text-gray-800 hover:bg-black text-darkTheme-text-b"
            >Create Marketplace</button-miscellenous
          >
          <div
            v-if="$route.meta.name === 'CollectionPage'"
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
            class="rounded-2xl py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-darkTheme-bg dark:text-darkTheme-text dark:hover:bg-darkTheme-hover dark:hover:text-darkTheme-text-b"
          >
            <share-icon />
          </button-miscellenous>
          <button-miscellenous
            @selection-action="collectionMenuAction"
            :list-of-options="moreAssetsMenuLists"
            :is-active-option="isActiveMenuAction"
            :has-list-content="true"
            :compute-list-content="false"
            class="rounded-2xl py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-darkTheme-bg dark:text-darkTheme-text dark:hover:bg-darkTheme-hover dark:hover:text-darkTheme-text-b"
          >
            <MenuDotsIcon />
          </button-miscellenous>
        </div>
      </div>
    </template>
    <template #assets-tables>
      <div class="relative pt-8">
        <ul
          class="relative w-full flex justify-start items-center gap-5 py-2 border-b text-gray-400 dark:text-darkTheme-text dark:border-b-darkTheme-border"
        >
          <li
            :class="{
              'text-gray-700 dark:text-darkTheme-text-b after:absolute after:w-full after:h-0.5 after:-bottom-2 after:rounded-t-2xl after:bg-black after:dark:bg-white after:block':
                routerLinkActive === link.id,
            }"
            class="relative capitalize font-normal hover:text-gray-700 hover:dark:text-darkTheme-text-b cursor-pointer"
            v-for="(link, index) in tableLinkLists"
            :key="link.id + index"
            @click="activateAndUpdateRouter(link)"
          >
            {{ link.title }}
          </li>
          <!-- <div
            class="absolute h-0.5 w-[100%] bottom-0 rounded-t-2xl bg-black block transition-all duration-1000"
          ></div> -->
        </ul>
        <router-view />
      </div>
    </template>
  </assets-collection-layout>
</template>
