<script setup lang="ts">
import { inject, ref } from "vue";
import { RouterLink } from "vue-router";
import { isMarketItemFoundInCartBagItems } from "@/utils";
import {
  AddToCartIcon,
  MenuDotsIcon,
  CancelIcon,
  TickCheckIcon,
} from "../icons";
import { ButtonMiscellenous } from "../buttonui";
const props = defineProps({
  filterIsHidden: Boolean,
  viewOptionSize: String,
  assetInfo: {
    type: Object,
    required: true,
  },
});
const collectionMenuList = [
  { id: "BuyNow", name: "Buy now", icon: false },
  { id: "AddToBag", name: "Add to bag", icon: false },
];
const {
  showMarketplaceCartBag,
  getMarketplaceItemIntoCartBag,
  marketplaceCartBagItems,
} = inject<any>("provider");

const showBuyAndAddToCardButton = ref<boolean>(false);
const isActiveMenuAction = ref<string>(collectionMenuList[0].id);

const collectionMenuAction = (option: { id: string }) => {
  isActiveMenuAction.value = option.id;
  if (isActiveMenuAction.value == collectionMenuList[1].id) {
    getMarketplaceItemIntoCartBag({
      token_address: props.assetInfo.tokenAddress,
      token_id: props.assetInfo.tokenId,
      token_price: props.assetInfo.tokenPrice,
      token_name: props.assetInfo.tokenName,
    });
  }
  console.log(`${option.id}`);
};
</script>
<template>
  <div
    :class="{
      'sm:w-6/12 md:w-4/12 lg:w-3/12':
        filterIsHidden &&
        viewOptionSize === 'largerViewOption' &&
        !showMarketplaceCartBag,
      'sm:w-full md:w-6/12 lg:w-4/12':
        !filterIsHidden &&
        viewOptionSize === 'largerViewOption' &&
        !showMarketplaceCartBag,
      'sm:w-full md:w-6/12 lg:w-4/12 xl:w-4/12':
        !filterIsHidden &&
        viewOptionSize === 'largerViewOption' &&
        showMarketplaceCartBag,
      'sm:w-6/12 md:w-4/12 lg:w-4/12':
        filterIsHidden &&
        viewOptionSize === 'largerViewOption' &&
        showMarketplaceCartBag,
      'w-[50%] sm:w-[33%] md:w-[25%] lg:w-[20%] xl:w-[16.5%]':
        filterIsHidden &&
        viewOptionSize === 'smallerViewOption' &&
        !showMarketplaceCartBag,
      'w-[100%] sm:w-[50%] md:w-[33%] lg:w-[25%] xl:w-[20%]':
        !filterIsHidden &&
        viewOptionSize === 'smallerViewOption' &&
        !showMarketplaceCartBag,
      'w-[100%] sm:w-[50%] md:w-[33%] lg:w-[33%] xl:w-[33%]':
        !filterIsHidden &&
        viewOptionSize === 'smallerViewOption' &&
        showMarketplaceCartBag,
      'w-[50%] sm:w-[33%] md:w-[25%] lg:w-[20%] xl:w-[20%]':
        filterIsHidden &&
        viewOptionSize === 'smallerViewOption' &&
        showMarketplaceCartBag,
    }"
    class="w-full h-auto border-solid border-transparent border-x-8 border-t-8 mt-1.5"
  >
    <li
      v-on:mouseenter="showBuyAndAddToCardButton = true"
      v-on:mouseleave="showBuyAndAddToCardButton = false"
    >
      <div
        class="border transition-all dark:border-darkTheme-border rounded-xl hover:ring-4 hover:ring-offset-0 hover:ring-gray-100 dark:ring-darkTheme-bg cursor-pointer"
      >
        <div class="w-full p-2 flex flex-col gap-1">
          <div class="relative w-full flex justify-center items-end">
            <div
              v-show="
                isMarketItemFoundInCartBagItems(
                  {
                    tokenId: assetInfo.tokenId,
                    tokenAddress: assetInfo.tokenAddress,
                  },
                  marketplaceCartBagItems
                )
              "
              class="absolute rounded-full bg-darkTheme dark:bg-white text-white dark:text-black p-1.5 top-0 right-0 m-1"
            >
              <TickCheckIcon class="w-5 h-5" />
            </div>
            <router-link
              :to="{
                path: `/token/${assetInfo.tokenAddress}:${assetInfo.tokenId}`,
              }"
            >
              <img
                class="w-full h-full min-h-[180px] object-center object-cover bg-gray-100 dark:bg-darkTheme-bg rounded-lg"
                src="https://assets.raribleuserdata.com/prod/v1/image/t_image_big/aHR0cHM6Ly9jbG9uZXgtYXNzZXRzLnJ0Zmt0LmNvbS9pbWFnZXMvOTg3NS5wbmc="
              />
            </router-link>
            <div
              v-show="showBuyAndAddToCardButton"
              class="absolute flex flex-row justify-around bottom-2 gap-4 text-white text-xs font-medium"
            >
              <div
                class="bg-black dark:bg-white dark:text-black rounded-xl py-2.5 px-3 transition-all active:scale-95"
              >
                Buy Now
              </div>
              <div
                @click="
                  getMarketplaceItemIntoCartBag({
                    token_address: assetInfo.tokenAddress,
                    token_id: assetInfo.tokenId,
                    token_price: assetInfo.tokenPrice,
                    token_name: assetInfo.tokenName,
                  })
                "
                class="flex justify-center items-center bg-black dark:bg-white dark:text-black rounded-xl py-1 px-2 transition-all active:scale-95"
              >
                <CancelIcon
                  v-if="
                    isMarketItemFoundInCartBagItems(
                      {
                        tokenId: assetInfo.tokenId,
                        tokenAddress: assetInfo.tokenAddress,
                      },
                      marketplaceCartBagItems
                    )
                  "
                  class="w-5 h-5"
                />
                <add-to-cart-icon class="dark:text-black" v-else />
              </div>
            </div>
          </div>
          <div
            class="w-full flex flex-row justify-between flex-nowrap items-center"
          >
            <div
              :class="{ 'px-2 pt-3': viewOptionSize === 'largerViewOption' }"
              class="w-10/12 flex flex-col px-1 text-gray-400 dark:text-darkTheme-text"
            >
              <h2
                v-show="viewOptionSize === 'largerViewOption'"
                class="text-sm truncate"
              >
                {{ assetInfo.tokenName }}
              </h2>
              <router-link
                class="text-base font-semibold text-gray-700 dark:text-darkTheme-text-b truncate"
                :to="{
                  path: `/token/${assetInfo.tokenAddress}:${assetInfo.tokenId}`,
                }"
              >
                {{ `${assetInfo.tokenName} #${assetInfo.tokenId}` }}
              </router-link>
            </div>
            <button-miscellenous
              @selection-action="collectionMenuAction"
              :list-of-options="collectionMenuList"
              :is-active-option="isActiveMenuAction"
              :has-list-content="true"
              :compute-list-content="false"
              v-show="viewOptionSize === 'smallerViewOption'"
              class="px-0 hover:bg-gray-100 hover:text-gray-600 dark:hover:text-darkTheme-text-b dark:hover:bg-darkTheme-hover rounded-full"
            >
              <menu-dots-icon class="m-1" />
            </button-miscellenous>
          </div>
          <div
            :class="{
              'bg-gray-100 dark:bg-darkTheme-bg rounded-lg mt-3 py-4 px-3':
                viewOptionSize === 'largerViewOption',
            }"
            class="w-full flex justify-around text-gray-400 dark:text-darkTheme-text text-sm px-1"
          >
            <div
              :class="{
                'w-5/12 flex-col space-y-1.5':
                  viewOptionSize === 'largerViewOption',
                'w-full text-xs flex-row space-x-2':
                  viewOptionSize === 'smallerViewOption',
              }"
              class="flex"
            >
              <span>Price</span>
              <span
                :class="{
                  'dark:text-darkTheme-text-b p-0.5':
                    viewOptionSize === 'largerViewOption',
                  'dark:text-darkTheme-text':
                    viewOptionSize === 'smallerViewOption',
                }"
                class="text-gray-700 font-semibold"
                title="7.99 ETH"
                >{{ assetInfo.tokenPrice }} ETH</span
              >
            </div>
            <div
              v-show="viewOptionSize === 'largerViewOption'"
              class="flex flex-col space-y-1.5"
            >
              <span>Highest bid</span>
              <span
                class="text-gray-700 dark:text-darkTheme-text-b font-semibold"
                title="1.99 wETH"
                >1.99 wETH</span
              >
            </div>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>
