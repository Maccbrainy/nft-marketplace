<script setup lang="ts">
import {
  AddToCartIcon,
  LikeIcon,
  ShareIcon,
  RefreshIcon,
  MenuDotsIcon,
} from "@/components/icons";
import { ButtonMiscellenous } from "@/components/buttonui";
const imageUrl = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9IjE0MDkzMzY3Mjg5NTciPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSJyZ2IoMCwgNjgsIDI1NSkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDI1NSwgMCwgNjgpIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0idXJsKCMxNDA5MzM2NzI4OTU3KSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIj48L3JlY3Q+CiAgPC9nPgo8L3N2Zz4=`;
</script>
<template>
  <div
    class="flex flex-col flex-wrap gap-y-5 text-gray-700 dark:text-darkTheme-text-b py-5 top-20"
  >
    <div class="w-[90%] xs:w-full flex flex-col gap-y-2 mx-auto">
      <div class="flex flex-row items-center gap-3">
        <span
          ><img
            class="rounded-lg w-7 h-7 object-cover object-center"
            :src="imageUrl"
        /></span>
        <span class="text-base font-semibold">CloneX</span>
      </div>
      <div class="font-bold text-3xl">CloneX #456897</div>
      <div
        class="flex flex-row justify-between py-5 text-gray-400 dark:text-darkTheme-text text-sm"
      >
        <div class="flex flex-row gap-4 xs:gap-2 items-center">
          <div>
            <img
              class="rounded-3xl w-12 h-12 min-w-[48px] object-cover object-center"
              :src="imageUrl"
            />
          </div>
          <div class="flex flex-col">
            <span>Creator</span>
            <span
              class="text-gray-700 dark:text-darkTheme-text-b font-semibold truncate"
              >0x7bbee...643a</span
            >
          </div>
        </div>
        <div class="flex flex-row gap-4 xs:gap-2 items-center">
          <div>
            <img
              class="rounded-3xl w-12 h-12 min-w-[48px] object-cover object-center"
              :src="imageUrl"
            />
          </div>
          <div class="flex flex-col">
            <span>Current owner</span>
            <span
              class="text-gray-700 dark:text-darkTheme-text-b font-semibold truncate"
              >0x7bbee...643a</span
            >
          </div>
        </div>
      </div>
      <hr class="dark:border-darkTheme-border" />
      <div
        class="flex flex-row flex-wrap justify-between pt-3 text-sm text-gray-400 dark:text-darkTheme-text font-medium"
      >
        <div class="flex flex-row justify-start gap-6 xs:gap-1">
          <button
            class="flex gap-1 items-center hover:bg-gray-100 hover:text-gray-600 dark:hover:text-darkTheme-text-b dark:hover:bg-darkTheme-hover rounded-lg px-3 py-1"
          >
            <LikeIcon />
            <span>6</span>
          </button>
          <button
            class="flex gap-1 items-center hover:bg-gray-100 hover:text-gray-600 dark:hover:text-darkTheme-text-b dark:hover:bg-darkTheme-hover rounded-lg px-3 py-1"
          >
            <ShareIcon />
            <span>Share</span>
          </button>
          <button
            class="flex gap-1 items-center hover:bg-gray-100 hover:text-gray-600 dark:hover:text-darkTheme-text-b dark:hover:bg-darkTheme-hover rounded-lg px-3 py-1"
          >
            <RefreshIcon />
            <span>Refresh</span>
          </button>
        </div>
        <button
          class="flex gap-1 items-center hover:bg-gray-100 hover:text-gray-600 dark:hover:text-darkTheme-text-b dark:hover:bg-darkTheme-hover rounded-lg px-3 py-1"
        >
          <MenuDotsIcon />
        </button>
      </div>
    </div>
    <div
      class="w-full flex flex-col border dark:border-darkTheme-border rounded-2xl p-6 gap-y-4 mt-2 text-sm font-medium text-gray-400 dark:text-darkTheme-text"
    >
      <div class="w-full flex xs:flex-col flex-row justify-center gap-4">
        <div
          class="w-1/2 xs:w-full flex flex-col bg-gray-100 dark:bg-darkTheme-bg rounded-xl p-4 gap-1"
        >
          <span>Price</span>
          <span
            class="text-xl text-gray-700 dark:text-darkTheme-text-b font-semibold"
            >7.96 ETH</span
          >
          <span>$12,395</span>
        </div>
        <div
          class="w-1/2 xs:w-full flex flex-col bg-gray-100 dark:bg-darkTheme-bg rounded-xl p-4 gap-1"
        >
          <span>Highest floor bid</span>
          <span
            class="text-xl text-gray-700 dark:text-darkTheme-text-b font-semibold"
            >1.96 wETH</span
          >
          <span class="whitespace-nowrap"
            >by
            <span
              class="text-gray-700 dark:text-darkTheme-text-b font-semibold truncate"
              >playboypunk.eth</span
            ></span
          >
        </div>
      </div>
      <div class="text-center">Last sale price 7.65 wETH</div>
      <div class="w-full flex flex-row gap-4">
        <ButtonMiscellenous
          :has-list-content="false"
          class="flex-auto bg-black rounded-2xl text-gray-50 font-semibold py-3 dark:bg-white dark:text-gray-700"
          >Buy now for 7.96 ETH
        </ButtonMiscellenous>
        <ButtonMiscellenous
          :has-list-content="false"
          class="flex items-center rounded-2xl justify-center bg-black text-gray-50 py-3 dark:bg-white dark:text-gray-700"
          ><AddToCartIcon class="h-5 w-5 text-white dark:text-black" />
        </ButtonMiscellenous>
      </div>
      <ButtonMiscellenous
        :has-list-content="false"
        class="w-full border rounded-2xl dark:border-darkTheme-border text-gray-700 dark:text-darkTheme-text-b py-3"
        >Place a bid
      </ButtonMiscellenous>
      <div class="text-center">Sales countdown</div>
    </div>
  </div>
</template>
