<script setup lang="ts">
defineProps({
  inputType: String,
  placeHoldertext: String,
  stepValue: [String, Number],
  hasSymbol: String
})
</script>
<style scoped>
/* input::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.6);
} */
</style>
<template>
  <div class="relative flex items-center justify-end">
    <input
      class="w-full bg-gray-100 dark:text-darkTheme-text-b dark:bg-darkTheme-bg border border-transparent px-3 py-2.5 rounded-xl hover:border-gray-300 outline-none focus:bg-white focus:border-gray-300 hover:dark:border-darkTheme-hover focus:dark:border-darkTheme-border focus:dark:bg-darkTheme"
      :type="inputType"
      :step="stepValue"
      :placeholder="placeHoldertext"
    />
    <span class="absolute right-10">{{ hasSymbol }}</span>
  </div>

</template>
