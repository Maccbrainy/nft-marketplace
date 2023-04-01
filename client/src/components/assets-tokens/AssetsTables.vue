<script setup lang="ts">
import { ref, type PropType } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { ChildrenLinksType } from "@/types";
const props = defineProps({
  tableLinkLists: Array as PropType<ChildrenLinksType[]>,
  routePath: String,
});
const router = useRouter();
const route = useRoute();

const routerLinkActive = ref(route.name);
const activateAndUpdateRouter = (link: ChildrenLinksType) => {
  routerLinkActive.value = link.id;
  router.replace({
    path: `${props.routePath}/${link.slug}`,
  });
};
</script>
<template>
  <div class="relative pt-8">
    <ul
      class="relative w-full flex justify-start items-center gap-5 py-2 border-b text-gray-400 dark:text-darkTheme-text dark:border-b-darkTheme-border"
    >
      <li
        :class="{
          'text-gray-800 dark:text-darkTheme-text-b after:absolute after:w-full after:h-0.5 after:-bottom-2 after:rounded-t-2xl after:bg-black after:dark:bg-white after:block':
            routerLinkActive === link.id,
        }"
        class="relative capitalize font-medium text-base hover:text-gray-700 hover:dark:text-darkTheme-text-b cursor-pointer"
        v-for="(link, index) in tableLinkLists"
        :key="link.id + index"
        @click="activateAndUpdateRouter(link)"
      >
        {{ link.title }}
      </li>
      <!-- <div
            class="absolute h-0.5 w-[100%] bottom-0 rounded-t-2xl bg-black block transition-all duration-1000"
          ></div> -->
    </ul>
    <router-view />
  </div>
</template>
