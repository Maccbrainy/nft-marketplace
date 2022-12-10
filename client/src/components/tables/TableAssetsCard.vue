<script setup lang="ts">
import { RouterLink } from "vue-router";
defineProps({
  filterIsHidden: Boolean,
  viewOptionSize: String,
});
</script>
<template>
  <RouterLink
    :class="{
      'sm:w-6/12 md:w-4/12 lg:w-3/12':
        filterIsHidden && viewOptionSize === 'largerViewOption',
      'sm:w-full md:w-6/12 lg:w-4/12':
        !filterIsHidden && viewOptionSize === 'largerViewOption',
      'w-[100%] sm:w-[50%] md:w-[33%] lg:w-[20%]':
        !filterIsHidden && viewOptionSize === 'smallerViewOption',
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
        <div class="p-2">
          <div class="relative w-full flex justify-center items-end">
            <img
              class="w-full h-full min-h-[180px] object-center object-cover bg-gray-100 dark:bg-darkTheme-bg rounded-lg"
              src="https://assets.raribleuserdata.com/prod/v1/image/t_image_big/aHR0cHM6Ly9jbG9uZXgtYXNzZXRzLnJ0Zmt0LmNvbS9pbWFnZXMvOTg3NS5wbmc="
            />
            <div
              class="absolute flex flex-row justify-around bottom-2 gap-4 z-10 text-white text-sm font-medium"
            >
              <div class="bg-black rounded-xl py-2.5 px-3">Buy Now</div>
              <div class="bg-black rounded-xl py-2.5 px-4">+</div>
            </div>
          </div>
          <div class="px-2 pt-3 text-gray-400 dark:text-darkTheme-text">
            <h2 class="text-sm">Clone X</h2>
            <h1
              class="text-base font-semibold text-gray-700 dark:text-darkTheme-text-b"
            >
              Clone X #123432
            </h1>
          </div>
          <div
            class="w-full flex justify-around bg-gray-100 dark:bg-darkTheme-bg rounded-lg mt-3 py-4 px-3 text-gray-400 dark:text-darkTheme-text text-sm"
          >
            <div class="w-5/12 flex flex-col space-y-1.5">
              <span>Price</span>
              <span
                class="text-gray-700 dark:text-darkTheme-text-b font-semibold"
                title="7.99 ETH"
                >7.99 ETH</span
              >
            </div>
            <div class="flex flex-col space-y-1.5">
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
