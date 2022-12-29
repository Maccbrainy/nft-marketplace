<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { ref, markRaw, inject, computed } from "vue";
import BaseLayout from "./layouts/BaseLayout.vue";
import {
  CloseIcon,
  DarkThemeIcon,
  LightThemeIcon,
  MenuBarIcon,
  SearchIcon,
  ShoppingBagIcon,
} from "./components/icons";
import {
  ButtonDropdown,
  ButtonInput,
  ButtonMiscellenous,
} from "@/components/buttonui";
import TeleportModal from "./components/TeleportModal.vue";
const {
  isActiveThemeSkin,
  changeThemeSkinCallback,
  chooseHowToConnectWallet,
  teleportModalCallback,
  showMarketplaceCartBagCallback,
  showMarketplaceCartBag
} = inject<any>("provider");
const route = useRoute();
const themeTypes = ref([
  {
    id: "lightTheme",
    name: "Light",
    icon: markRaw(LightThemeIcon),
  },
  {
    id: "darkTheme",
    name: "Dark",
    icon: markRaw(DarkThemeIcon),
  },
]);
const matchedRoutes = computed<boolean>(
  () =>
    route.matched[0].path == "/collection/:id/:slug?" ||
    route.name == "HomePage"
);
</script>
<template>
  <BaseLayout class="bg-white dark:bg-darkTheme w-full min-h-screen">
    <template #header>
      <nav
        v-show="route.name != 'ConnectWalletPage'"
        class="fixed w-full top-0 inset-x-0 bottom-auto max-w-screen-2xl h-20 flex justify-between items-center gap-4 flex-nowrap text-gray-700 dark:text-darkTheme-text bg-[#ffffffb1] dark:bg-darkTheme backdrop-blur-lg font-medium text-base px-4 sm:px-6 md:px-7 lg:px-8 mx-auto z-20"
      >
        <div class="flex flex-row items-center space-x-8">
          <RouterLink to="/">Logo</RouterLink>
          <ButtonInput
            class="mf:hidden min-w-[320px] max-w-md"
            input-type="search"
            place-holdertext="Search Web3"
          />
          <search-icon />
        </div>
        <ul class="flex items-center gap-10 mmf:hidden">
          <li class="cursor-pointer">Explore</li>
          <li><RouterLink to="/create">Create</RouterLink></li>
        </ul>
        <div class="flex items-center gap-8">
          <ButtonMiscellenous
            v-on:click="chooseHowToConnectWallet($route.redirectedFrom?.path)"
            :has-list-content="false"
            class="mmf:hidden text-xs rounded-2xl py-3 bg-gray-900 dark:bg-white dark:text-gray-700 hover:bg-black text-darkTheme-text-b"
            >Connect wallet</ButtonMiscellenous
          >
          <ShoppingBagIcon
            @click="showMarketplaceCartBagCallback"
            class="dark:text-darkTheme-text-b cursor-pointer font-bold"
          />
          <menu-bar-icon
            @click="
              teleportModalCallback({
                name: 'isMenuBar',
                open_modal: true,
              })
            "
            class="md:hidden"
          />
        </div>
      </nav>
    </template>
    <template #default>
      <section
        :class="{
          'pt-20 px-4 sm:px-6 md:px-7 lg:px-8 pb-10':
            route.name != 'ConnectWalletPage',
        }"
        class="relative w-full max-w-screen-2xl min-h-screen flex gap-4 m-auto dark:text-darkTheme-text-b"
      >
        <div
          :class="{
            'w-[72%] lf:w-full': showMarketplaceCartBag && matchedRoutes,
            'w-full': !showMarketplaceCartBag || !matchedRoutes,
          }"
        >
          <RouterView />
        </div>
        <div
          :class="{
            'sticky top-20 sf:top-0 mb-5 border dark:border-darkTheme-border lf:fixed lf:z-30 lf:right-0 sm:shadow-2xl lf:border-none sm:mr-5':
              showMarketplaceCartBag && matchedRoutes,
            hidden: !showMarketplaceCartBag,
            'fixed z-30 dark:border-darkTheme-border right-0 shadow-2xl mr-5':
              showMarketplaceCartBag && !matchedRoutes,
          }" class="w-full h-full sf:pt-3 sm:w-[28%] sm:min-w-[320px] sm:h-[85vh] sm:rounded-2xl overflow-y-auto dark:text-white animate-slide-in-right"
        >
          <div class="relative w-full h-full flex flex-col gap-8 p-6 bg-white dark:bg-darkTheme">
            <close-icon
              @click="showMarketplaceCartBagCallback"
              class="absolute right-3 top-3"
            />
            <div class="flex flex-col gap-2.5">
              <h1 class="font-semibold text-2xl pr-4">
                So much space for NFTs!
              </h1>
              <p class="text-base text-gray-500 dark:text-darkTheme-text">
                Add NFTs to your bag to check out and get hold of them.
              </p>
            </div>
            <ButtonMiscellenous
              :has-list-content="false"
              class="w-full flex justify-center bg-gray-100 hover:bg-gray-200 dark:bg-darkTheme-bg dark:hover:bg-darkTheme-hover items-center h-12 text-base text-gray-800 dark:text-white font-semibold rounded-2xl py-3"
              >Explore Ethereum NFTs</ButtonMiscellenous
            >
          </div>
        </div>
      </section>
      <teleport-modal />
    </template>
    <template #footer>
      <section
        v-show="route.name != 'ConnectWalletPage'"
        class="w-full max-w-screen-2xl relative px-4 sm:px-6 md:px-7 lg:px-8 mx-auto pb-8"
      >
        <div class="border-t dark:border-darkTheme-border w-full pb-4"></div>
        <div
          class="relative w-full flex justify-between items-center text-gray-500 text-sm dark:text-darkTheme-text py-1"
        >
          <p>@Cryptop NFT 2022</p>
          <ButtonDropdown
            class="bottom-14"
            @selection-action="changeThemeSkinCallback"
            :listOfOptions="themeTypes"
            :isActiveOption="isActiveThemeSkin"
          ></ButtonDropdown>
          <p>All right reserved</p>
        </div>
      </section>
    </template>
  </BaseLayout>
</template>
