<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { ChevronDownIcon } from "@/components/icons";
const openDropdown = ref<boolean>(false);
watchEffect(() => {
  console.log("Open is:", openDropdown.value);
});
</script>
<template>
  <li class="pt-4">
    <button
      @click="openDropdown = !openDropdown"
      class="w-full flex flex-row justify-between items-center outline-none"
    >
      <slot name="title"></slot>
      <ChevronDownIcon
        :class="{ 'transition-all transform rotate-180': openDropdown }"
        class="h-7 w-7"
      />
    </button>
    <fieldset
      class="relative outline-none pt-4 max-h-56 overflow-y-auto"
      v-show="openDropdown"
    >
      <slot name="content"></slot>
    </fieldset>
  </li>
</template>
