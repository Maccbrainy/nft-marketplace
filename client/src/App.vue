<script setup lang="ts">
// import { RouterLink, RouterView } from "vue-router";
import { watchEffect } from "vue";
// import HelloWorld from "./components/HelloWorld.vue";
import BaseLayout from "./layouts/BaseLayout.vue";

const activateTheme = () => {
  if (localStorage.theme === "darkTheme") {
    document.documentElement.classList.add("dark");
    console.log("DarkMode is activated");
  } else {
    document.documentElement.classList.remove("dark");
    console.log("DarkMode is deactivated");
  }
};

watchEffect(() => {
  activateTheme();
});

const changeTheme = () => {
  let theme = localStorage.theme ? "" : "darkTheme";
  localStorage.theme = theme;
  activateTheme();
  console.log("Change THeme", theme);
};
</script>
<template>
  <BaseLayout class="bg-white dark:bg-darkTheme h-screen w-full">
    <template #header>
      <nav
        class="sticky w-full max-w-5xl flex justify-between text-gray-700 dark:text-darkTheme-600 font-semibold text-xl px-8 mx-auto"
      >
        <div>Logo</div>
        <div>search Widget</div>
        <ul class="flex gap-20">
          <li>Explore</li>
          <li>Create</li>
        </ul>
        <button @click="changeTheme">Light/Dark Mode</button>
        <div>Connect wallet</div>
      </nav>
    </template>
    <template #default>
      <RouterView />
    </template>
    <template #footer>
      <section class="w-full max-w-5xl relative px-8 mx-auto">
        <div class="border-t dark:border-darkTheme-800 w-full pb-4"></div>
      </section>
    </template>
  </BaseLayout>
</template>
