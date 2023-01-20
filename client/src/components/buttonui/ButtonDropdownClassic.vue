<script setup lang="ts">
import { ref } from "vue";
import { ChevronDownIcon } from "@/components/icons";
const openDropdown = ref<boolean>(false);
</script>
<template>
  <li class="pt-4">
    <button
      @click="openDropdown = !openDropdown"
      class="w-full flex flex-row justify-between items-center outline-none"
    >
      <slot name="title"></slot>
      <ChevronDownIcon
        :class="{ 'transition-all rotate-180': openDropdown }"
        class="h-5 w-5"
      />
    </button>
    <fieldset
      class="relative outline-none pt-4 max-h-56 overflow-visible"
      v-show="openDropdown"
    >
      <slot name="content"></slot>
    </fieldset>
  </li>
</template>
