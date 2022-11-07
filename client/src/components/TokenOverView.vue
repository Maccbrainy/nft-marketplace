<script setup lang="ts">
import { TickCheckIcon } from "@/components/icons";
import TableUtility from "@/components/TableUtility.vue";
</script>
<template>
  <div
    class="w-full flex flex-col text-gray-700 dark:text-darkTheme-text-b font-semibold text-xl py-3"
  >
    <div class="px-8 pt-6">
      <h1>Description</h1>
      <p
        class="text-gray-400 dark:text-darkTheme-text font-normal text-base py-4"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit ...
        <span class="text-gray-500 dark:text-darkTheme-text-b px-2 font-medium"
          >Show more</span
        >
      </p>
    </div>
    <div class="relative pt-7">
      <h1 class="px-8">Listings</h1>
      <div class="flex flex-col pt-3">
        <div
          class="relative w-full flex justify-start text-sm font-normal text-gray-600 dark:text-darkTheme-text-b pb-2 px-8"
        >
          <div class="w-6/12">Name</div>
          <div class="w-6/12 -ml-1.5">Price</div>
        </div>
        <div
          class="relative w-full h-auto overflow-hidden border dark:border-darkTheme-border rounded-2xl"
        >
          <div>
            <div
              class="w-full flex flex-row justify-start items-center px-8 py-5 rounded-2xl text-base font-medium hover:bg-gray-100 dark:hover:bg-darkTheme-hover cursor-pointer mx-auto"
            >
              <div class="w-6/12 flex items-center" title="">
                <div
                  class="animate-pulse h-7 w-7 rounded-full bg-gray-200"
                ></div>
                <div class="pr-2 pl-3">OpenSea</div>
              </div>
              <div class="w-6/12">
                <div class="inline-flex" title="">
                  <span>0.45</span>
                  <span class="px-1">ETH</span>
                </div>
              </div>
              <span
                class="flex items-center h-4 w-4 rounded-xl bg-black dark:bg-white"
                ><TickCheckIcon class="text-white dark:text-black"
              /></span>
            </div>
          </div>

          <div>
            <div
              class="w-full flex flex-row justify-start items-center px-8 py-5 rounded-2xl text-base font-medium hover:bg-gray-100 dark:hover:bg-darkTheme-hover cursor-pointer mx-auto"
            >
              <div class="w-6/12 flex items-center" title="">
                <div
                  class="animate-pulse h-7 w-7 rounded-full bg-gray-200"
                ></div>
                <div class="pr-2 pl-3">OpenSea</div>
              </div>
              <div class="w-6/12">
                <div class="inline-flex" title="">
                  <span>0.45</span>
                  <span class="px-1">ETH</span>
                </div>
              </div>
              <span
                class="flex items-center h-4 w-4 rounded-xl bg-black dark:bg-white"
                ><TickCheckIcon class="text-white dark:text-black"
              /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative w-full pt-7 pb-4">
      <h1 class="px-8">Latest bids</h1>
      <TableUtility />
    </div>
    <div class="relative w-full pt-7 pb-4">
      <h1 class="px-8">Details</h1>
      <div
        class="w-full h-auto flex flex-col gap-7 border dark:border-darkTheme-border dark:text-darkTheme-text rounded-2xl py-5 px-7 mt-4 text-base font-medium"
      >
        <div class="flex flex-row justify-start items-center gap-3 cursor-pointer">
          <span class="h-6 w-6 bg-gray-50 dark:bg-darkTheme-text rounded-full overflow-hidden">
            icon
          </span>
          <span>Ethereum (ERC721)</span>
          <span>icon</span>
        </div>
        <div class="flex flex-row justify-start items-center gap-3 cursor-pointer">
          <span class="h-6 w-6 bg-gray-50 dark:bg-darkTheme-text rounded-full overflow-hidden">
            icon
          </span>
          <span>View on Etherscan</span>
          <span>icon</span>
        </div>
        <div class="flex flex-row justify-start items-center gap-3 cursor-pointer">
          <span class="h-6 w-6 bg-gray-50 dark:bg-darkTheme-text rounded-full overflow-hidden">
            icon
          </span>
          <span>Open Original</span>
          <span>icon</span>
        </div>
        <hr class="dark:border-darkTheme-border"/>
        <div class="flex flex-row justify-start items-center gap-3 cursor-pointer">
          <span class="h-6 w-6 bg-gray-50 dark:bg-darkTheme-text rounded-full overflow-hidden">
            icon
          </span>
          <span>Refresh metadata</span>
          <span>icon</span>
        </div>
      </div>
    </div>
  </div>
</template>
