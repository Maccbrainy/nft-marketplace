<script setup lang="ts">
import { inject, type PropType } from "vue";
import type { ChildrenLinksType } from "@/types";
defineProps({
  linkOptions: {
    type: Array as PropType<ChildrenLinksType[]>,
    required: true,
  },
  sideBarName: String
});
// defineEmits(["modalCloseCallback"]);
const { teleportModalCallback } = inject<any>("provider");
</script>
<template>
  <ul class="flex flex-col text-2xl font-semibold gap-2">
    <li
      @click="
        (_$event) =>
          teleportModalCallback({
            name: sideBarName,
            open_modal: false,
          })
      "
      v-for="(profileMenuLink, index) in linkOptions"
      :key="profileMenuLink.id + index"
    >
      <RouterLink
        :to="`/${profileMenuLink.slug}`"
        :title="profileMenuLink.title"
        >{{ profileMenuLink.title }}</RouterLink
      >
    </li>
  </ul>
</template>
