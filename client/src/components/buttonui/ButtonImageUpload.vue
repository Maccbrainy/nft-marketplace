<script setup lang="ts">
import { markRaw } from "vue";

defineProps({
  labelName: {
    type: String,
    required: true,
  },
  labelIcon: Object,
});
defineEmits(["onChangeFileUpload"]);
</script>
<template>
  <label
    :class="{ 'right-4 mt-4': !labelIcon }"
    class="flex items-center justify-center bg-black text-white rounded-2xl p-3 dark:bg-white dark:text-black text-sm cursor-pointer transition-all active:scale-95"
  >
    <span v-if="labelIcon"
      ><component :is="markRaw(labelIcon)"></component
    ></span>
    <span v-else>{{ labelName }}</span>
    <input
      hidden
      accept="image/*"
      type="file"
      @change="$emit('onChangeFileUpload', $event)"
    />
  </label>
</template>
