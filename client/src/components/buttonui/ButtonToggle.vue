<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  switchChangeProvide: Boolean
});
const switchChange = ref(props.switchChangeProvide);
</script>
<template>
  <div
    v-on:click="switchChange = !switchChange"
    @click="$emit('toggleHandler', switchChange)"
    :value="switchChange"
    :aria-checked="switchChange"
    :class="{
      'bg-gray-200 dark:bg-darkTheme-hover ': !switchChange,
      'bg-black dark:bg-white': switchChange,
    }"
    class="relative min-w-[40px] w-10 h-5 flex items-center rounded-xl overflow-hidden cursor-pointer transition"
  >
    <div
      :class="{
        'translate-x-[170%] bg-white dark:bg-black': switchChange,
        'bg-black dark:bg-white': !switchChange,
      }"
      class="absolute rounded-full w-3 h-3 m-1 transition-all duration-300"
    ></div>
  </div>
</template>
