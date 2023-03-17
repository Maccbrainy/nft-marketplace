<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { ChildrenLinksType } from "@/types";

const profileSettingsLinks = [
  //id: is the configured route path names in the router/index.ts file
  {
    id: "SettingsProfileAccount",
    title: "Account",
    slug: "account",
  },
  {
    id: "SettingsProfileWallets",
    title: "Wallets",
    slug: "wallets",
  },
  {
    id: "SettingsProfileNotifications",
    title: "Notifications",
    slug: "notifications",
  },
];
const route = useRoute();
const router = useRouter();

const routerLinkActive = ref(route.name);
const activateAndUpdateRouter = (profileLink: ChildrenLinksType) => {
  const { id, slug } = profileLink;
  routerLinkActive.value = id;
  router.push({
    path: `/settings/${slug}`,
  });
};
</script>
<template>
  <div
    class="relative w-full h-auto flex flex-col pt-10 font-medium text-gray-400 dark:text-darkTheme-text"
  >
    <h1 class="text-4xl text-gray-800 font-semibold mb-8">Profile Settings</h1>
    <div class="relative w-full flex flex-row items-start mmf:flex-col">
      <div
        class="md:sticky md:top-20 w-[20%] mmf:w-full md:min-w-[150px] md:max-w-[220px] mmf:border-b"
      >
        <ul
          class="flex flex-col gap-2 mmf:py-2 mmf:gap-8 mmf:flex-row text-xl mmf:text-base"
        >
          <li
            v-for="(profileLink, index) in profileSettingsLinks"
            :key="profileLink.id + index"
            class="hover:text-gray-800 cursor-pointer"
            :class="{
              'text-gray-800': routerLinkActive === profileLink.id,
            }"
            @click="activateAndUpdateRouter(profileLink)"
          >
            {{ profileLink.title }}
          </li>
        </ul>
      </div>
      <div class="w-full mmf:pt-10">
        <router-view />
      </div>
    </div>
  </div>
</template>
