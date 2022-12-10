<script setup lang="ts">
import { ref } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import type { ChildrenLinksType } from "@/types";
import { TableAssetsCard } from "@/components/tables";
import { TokenPriceDetailCard } from "@/components/tokens";

const router = useRouter();
const route = useRoute();

const tokenDetailTabLinks = [
  {
    id: "TokenOverView",
    title: "overview",
  },
  // {
  //   id: "PropertiesToken",
  //   title: "properties",
  // },
  {
    id: "TokenBids",
    title: "bids",
  },

  {
    id: "TokenHistory",
    title: "history",
  },
];
const routerLinkActive = ref(route.name);
const activateLinkAndUpdateRouter = (link: ChildrenLinksType) => {
  routerLinkActive.value = link.id;
  router.replace({
    path: `/token/${route.params.tokenId}/${link.title}`,
  });
};
</script>
<template>
  <section
    class="relative w-full max-w-screen-2xl min-h-screen px-4 sm:px-6 md:px-7 lg:px-8 pt-4 pb-20 m-auto dark:text-darkTheme-text-b"
  >
    <div class="relative w-full flex sf:flex-col justify-between gap-8 pt-6">
      <div class="w-[63%] mf:w-full h-auto py-5">
        <div class="w-full flex flex-col items-center">
          <div
            class="w-[500px] h-[500px] mf:w-full min-h-[226px] mf:max-w-full max-w-md bg-gray-200 dark:bg-darkTheme-bg rounded-2xl"
          >
            <img
              class="w-full h-full object-center object-cover rounded-2xl"
              src="https://assets.raribleuserdata.com/prod/v1/image/t_image_big/aHR0cHM6Ly9jbG9uZXgtYXNzZXRzLnJ0Zmt0LmNvbS9pbWFnZXMvOTg3NS5wbmc="
            />
          </div>
          <TokenPriceDetailCard class="lmin:hidden w-full mt-8" />
          <div class="w-auto px-8 mt-8">
            <ul
              class="relative w-full h-12 bg-gray-100 dark:bg-darkTheme-bg rounded-2xl flex justify-between items-center text-gray-500 dark:text-darkTheme-text font-semibold text-base p-1.5"
            >
              <li
                v-for="(link, index) in tokenDetailTabLinks"
                :key="link.id + index"
                @click="activateLinkAndUpdateRouter(link)"
                :class="{
                  'bg-white dark:bg-darkTheme rounded-xl text-gray-700 dark:text-darkTheme-text-b':
                    routerLinkActive === link.id,
                }"
                class="transition-all duration-300 px-4 py-2 cursor-pointer capitalize dark:hover:text-darkTheme-text-b"
              >
                {{ link.title }}
              </li>
            </ul>
          </div>
          <div class="w-full flex justify-start">
            <RouterView />
          </div>
        </div>
      </div>
      <div class="mf:hidden w-[37%] mf:w-full lmin:min-w-[420px]">
        <TokenPriceDetailCard class="sticky -top-2" />
      </div>
    </div>
    <div class="relative w-full pt-10">
      <h1
        class="text-center font-semibold text-gray-700 dark:text-darkTheme-text-b text-3xl xs:text-xl"
      >
        More from this collection
      </h1>
      <ul class="w-full flex flex-row flex-nowrap overflow-hidden pt-8">
        <TableAssetsCard class="min-w-[240px] max-w-xs" />
        <TableAssetsCard class="min-w-[240px] max-w-xs" />
        <TableAssetsCard class="min-w-[240px] max-w-xs" />
        <TableAssetsCard class="min-w-[240px] max-w-xs" />
      </ul>
    </div>
  </section>
</template>
