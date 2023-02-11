<script setup lang="ts">
import { ref, inject } from "vue";
import { RouterLink } from "vue-router";
import { isMarketItemFoundInCartBagItems } from "@/utils";
import { ButtonDropdown, ButtonInput, ButtonMiscellenous } from "../buttonui";
import {
  AddToCartIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  TickCheckIcon,
} from "../icons";

const {
  showMarketplaceCartBag,
  getMarketplaceItemIntoCartBag,
  marketplaceCartBagItems,
} = inject<any>("provider");

const blockChainNetworks = [
  {
    id: "Ethereum",
    name: "Ethereum",
    icon: false,
  },
  {
    id: "Solana",
    name: "Solana",
    icon: false,
  },
  {
    id: "Polygon",
    name: "Polygon",
    icon: false,
  },
];

const timeDurations = [
  {
    id: "5 Minutes",
    name: "5 Minutes",
    icon: false,
  },
  {
    id: "30 Minutes",
    name: "30 Minutes",
    icon: false,
  },
  {
    id: "1 Hour",
    name: "1 Hour",
    icon: false,
  },
  {
    id: "6 Hours",
    name: "6 Hours",
    icon: false,
  },
  {
    id: "Day",
    name: "Day",
    icon: false,
  },
  {
    id: "Week",
    name: "Week",
    icon: false,
  },
  {
    id: "Month",
    name: "Month",
    icon: false,
  },
];
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
const collectionContainerRef = ref<any>(null);
const showTableNavigationButton = ref<boolean>(false);
const scrollByVisibility = ref<number>(0);
const scrollByVisibilityPercentage = ref<number>(0);
const isActiveBlockChain = ref<string>("Ethereum");
const isActiveTime = ref<string>("Day");

