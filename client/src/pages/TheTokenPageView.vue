<script setup lang="ts">
import { ref } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import type { ChildrenLinksType } from "@/types";
import { AssetsTableCard } from "@/components/assets-tokens";
import { TokenPriceDetailCard } from "@/components/tokens";
import { ChevronDownIcon, ArrowRightIcon } from "@/components/icons";
const NFTTokensInCollection = [
  {
    tokenId: 12345,
    tokenAddress: "0x4exr12309846567386sfdrteg23AW54EDWCAT6WUHSY",
    tokenName: "Bored Ape Yacht Club",
    tokenPrice: 0.443,
  },
  {
    tokenId: 2213,
    tokenAddress: "OjhutsU2X6567386sfdrteg23AW54EDWCAT6WUHSY",
    tokenName: "LuppyclubOfficial",
    tokenPrice: 3.123,
  },
  {
    tokenId: 30033,
    tokenAddress: "040x2ssdrU2X6567386234567drteg23AW54E0oiuydbgjsl",
    tokenName: "Clone X",
    tokenPrice: 11.0,
  },
  {
    tokenId: 42213,
    tokenAddress: "04ex0uyu67drtwe432eg23AW54E0oiuydbgjsl",
    tokenName: "CryptoPunks",
    tokenPrice: 1.1,
  },
  {
    tokenId: 662,
    tokenAddress: "3023erds2eg23AW54E0oiuydbgjsl",
    tokenName: "PROOF Collective",
    tokenPrice: 0.122,
  },
  {
    tokenId: 390,
    tokenAddress: "0903e4r2eg2323ewqszxcvfr4567AW54E0oiuydbgjsl",
    tokenName: "Azuki",
    tokenPrice: 0.023,
  },
  {
    tokenId: 91700,
    tokenAddress: "1w23e4r5t6y7u8i9o0pasderftgyhujikolpgjsl",
    tokenName: "Light Years by Dmitri Cherniak",
    tokenPrice: 0.15,
  },
  {
    tokenId: 5414,
    tokenAddress: "po90iuy6780pasderftgyhujikolpgjsl",
    tokenName: "CryptoNinja NFT",
    tokenPrice: 1.12,
  },
];
const router = useRouter();
const route = useRoute();
const moreFromThisCollectionRef = ref<any>(null);
const showTableNavigationButton = ref<boolean>(false);
const scrollByVisibility = ref<number>(0);
const scrollByVisibilityPercentage = ref<number>(0);
const tokenDetailTabLinks = [
  {
    id: "TokenOverView",
    title: "overview",
    slug: "overview"
  },
  // {
  //   id: "PropertiesToken",
  //   title: "properties",
  // },
  {
    id: "TokenBids",
    title: "bids",
    slug: "bids"
  },

  {
    id: "TokenHistory",
    title: "history",
    slug: "history"
  },
];
const routerLinkActive = ref(route.name);
const activateLinkAndUpdateRouter = (link: ChildrenLinksType) => {
  routerLinkActive.value = link.id;
  router.replace({
    path: `/token/${route.params.tokenId}/${link.title}`,
  });
};
const scrollBarCallback = (direction: string) => {
  const { offsetWidth, scrollWidth, children } =
    moreFromThisCollectionRef.value;
  const collectionItemWidth = children[0].offsetWidth;

  const scrollByIndex =
    direction == "forward" ? collectionItemWidth : -collectionItemWidth;
  moreFromThisCollectionRef.value.scrollBy({
    top: 0,
    left: scrollByIndex,
    behavior: "smooth",
  });
  scrollByVisibility.value += scrollByIndex;

  const progressiveScrollWidthTrackingLength =
    offsetWidth + scrollByVisibility.value;

  scrollByVisibilityPercentage.value =
    (progressiveScrollWidthTrackingLength * 100) / scrollWidth;
};
</script>
<style scoped>
.hide-horizontal__scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-horizontal__scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
<template>
  <div class="relative w-full flex sf:flex-col justify-between gap-8 pt-6">
    <div class="w-[63%] mf:w-full h-auto py-5">
      <div class="w-full flex flex-col items-center">
        <div
          class="w-[500px] h-[500px] mf:w-full min-h-[226px] mf:max-w-full max-w-md bg-gray-200 dark:bg-darkTheme-bg rounded-2xl"
        >
          <img
            class="w-full h-full object-center object-cover rounded-2xl"
            src="https://assets.raribleuserdata.com/prod/v1/image/t_image_big/aHR0cHM6Ly9jbG9uZXgtYXNzZXRzLnJ0Zmt0LmNvbS9pbWFnZXMvOTg3NS5wbmc="
          />
        </div>
        <TokenPriceDetailCard class="lmin:hidden w-full mt-8" />
        <div class="w-auto px-8 mt-8">
          <ul
            class="relative w-full h-12 bg-gray-100 dark:bg-darkTheme-bg rounded-2xl flex justify-between items-center text-gray-500 dark:text-darkTheme-text font-semibold text-base p-1.5"
          >
            <li
              v-for="(link, index) in tokenDetailTabLinks"
              :key="link.id + index"
              @click="activateLinkAndUpdateRouter(link)"
              :class="{
                'bg-white dark:bg-darkTheme rounded-xl text-gray-700 dark:text-darkTheme-text-b':
                  routerLinkActive === link.id,
              }"
              class="transition-all duration-300 px-4 py-2 cursor-pointer capitalize dark:hover:text-darkTheme-text-b"
            >
              {{ link.title }}
            </li>
          </ul>
        </div>
        <div class="w-full flex justify-start">
          <RouterView />
        </div>
      </div>
    </div>
    <div class="mf:hidden w-[37%] mf:w-full lmin:min-w-[420px]">
      <TokenPriceDetailCard class="sticky top-16" />
    </div>
  </div>
  <div class="relative w-full pt-10">
    <h1
      class="text-center font-semibold text-gray-700 dark:text-darkTheme-text-b text-3xl xs:text-xl"
    >
      More from this collection
    </h1>
    <div
      class="w-full relative overflow-hidden pt-8"
      v-on:mouseover="showTableNavigationButton = true"
      v-on:mouseout="showTableNavigationButton = false"
    >
      <div
        @click="scrollBarCallback('forward')"
        v-show="showTableNavigationButton && scrollByVisibilityPercentage < 100"
        class="absolute h-full flex right-0 z-10 items-center"
      >
        <span
          class="bg-white border border-white shadow-xl dark:border-darkTheme-border dark:bg-darkTheme rounded-2xl p-2 m-auto transition-all hover:scale-110 active:scale-100"
        >
          <chevron-down-icon class="rotate-[270deg]" />
        </span>
      </div>
      <div
        @click="scrollBarCallback('backward')"
        v-show="showTableNavigationButton && scrollByVisibility > 0"
        class="absolute h-full flex left-0 z-10 items-center"
      >
        <span
          class="bg-white border border-white shadow-xl dark:border-darkTheme-border dark:bg-darkTheme rounded-2xl p-2 m-auto transition-all hover:scale-110 active:scale-100"
        >
          <chevron-down-icon class="rotate-[90deg]" />
        </span>
      </div>
      <ul
        ref="moreFromThisCollectionRef"
        class="hide-horizontal__scrollbar w-full flex flex-row flex-nowrap overflow-x-auto snap-x snap-mandatory pb-1"
      >
        <AssetsTableCard
          v-for="tokenData in NFTTokensInCollection"
          :key="tokenData.tokenId + tokenData.tokenAddress"
          :filterIsHidden="false"
          :viewOptionSize="'largerViewOption'"
          :assetInfo="tokenData"
          class="min-w-[240px] max-w-xs"
        />
        <div
          class="relative min-w-[240px] max-w-xs flex justify-center items-center"
        >
          <router-link
            :to="{
              path: '/collection/Art BLocks x Pace',
            }"
            ><ArrowRightIcon
          /></router-link>
        </div>
      </ul>
    </div>
  </div>
</template>
