<script setup lang="ts">
// import { RouterLink, RouterView } from "vue-router";
import { ref, watchEffect, markRaw } from "vue";
import BaseLayout from "./layouts/BaseLayout.vue";
import { DarkThemeIcon, LightThemeIcon } from "./components/icons";
import { ButtonDropdown } from "@/components/buttonui";

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

const isActiveTheme = ref<string>(localStorage.theme);

const activateTheme = () => {
  let rootDocument = document.documentElement;
  if (isActiveTheme.value === "darkTheme") {
    rootDocument.classList.add("dark");
    rootDocument.classList.remove("light");
  } else {
    rootDocument.classList.remove("dark");
    rootDocument.classList.add("light");
  }
};
watchEffect(() => {
  if (!localStorage.theme) {
    localStorage.theme = "lightTheme";
  }
  isActiveTheme.value = localStorage.theme;
  activateTheme();
});
const changeTheme = (theme: { id: string }, activateTheme: () => void) => {
  localStorage.theme = theme.id;
  isActiveTheme.value = theme.id;
  activateTheme();
};
</script>
<template>
  <BaseLayout class="bg-white dark:bg-darkTheme h-screen w-full">
    <template #header>
      <nav
        class="sticky w-full max-w-7xl flex justify-between text-gray-700 dark:text-darkTheme-text font-semibold text-xl px-8 mx-auto"
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
      <section class="w-full max-w-7xl relative px-8 mx-auto">
        <div class="border-t dark:border-darkTheme-border w-full pb-4"></div>
        <div
          class="relative w-full flex justify-between items-center text-gray-500 text-sm dark:text-darkTheme-text"
        >
          <p>@Cryptop NFT 2022</p>
          <ButtonDropdown
            @selection-action="changeTheme"
            :listOfOptions="themeTypes"
            :isActiveOption="isActiveTheme"
          ></ButtonDropdown>
          <p>All right reserved</p>
        </div>
      </section>
    </template>
  </BaseLayout>
</template>