const changeBlockChainNetwork = (blockChainNetwork: { id: string }) => {
  isActiveBlockChain.value = blockChainNetwork.id;
  console.log(`Get NFTs on ${isActiveBlockChain.value} blockchain`);
};
const changeTimeDuration = (timeDuration: { id: string }) => {
  isActiveTime.value = timeDuration.id;
  console.log(`Time duration in ${isActiveTime.value} ago`);
};
const trackMarketplaceItemInfo = ref({
  id: 0,
  address: "",
});
const showAddToCartButtonCallback = (itemInfo: {
  tokenId: number;
  tokenAddress: string;
}) => {
  const { tokenId, tokenAddress } = itemInfo;
  trackMarketplaceItemInfo.value = {
    id: tokenId,
    address: tokenAddress,
  };
};
const scrollBarCallback = (direction: string) => {
  const { offsetWidth, scrollWidth, children } = collectionContainerRef.value;
  const collectionItemWidth = children[0].offsetWidth;

  const scrollByIndex =
    direction == "forward" ? collectionItemWidth : -collectionItemWidth;
  collectionContainerRef.value.scrollBy({
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
  <div class="relative w-full py-10 text-gray-700 dark:text-darkTheme-text">
    <div class="flex flex-col">
      <div
        :class="{
          'lg:grid-rows-none lg:grid-flow-row lg:grid-cols-8':
            !showMarketplaceCartBag,
        }"
        class="grid xs:grid-cols-1 xs:grid-flow-row grid-cols-3 md:grid-rows-2 gap-4 pb-4"
      >
        <div
          :class="{ 'lg:col-span-3': !showMarketplaceCartBag }"
          class="col-span-2"
        >
          <span class="text-2xl font-semibold dark:text-darkTheme-text-b">
            Hot Collections
          </span>
        </div>
        <div class="xs:col-span-2 inline-grid">
          <ButtonDropdown
            @selection-action="changeTimeDuration"
            :listOfOptions="timeDurations"
            :isActiveOption="isActiveTime"
          >
          </ButtonDropdown>
        </div>
        <span
          :class="{ 'lg:col-auto': !showMarketplaceCartBag }"
          class="xs:col-span-2 col-auto inline-grid"
        >
          <ButtonDropdown
            @selection-action="changeBlockChainNetwork"
            :listOfOptions="blockChainNetworks"
            :isActiveOption="isActiveBlockChain"
          >
          </ButtonDropdown>
        </span>
        <div
          :class="{ 'lg:col-span-3': !showMarketplaceCartBag }"
          class="col-span-2 inline-grid"
        >
          <div class="flex flex-row items-center justify-start">
            <span class="whitespace-nowrap mx-2 text-sm">Floor price</span>
            <div class="w-full flex flex-shrink max-w-full items-center">
              <ButtonInput
                input-type="number"
                place-holdertext="Min"
                class="flex-auto"
              />
              <div
                class="bg-gray-300 dark:bg-darkTheme-text mx-3 h-1 w-10 block"
              ></div>
              <ButtonInput
                input-type="number"
                place-holdertext="Max"
                class="flex-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full relative lg:pt-6">
        <div class="flex flex-col">
          <div
            class="lmax:hidden relative w-full flex justify-start text-sm text-gray-400 dark:text-darkTheme-text pl-8 pr-2.5 pb-4"
          >
            <div class="w-3/12">Collection</div>
            <div class="w-2/12">{{ isActiveTime }} volume</div>
            <div class="w-2/12">Floor price</div>
          </div>

          <div
            class="relative w-full h-auto overflow-hidden lg:border lg:dark:border-darkTheme-border rounded-2xl"
          >
            <div
              class="sf:w-full lmax:w-1/2 lmax:inline-flex sf:border-none lg:border-none border-solid border-transparent border-x-8 border-t-8"
            >
              <div
                class="w-[99%] lmax:w-full lmax:border lmax:overflow-hidden lmax:dark:border-darkTheme-border flex lmax:flex-col flex-row justify-start lmax:p-5 sf:p-4 lmax:gap-5 py-1 pl-8 pr-2.5 rounded-2xl lg:hover:bg-gray-50 lg:dark:hover:bg-darkTheme-200 cursor-pointer lg:mx-auto my-1.5"
              >
                <router-link
                  :to="{
                    path: '/collection/Art BLocks x Pace',
                  }"
                  class="w-3/12 lmax:w-full flex lmax:justify-between items-center dark:text-darkTheme-text-b"
                >
                  <div class="w-full sm:w-[90%] flex items-center gap-4">
                    <div
                      class="animate-pulse h-14 w-14 min-w-[56px] rounded-xl bg-gray-200 dark:bg-darkTheme-bg-0.08"
                      title="Contract address"
                    ></div>
                    <div
                      class="text-lg font-semibold truncate"
                      title="Art BLocks x Pace"
                    >
                      Art BLocks x Pace
                    </div>
                  </div>
                  <ArrowRightIcon class="lg:hidden" />
                </router-link>
                <div
                  class="lg:hidden w-full flex justify-start text-sm text-gray-400 dark:text-darkTheme-text pt-1.5"
                >
                  <div class="w-1/2">{{ isActiveTime }} volume</div>
                  <div class="w-1/2">Floor price</div>
                </div>
                <router-link
                  :to="{
                    path: '/collection/Art BLocks x Pace',
                  }"
                  class="w-4/12 lmax:w-full flex flex-row justify-start mx-auto lmax:-mt-3"
                >
                  <div
                    class="w-1/2 lmax:inline-flex flex flex-col my-auto"
                    title="400.9 ETH"
                  >
                    <div class="flex items-center">
                      <div class="flex items-end">
                        <span
                          class="text-2xl font-semibold dark:text-darkTheme-text-b"
                          >400.9</span
                        >
                        <span class="px-1 text-gray-400 text-sm font-medium"
                          >ETH</span
                        >
                      </div>
                    </div>
                    <span class="text-green-500 text-sm font-semibold"
                      >+45,001.8%</span
                    >
                  </div>
                  <div
                    class="w-1/2 lmax:inline-flex flex items-center"
                    title="0.45 ETH"
                  >
                    <div class="flex items-end">
                      <span
                        class="font-semibold text-2xl dark:text-darkTheme-text-b"
                        >0.45</span
                      >
                      <span class="px-1 text-gray-400 text-sm font-medium"
                        >ETH</span
                      >
                    </div>
                  </div>
                </router-link>
                <div
                  class="relative w-5/12 lmax:w-full overflow-hidden"
                  v-on:mouseover="showTableNavigationButton = true"
                  v-on:mouseout="showTableNavigationButton = false"
                >
                  <div
                    @click="scrollBarCallback('forward')"
                    v-show="
                      showTableNavigationButton &&
                      scrollByVisibilityPercentage < 90
                    "
                    class="absolute h-full flex right-3 z-10 items-center"
                  >
                    <span
                      class="bg-white border border-white shadow-3xl dark:shadow-3xl-dark dark:border-darkTheme-border dark:bg-darkTheme rounded-2xl p-2 m-auto transition-all hover:scale-110 active:scale-100"
                    >
                      <chevron-down-icon class="rotate-[270deg]" />
                    </span>
                  </div>
                  <div
                    @click="scrollBarCallback('backward')"
                    v-show="showTableNavigationButton && scrollByVisibility > 0"
                    class="absolute h-full flex left-3 z-10 items-center"
                  >
                    <span
                      class="bg-white border border-white -shadow-3xl dark:-shadow-3xl-dark dark:border-darkTheme-border dark:bg-darkTheme rounded-2xl p-2 m-auto transition-all hover:scale-110 active:scale-100"
                    >
                      <chevron-down-icon class="rotate-[90deg]" />
                    </span>
                  </div>
                  <div
                    ref="collectionContainerRef"
                    class="hide-horizontal__scrollbar relative w-full h-auto flex flex-row space-x-4 items-center lmax:ml-1 lg:p-1 overflow-x-auto snap-x snap-mandatory"
                  >
                    <div
                      v-for="token in NFTTokensInCollection"
                      :key="token.tokenId"
                      :title="'Add NFT to your cart bag'"
                      :class="{
                        'hover:ring hover:ring-offset-0 hover:ring-gray-200 dark:hover:ring-darkTheme-200':
                          !isMarketItemFoundInCartBagItems(
                            token,
                            marketplaceCartBagItems
                          ),
                        'ring ring-white ring-offset-0':
                          isMarketItemFoundInCartBagItems(
                            token,
                            marketplaceCartBagItems
                          ),
                      }"
                      class="snap-start animate-pulse relative w-[100px] h-[100px] min-w-[100px] bg-gray-100 dark:bg-darkTheme-bg-0.08 rounded-xl hover:transition-all lmax:my-1"
                      v-on:mouseenter="showAddToCartButtonCallback(token)"
                      v-on:mouseleave="
                        showAddToCartButtonCallback({
                          tokenId: 0,
                          tokenAddress: '',
                        })
                      "
                      @click="
                        getMarketplaceItemIntoCartBag({
                          token_address: token.tokenAddress,
                          token_id: token.tokenId,
                          token_price: token.tokenPrice,
                          token_name: token.tokenName,
                        })
                      "
                    >
                      <div
                        v-show="
                          isMarketItemFoundInCartBagItems(
                            token,
                            marketplaceCartBagItems
                          )
                        "
                        class="absolute rounded-full bg-darkTheme dark:bg-white text-white dark:text-black p-1.5 right-0 m-1 z-10"
                      >
                        <TickCheckIcon class="w-5 h-5" />
                      </div>
                      <div
                        v-show="
                          trackMarketplaceItemInfo.id == token.tokenId &&
                          trackMarketplaceItemInfo.address ==
                            token.tokenAddress &&
                          !isMarketItemFoundInCartBagItems(
                            token,
                            marketplaceCartBagItems
                          )
                        "
                        class="absolute border dark:border-darkTheme-border rounded-full bg-gray-200 text-white dark:bg-darkTheme-hover p-1 right-0 m-1"
                      >
                        <add-to-cart-icon />
                      </div>
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-[95%] mx-0.5 h-auto text-gray-100 text-xs p-1 bottom-1.5 whitespace-nowrap text-center space-x-1"
                      >
                        <span>ico</span>
                        <span>{{ token.tokenPrice }} ETH</span>
                      </div>
                    </div>
                    <div
                      class="snap-start relative w-[100px] h-[100px] min-w-[100px] flex justify-center items-center lmax:my-1"
                    >
                      <router-link
                        :to="{
                          path: '/collection/Art BLocks x Pace',
                        }"
                        ><ArrowRightIcon
                      /></router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ButtonMiscellenous
            :has-list-content="false"
            class="bg-gray-100 rounded-2xl hover:bg-gray-200 py-3 dark:bg-darkTheme-bg dark:hover:bg-darkTheme-hover mt-3"
            >View All Collections</ButtonMiscellenous
          >
        </div>
      </div>
    </div>
  </div>
</template>
