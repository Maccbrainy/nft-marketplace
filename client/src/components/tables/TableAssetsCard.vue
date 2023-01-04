<script setup lang="ts">
import { inject } from "vue";
import { RouterLink } from "vue-router";
import { AddToCartIcon, MenuDotsIcon } from "../icons";
defineProps({
  filterIsHidden: Boolean,
  viewOptionSize: String,
});
const { showMarketplaceCartBag } = inject<any>("provider");
</script>
<template>
  <RouterLink
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
    :to="{
      path: '/token/0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b:9875',
    }"
  >
    <li class="transition-all transform hover:-translate-y-1">
      <div
        class="border dark:border-darkTheme-border rounded-xl hover:ring-4 hover:ring-offset-0 hover:ring-gray-100 dark:ring-darkTheme-bg cursor-pointer"
      >
        <div class="w-full p-2 flex flex-col gap-1">
          <div class="relative w-full flex justify-center items-end">
            <img
              class="w-full h-full min-h-[180px] object-center object-cover bg-gray-100 dark:bg-darkTheme-bg rounded-lg"
              src="https://assets.raribleuserdata.com/prod/v1/image/t_image_big/aHR0cHM6Ly9jbG9uZXgtYXNzZXRzLnJ0Zmt0LmNvbS9pbWFnZXMvOTg3NS5wbmc="
            />
            <div
              class="absolute flex flex-row justify-around bottom-2 gap-4 z-10 text-white text-xs font-medium"
            >
              <div
                class="bg-black dark:bg-white dark:text-black rounded-xl py-2.5 px-3"
              >
                Buy Now
              </div>
              <div
                class="flex justify-center items-center bg-black dark:bg-white dark:text-black rounded-xl py-1 px-2"
              >
                <add-to-cart-icon class="dark:text-black" />
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
                class="text-sm"
              >
                Clone X
              </h2>
              <div
                class="text-base font-semibold text-gray-700 dark:text-darkTheme-text-b truncate"
              >
                Clone X #123432
              </div>
            </div>
            <button
              v-show="viewOptionSize === 'smallerViewOption'"
              class="hover:bg-gray-100 hover:text-gray-600 dark:hover:text-darkTheme-text-b dark:hover:bg-darkTheme-hover rounded-full p-1"
            >
              <menu-dots-icon />
            </button>
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
                >7.99 ETH</span
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
  </RouterLink>
</template>
