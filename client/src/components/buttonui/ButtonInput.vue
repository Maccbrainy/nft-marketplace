<script setup lang="ts">
defineProps({
  inputType: String,
  placeHoldertext: String,
  stepValue: [String, Number],
  hasSymbol: String,
  isCreateNftPage: Boolean,
  inputValue: [String, Number] 
});
defineEmits(["update:inputValue", "inputFocused"]);
</script>
<style scoped>
/* input::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.6);
} */
</style>
<template>
  <div class="relative flex items-center justify-end">
    <input
      v-on:focus="$emit('inputFocused', true)"
      v-on:blur="$emit('inputFocused', false)"
      :value="inputValue"
      @input="$emit('update:inputValue', ($event.target as HTMLInputElement).value)"
      :class="{
        'border border-transparent hover:border-gray-300': !isCreateNftPage,
      }"
      class="w-full dark:text-darkTheme-text-b rounded-xl px-3 py-2.5 outline-none bg-gray-100 dark:bg-darkTheme-bg focus:bg-white focus:border-gray-300 hover:dark:border-darkTheme-hover focus:dark:border-darkTheme-border focus:dark:bg-darkTheme"
      :type="inputType"
      :step="stepValue"
      :placeholder="placeHoldertext"
    />
    <span class="absolute right-10">{{ hasSymbol }}</span>
  </div>
</template>
