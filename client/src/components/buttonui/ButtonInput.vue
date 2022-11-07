<script setup lang="ts">
defineProps({
  inputType: String,
  placeHoldertext: String
})
</script>
<style scoped>
</style>
<template>
  <input
    class="w-full bg-gray-100 dark:text-darkTheme-text-b dark:bg-darkTheme-bg border border-transparent px-3 py-2.5 rounded-xl hover:border-gray-300 outline-none focus:bg-white focus:border-gray-300 hover:dark:border-darkTheme-hover focus:dark:border-darkTheme-border focus:dark:bg-darkTheme"
    :type="inputType"
    :placeholder="placeHoldertext"
  />
</template>
