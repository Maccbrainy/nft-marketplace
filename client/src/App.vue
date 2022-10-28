<script setup lang="ts">
// import { RouterLink, RouterView } from "vue-router";
import { watchEffect, ref, markRaw, computed } from "vue";
import BaseLayout from "./layouts/BaseLayout.vue";
import {
  DarkThemeIcon,
  ChevronDownIcon,
  LightThemeIcon,
  CheckIcon
} from "./components/icons";

const themePreferences = ref([
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

const openDropDownMenu = ref<Boolean>(false);
const isActiveTheme = ref<string>(localStorage.theme);

const activateTheme = () => {
  let rootDocument = document.documentElement;
  if (isActiveTheme.value === "darkTheme") {
    rootDocument.classList.add("dark");
    rootDocument.classList.remove("light")
  } else {
    rootDocument.classList.remove("dark");
    rootDocument.classList.add("light");
  }
};
watchEffect(() => {
  if (!localStorage.theme){
    localStorage.theme = "lightTheme"
  }
  isActiveTheme.value = localStorage.theme
  activateTheme();
});
const changeTheme = (theme: { id: string; }, activateTheme: () => void) => {
  localStorage.theme = theme.id;
  isActiveTheme.value = theme.id;
  activateTheme();
};

const getActiveThemeData = computed(() => {
  return themePreferences.value.filter(
    (theme) => theme.id === isActiveTheme.value
  );
})

</script>
<template>
  <BaseLayout class="bg-white dark:bg-darkTheme h-screen w-full">
    <template #header>
      <nav
        class="sticky w-full max-w-5xl flex justify-between text-gray-700 dark:text-darkTheme-text font-semibold text-xl px-8 mx-auto"
      >
        <div>Logo</div>
        <div>search Widget</div>
        <ul class="flex gap-20">
          <li>Explore</li>
          <li>Create</li>
        </ul>
        <div>Connect wallet</div>
      </nav>
    </template>
    <template #default>
      <RouterView />
    </template>
    <template #footer>
      <section class="w-full max-w-5xl relative px-8 mx-auto">
        <div class="border-t dark:border-darkTheme-border w-full pb-4"></div>
        <div
          class="relative w-full flex justify-between items-center text-gray-500 text-sm dark:text-darkTheme-text"
        >
          <p>@Cryptop NFT 2022</p>
          <div class="relative">
            <button
              v-for="(theme, index) in getActiveThemeData"
              :key="theme.id + index"
              @click="openDropDownMenu = !openDropDownMenu"
              :class="{
                'text-black bg-gray-200 dark:text-white dark:bg-darkTheme-hover': openDropDownMenu,
              }"
              class="transition-all flex justify-center text-center space-x-2 items-center dark:bg-darkTheme-bg hover:bg-gray-200 dark:hover:bg-darkTheme-hover hover:text-black dark:hover:text-white rounded-lg py-1.5 px-2 transform active:scale-95"
            >
              <span><component :is="theme.icon"></component></span>
              <span>{{ theme.name }}</span>
              <span><ChevronDownIcon /></span>
            </button>
            <div
              v-show="openDropDownMenu"
              class="animate-slide-up absolute w-40 overflow-hidden max-w-xl h-auto max-h-80 border rounded-lg shadow-lg dark:border-darkTheme-border top-auto right-auto left-0 bottom-10 z-50"
            >
              <div
                tabindex="-1"
                class="relative bg-white dark:bg-darkTheme-bgx dark:backdrop-blur-lg"
              >
                <div class="relative w-full p-2">
                  <div
                    v-for="(theme, index) in themePreferences"
                    :key="theme.id + index"
                    @click="changeTheme(theme, activateTheme)"
                    class="text-black dark:text-white hover:bg-gray-200 font-semibold dark:hover:bg-darkTheme-hover rounded-lg w-full flex justify-start mx-auto items-center py-3 px-3 cursor-pointer"
                  >
                    <span 
                      class="w-[36%]"><component :is="theme.icon"></component
                    ></span>
                    <span class="w-1/2 flex justify-start">{{
                      theme.name
                    }}</span>
                    <span v-show="theme.id === isActiveTheme"
                      ><CheckIcon
                    /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p>All right reserved</p>
        </div>
      </section>
    </template>
  </BaseLayout>
</template>
