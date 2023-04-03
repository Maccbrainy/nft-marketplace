<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { ref, markRaw, inject, computed } from "vue";
import { BaseLayout } from "./layouts";
import MarketplaceCartBag from "./components/MarketplaceCartBag.vue";
import {
  ModalProfileMenuBar,
  ModalSideBarMenuBar,
  ModalAssetFilters,
  ModalSettingsUpdateToast,
} from "./components/teleport-modal";
import {
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
const route = useRoute();
const {
  isActiveThemeSkin,
  changeThemeSkinCallback,
  chooseHowToConnectWallet,
  showMarketplaceCartBag,
  currentAccount,
  teleportModalCallback,
  serviceDiscoveryAndDelivery,
} = inject<any>("provider");
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
const matchedRoutesComposable = computed<boolean>(
  () => 
    route.meta.name === "CollectionPage" ||
    route.name === "HomePage" ||
    route.meta.name === "ExploreBlockchainNFTS" ||
    route.meta.name === "itemsOwnedPage"
);
</script>
<template>
  <BaseLayout class="bg-white dark:bg-darkTheme w-full min-h-screen">
    <template #header>
      <nav
        v-show="$route.name != 'ConnectWalletPage'"
        class="fixed w-full top-0 inset-x-0 bottom-auto max-w-screen-2xl h-20 flex justify-between items-center gap-4 flex-nowrap text-black dark:text-darkTheme-text bg-[rgba(255,255,255,0.69)] dark:bg-[rgba(25,28,31,0.95)] backdrop-blur-lg font-medium text-base px-4 sm:px-6 md:px-7 lg:px-8 mx-auto z-20"
      >
        <div class="flex flex-row items-center space-x-8 xs:space-x-2">
          <RouterLink to="/" class="dark:text-white text-xl font-bold"
            >InterestQQ</RouterLink
          >
          <button-input
            class="mf:hidden min-w-[320px] max-w-md"
            input-type="search"
            place-holdertext="Search Web3"
            :is-text-area="false"
          />
          <search-icon />
        </div>
        <ul class="flex items-center gap-10 mmf:hidden">
          <li class="cursor-pointer">Explore</li>
          <li><RouterLink to="/create">Create</RouterLink></li>
        </ul>
        <div class="flex justify-center items-center gap-5 xs:gap-2.5">
          <div
            v-if="currentAccount"
            @click="
              teleportModalCallback({
                name: 'isProfileMenuBar',
                open_modal: true,
              })
            "
            class="w-10 h-10 rounded-full bg-gray-200 cursor-pointer overflow-hidden"
          >
            <img
              v-if="serviceDiscoveryAndDelivery.avatarImageUrl"
              class="w-full h-full object-top object-cover min-h-full min-w-full"
              :src="serviceDiscoveryAndDelivery.avatarImageUrl"
            />
          </div>
          <ButtonMiscellenous
            v-on:click="chooseHowToConnectWallet($route.redirectedFrom?.path)"
            :has-list-content="false"
            class="mmf:hidden font-semibold text-xs rounded-2xl py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-black"
            v-else
            >Connect wallet</ButtonMiscellenous
          >
          <shopping-bag-icon />
          <menu-bar-icon />
        </div>
      </nav>
    </template>
    <template #default>
      <section
        :class="{
          'pt-20 px-4 sm:px-6 md:px-7 lg:px-8 pb-10':
            $route.name != 'ConnectWalletPage',
        }"
        class="relative w-full max-w-screen-2xl min-h-screen flex gap-4 m-auto dark:text-darkTheme-text-b"
      >
        <div
          :class="{
            'w-[71%] lf:w-full':
              showMarketplaceCartBag && matchedRoutesComposable,
            'w-full': !showMarketplaceCartBag || !matchedRoutesComposable,
          }"
        >
          <RouterView />
          <modal-profile-menu-bar />
          <modal-side-bar-menu-bar />
          <modal-asset-filters />
          <modal-settings-update-toast />
        </div>
        <marketplace-cart-bag />
      </section>
    </template>
    <template #footer>
      <section
        v-show="$route.name != 'ConnectWalletPage'"
        class="w-full max-w-screen-2xl relative px-4 sm:px-6 md:px-7 lg:px-8 mx-auto pb-8"
      >
        <div class="border-t dark:border-darkTheme-border w-full pb-4"></div>
        <div
          class="relative w-full flex justify-between items-center gap-3 text-gray-500 text-sm dark:text-darkTheme-text py-1"
        >
          <p>InterestQQ 2023</p>
          <ButtonDropdown
            class="bottom-14 right-0"
            @selection-action="changeThemeSkinCallback"
            :listOfOptions="themeTypes"
            :isActiveOption="isActiveThemeSkin"
          ></ButtonDropdown>
        </div>
      </section>
    </template>
  </BaseLayout>
</template>
