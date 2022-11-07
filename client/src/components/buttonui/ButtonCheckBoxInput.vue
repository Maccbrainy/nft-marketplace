<script setup lang="ts">
import { CheckIcon, CheckedBoxIcon } from "@/components/icons";

defineProps({
  checked: {
    type: Boolean,
    required: true,
  },
  fieldId: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
});
defineEmits(["update:checked"]);
</script>
<template>
  <div>
    <label :for="label">
      <div class="flex flex-row items-center h-6 cursor-pointer">
        <input
          type="checkbox"
          :checked="checked"
          :id="fieldId"
          @input="
            $emit('update:checked', ($event.target as HTMLInputElement).checked)
          "
          class="hidden"
        />
        <div class="w-full flex justify-start items-center gap-3">

          <CheckedBoxIcon class="w-5 h-5 fill-black dark:fill-darkTheme-text-b" v-if="checked" />
          <check-icon class="w-5 h-5" v-else />
          <slot></slot>
        </div>
      </div>
    </label>
  </div>
</template>
