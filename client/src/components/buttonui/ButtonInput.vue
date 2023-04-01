<script setup lang="ts">
import { ref, markRaw } from "vue";

defineProps({
  labelName: String,
  optionalLabelName: String,
  labelDescription: String,
  inputType: String,
  labelIcon: Object,
  placeHoldertext: String,
  stepValue: [String, Number],
  labelSymbol: String,
  callToActionName: String,
  inputValue: [String, Number],
  descriptionEnd: String,
  isRequired: Boolean,
  isTextArea: {
    type: Boolean,
    required: true,
  },
});
defineEmits(["update:inputValue", "callToActionHandler"]);
const inputFocused = ref<boolean>(false);
</script>
<style scoped>
/* input::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.6);
} */
</style>
<template>
  <div class="relative flex flex-col space-y-1 font-normal text-gray-800">
    <div v-show="labelName" class="flex flex-row items-center gap-2">
      <label class="dark:text-white">{{ labelName }}</label>
      <span class="text-sm text-gray-400">{{ optionalLabelName }}</span>
    </div>
    <span
      v-show="labelDescription"
      class="text-xs font-light pb-0.5 text-gray-400"
      >{{ labelDescription }}</span
    >
    <div
      :class="{
        ' border-gray-300 dark:border-darkTheme-border dark:bg-darkTheme': inputFocused && !isRequired,
        ' bg-gray-100 dark:bg-darkTheme-bg hover:border-gray-300 hover:dark:border-darkTheme-hover': !inputFocused && !isRequired,
        'border-red-600': isRequired,
        'h-11': !isTextArea,
        'h-auto overflow-hidden': isTextArea,
      }"
      class="relative w-full flex flex-row items-center border border-transparent rounded-2xl px-2 outline-none transition-all"
    >
      <span v-if="labelSymbol" class="pr-2.5">{{ labelSymbol }}</span>
      <span v-if="labelIcon"
        ><component :is="markRaw(labelIcon)" class="px-0.5"></component
      ></span>
      <textarea
        v-if="isTextArea"
        v-on:focus="inputFocused = true"
        v-on:blur="inputFocused = false"
        :value="inputValue"
        @input="
          $emit('update:inputValue', ($event.target as HTMLInputElement).value)
        "
        class="w-full h-full outline-none bg-transparent py-3 px-2 dark:text-darkTheme-text-b"
        :type="inputType"
        :step="stepValue"
        :placeholder="placeHoldertext"
      ></textarea>
      <input
        v-on:focus="inputFocused = true"
        v-on:blur="inputFocused = false"
        :value="inputValue"
        @input="
          $emit('update:inputValue', ($event.target as HTMLInputElement).value)
        "
        class="w-full h-full outline-none bg-transparent px-2 dark:text-darkTheme-text-b"
        :type="inputType"
        :step="stepValue"
        :placeholder="placeHoldertext"
        v-else
      />
      <span
        v-show="callToActionName"
        @click="$emit('callToActionHandler')"
        class="px-2.5 whitespace-nowrap font-normal cursor-pointer transition-all active:scale-95"
        >{{ callToActionName }}</span
      >
    </div>
    <span
      v-show="descriptionEnd"
      class="text-xs font-light pb-0.5 text-gray-400"
      >{{ descriptionEnd }}</span
    >
    <span v-show="isRequired" class="text-xs font-light pb-0.5 text-red-600"
      >{{ labelName }} is required!</span
    >
  </div>
</template>
