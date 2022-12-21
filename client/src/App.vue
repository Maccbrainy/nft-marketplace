<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from "vue-router";
import { ref, markRaw, inject } from "vue";
import BaseLayout from "./layouts/BaseLayout.vue";
import {
  DarkThemeIcon,
  LightThemeIcon,
  ShoppingBagIcon,
} from "./components/icons";
import {
  ButtonDropdown,
  ButtonInput,
  ButtonMiscellenous,
} from "@/components/buttonui";
const { isActiveThemeSkin, changeThemeSkin } = inject<any>("provider");
const router = useRouter();
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
const chooseHowToConnect = () => {
  router.push({
    name: "ConnectWalletPage",
  });
};
</script>
<template>
  <BaseLayout
    class="bg-white dark:bg-darkTheme min-h-screen w-full overflow-y-auto"
  >
    <template #header>
      <nav
        v-show="$route.name != 'ConnectWalletPage'"
        class="relative w-full top-0 inset-x-0 bottom-auto max-w-screen-2xl h-20 flex justify-between items-center gap-4 flex-nowrap text-gray-700 dark:text-darkTheme-text dark:bg-darkTheme backdrop-blur-lg font-medium text-base px-4 sm:px-6 md:px-7 lg:px-8 mx-auto z-20"
      >
        <div><RouterLink to="/">Logo</RouterLink></div>
        <ButtonInput
          class="min-w-[320px] max-w-md"
          input-type="search"
          place-holdertext="Search Web3"
        />
        <ul class="flex items-center gap-10">
          <li class="cursor-pointer">Explore</li>
          <li><RouterLink to="/create">Create</RouterLink></li>
        </ul>
        <div class="flex items-center gap-8">
          <ButtonMiscellenous
            v-on:click="chooseHowToConnect"
            :has-list-content="false"
            class="text-xs rounded-2xl py-3 bg-gray-900 dark:bg-white dark:text-gray-700 hover:bg-black text-darkTheme-text-b"
            >Connect wallet</ButtonMiscellenous
          >
          <ShoppingBagIcon
            class="dark:text-darkTheme-text-b cursor-pointer font-bold"
          />
        </div>
      </nav>
    </template>
    <template #default>
      <RouterView />
    </template>
    <template #footer>
      <section
        v-show="$route.name != 'ConnectWalletPage'"
        class="w-full max-w-screen-2xl relative px-4 sm:px-6 md:px-7 lg:px-8 mx-auto pb-6"
      >
        <div class="border-t dark:border-darkTheme-border w-full pb-4"></div>
        <div
          class="relative w-full flex justify-between items-center text-gray-500 text-sm dark:text-darkTheme-text py-1"
        >
          <p>@Cryptop NFT 2022</p>
          <ButtonDropdown
            class="bottom-14"
            @selection-action="changeThemeSkin"
            :listOfOptions="themeTypes"
            :isActiveOption="isActiveThemeSkin"
          ></ButtonDropdown>
          <p>All right reserved</p>
        </div>
      </section>
    </template>
  </BaseLayout>
</template>
