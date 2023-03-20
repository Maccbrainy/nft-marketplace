<script setup lang="ts">
import { markRaw } from "vue";

defineProps({
  labelName: {
    type: String,
    required: true,
  },
  labelIcon: Object,
});
defineEmits(["onChangeImageAction"]);
</script>
<template>
  <label
    :class="{ 'right-4 mt-4': !labelIcon }"
    class="absolute z-10 bg-black text-white rounded-xl p-2.5 dark:bg-white dark:text-black text-sm cursor-pointer transition-all active:scale-95"
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
