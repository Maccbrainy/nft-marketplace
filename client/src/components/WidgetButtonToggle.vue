<script setup lang="ts">
import { ButtonToggle } from "./buttonui";
defineProps({
  title: String,
  description: String,
  switchProvider: Boolean,
});
</script>

<template>
  <div class="relative w-full flex flex-col space-y-4">
    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-col">
        <span class="text-gray-800 dark:text-white font-medium">{{
          title
        }}</span>
        <span class="text-xs font-light">{{ description }}</span>
      </div>
      <button-toggle
        v-on:toggle-handler="$emit('onToggleHandler', $event)"
        :switchChangeProvide="switchProvider"
      ></button-toggle>
    </div>
  </div>
</template>
