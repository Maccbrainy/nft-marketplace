<script setup lang="ts">
import { inject, ref } from "vue";
import { CloseIcon, CancelIcon } from "./icons";
import { ButtonMiscellenous } from "./buttonui";
const {
  showMarketplaceCartBagCallback,
  showMarketplaceCartBag,
  matchedRoutesComposable,
  marketplaceCartBagItems,
  removeAllItemsFromMarketplaceCartBag,
  getMarketplaceItemIntoCartBag,
} = inject<any>("provider");
const marketplaceCartBagItem = ref({
  id: 0,
  address: "",
});
const showCartItemRemoveButton = (item: {
  token_id: number;
  token_address: string;
}) => {
  const { token_id, token_address } = item;
  marketplaceCartBagItem.value = {
    id: token_id,
    address: token_address,
  };
};
</script>
<template>
  <div
    :class="{
      'sticky top-20 sf:top-0 mb-5 border dark:border-darkTheme-border lf:fixed lf:z-30 lf:right-0 lf:border-none':
        showMarketplaceCartBag && matchedRoutesComposable,
      hidden: !showMarketplaceCartBag,
      'fixed z-30 dark:border-darkTheme-border right-0':
        showMarketplaceCartBag && !matchedRoutesComposable,
    }"
    class="w-full h-full bg-white dark:bg-darkTheme sm:w-[29%] sm:min-w-[360px] sm:h-[85vh] lf:shadow-2xl sm:rounded-2xl overflow-y-auto dark:text-white animate-slide-in-right"
  >
    <div class="relative w-full h-full flex flex-col gap-8">
      <div
        v-show="marketplaceCartBagItems.length == 0"
        class="flex flex-col gap-8 p-6"
      >
        <close-icon
          @click="showMarketplaceCartBagCallback"
          class="absolute right-3 top-3 z-10"
        />
        <div class="flex flex-col gap-2.5">
          <h1 class="font-semibold text-2xl pr-4">So much space for NFTs!</h1>
          <p class="text-base text-gray-500 dark:text-darkTheme-text">
            Add NFTs to your bag to check out and get hold of them.
          </p>
        </div>
        <button-miscellenous
          :has-list-content="false"
          class="w-full flex justify-center bg-gray-100 hover:bg-gray-200 dark:bg-darkTheme-bg dark:hover:bg-darkTheme-hover items-center h-12 text-base text-gray-800 dark:text-white font-semibold rounded-2xl py-3"
          >Explore Ethereum NFTs</button-miscellenous
        >
      </div>
      <div
        v-show="marketplaceCartBagItems.length > 0"
        class="relative w-full h-full flex flex-col justify-between"
      >
        <div class="relative w-full flex flex-col">
          <header
            class="w-full h-full sticky top-0 pl-6 pr-4 py-4 bg-[#ffffffb1] backdrop-blur-lg dark:bg-darkTheme flex flex-row justify-between items-center text-black dark:text-white z-20"
          >
            <div
              class="flex flex-row justify-center items-center gap-3 flex-nowrap font-semibold"
            >
              <span class="text-xl">Bag</span>
              <span
                class="bg-red-500 rounded-md py-0.5 px-2 text-xs text-white"
                >{{ marketplaceCartBagItems.length }}</span
              >
              <button-miscellenous
                @click="removeAllItemsFromMarketplaceCartBag"
                :has-list-content="false"
                class="text-sm dark:text-darkTheme-text"
                >Clear all</button-miscellenous
              >
            </div>
            <close-icon @click="showMarketplaceCartBagCallback" />
          </header>
          <main class="relative w-full flex flex-col px-3">
            <div
              v-for="item in marketplaceCartBagItems"
              :key="item.token_id + item.token_address"
              v-on:mouseenter="showCartItemRemoveButton(item)"
              v-on:mouseleave="
                showCartItemRemoveButton({ token_id: 0, token_address: '' })
              "
              class="relative w-full h-full flex flex-row justify-between items-center text-base font-medium hover:bg-gray-50 dark:hover:bg-darkTheme-200 p-3 rounded-xl cursor-pointer transition-all active:scale-95"
            >
              <div class="relative w-8/12 flex flex-row gap-2.5 items-center">
                <div
                  class="relative w-14 h-14 bg-gray-100 dark:bg-darkTheme-bg-0.08 rounded-xl"
                >
                  <div
                    @click="
                      getMarketplaceItemIntoCartBag({
                        token_address: item.token_address,
                        token_id: item.token_id,
                        token_price: item.token_price,
                        token_name: item.token_name,
                      })
                    "
                    class="lmin:hidden bg-white text-black rounded-full absolute -top-1 -right-1 z-10 p-1"
                  >
                    <cancel-icon class="w-4 h-4" />
                  </div>
                </div>
                <div class="w-8/12 flex flex-col gap-1.5">
                  <span class="truncate">{{
                    `${item.token_name} #${item.token_id}`
                  }}</span>
                  <span
                    class="flex flex-row flex-nowrap items-center text-xs space-x-1 font-normal"
                  >
                    <span class="dark:text-darkTheme-text">OpenSea</span>
                    <span
                      class="bg-gray-100 dark:bg-darkTheme-bg dark:text-darkTheme-text rounded-lg py-0.5 px-1.5"
                      >{{ `#${item.token_id}` }}</span
                    >
                  </span>
                </div>
              </div>
              <div
                :class="{
                  'lmin:hidden':
                    marketplaceCartBagItem.id == item.token_id &&
                    marketplaceCartBagItem.address == item.token_address,
                }"
                class="flex flex-row flex-nowrap space-x-1"
              >
                <span>{{ item.token_price }}</span>
                <span>ETH</span>
              </div>
              <button
                v-show="
                  marketplaceCartBagItem.id == item.token_id &&
                  marketplaceCartBagItem.address == item.token_address
                "
                @click="
                  getMarketplaceItemIntoCartBag({
                    token_address: item.token_address,
                    token_id: item.token_id,
                    token_price: item.token_price,
                    token_name: item.token_name,
                  })
                "
                class="mf:hidden absolute flex gap-1 items-center justifty-center bg-gray-100 hover:bg-gray-200 py-3 dark:bg-darkTheme-bg dark:hover:bg-darkTheme-hover rounded-xl px-3 text-xs right-2 transition-all active:scale-95 dark:shadow-2xl"
              >
                <cancel-icon class="w-4 h-4" />
                <span>Remove</span>
              </button>
            </div>
          </main>
        </div>
        <footer
          class="bg-[#ffffffb1] backdrop-blur-lg dark:bg-darkTheme w-full flex flex-col gap-3 sticky bottom-0 px-6 py-4 z-10"
        >
          <div
            class="flex flex-nowrap justify-between items-center bg-gray-100 dark:bg-darkTheme-bg rounded-xl px-4 py-3 font-semibold text-lg"
          >
            <span>Total</span>
            <span>123.55 ETH</span>
          </div>
          <button-miscellenous
            :has-list-content="false"
            :computed-list-content="false"
            class="font-semibold rounded-2xl py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-black"
            >Check out</button-miscellenous
          >
        </footer>
      </div>
    </div>
  </div>
</template>
