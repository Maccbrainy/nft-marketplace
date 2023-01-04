<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import type { OptionType } from "@/types";
const props = defineProps({
  listOfOptions: {
    type: Array as PropType<OptionType[]>,
    required: false,
    default: Array as PropType<OptionType[]>,
  },
  isActiveOption: {
    type: String,
  },
  hasListContent: {
    type: Boolean,
    required: true,
  },
  computeListContent: {
    type: Boolean,
    required: false,
  },
});
const openDropDownMenu = ref<Boolean>(false);
const getActiveOption = computed<OptionType[]>(() => {
  return props.listOfOptions.filter(
    (option) => option.id === props.isActiveOption
  );
});
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<template>
  <button
    @click="openDropDownMenu = !openDropDownMenu"
    v-for="(option, index) in getActiveOption"
    :key="computeListContent ? option.id + index : 0"
    v-bind="$attrs"
    :class="{
      'bg-gray-100 dark:bg-darkTheme-hover dark:text-darkTheme-text-b':
        openDropDownMenu && hasListContent,
    }"
    class="relative h-full outline-none transition-all px-5 transform active:scale-95 whitespace-nowrap"
  >
    <div
      :class="{
        'justify-between': computeListContent,
        'justify-center': !computeListContent,
      }"
      class="w-full flex flex-row items-center outline-none"
    >
      <span v-show="option.icon && computeListContent"
        ><component :is="option.icon"></component
      ></span>
      <span v-show="computeListContent">{{ option.name }}</span>
      <slot></slot>
    </div>
    <div
      v-if="openDropDownMenu && hasListContent"
      class="animate-slide-up absolute w-max min-w-[11rem] overflow-y-auto max-w-xl h-auto max-h-80 border rounded-xl shadow-md dark:border-darkTheme-border right-0 mt-5"
    >
      <div
        tabindex="-1"
        class="relative bg-white backdrop-blur-md dark:bg-darkTheme-bgx z-20"
      >
        <div class="relative w-full p-2">
          <div
            v-for="(option, index) in listOfOptions"
            :key="option.id + index"
            @click="$emit('selectionAction', option)"
            class="text-black dark:text-white hover:bg-gray-100 text-sm font-semibold dark:hover:bg-darkTheme-hover rounded-xl w-full grid grid-flow-col grid-cols-5 mx-auto py-3 px-3 cursor-pointer"
          >
            <span v-show="option.icon" class="col-span-1"
              ><component :is="option.icon"></component
            ></span>
            <span
              :class="{
                'col-span-4 justify-start': !option.icon,
                'col-span-3 justify-center': option.icon,
              }"
              class="w-full flex whitespace-nowrap"
              >{{ option.name }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </button>
</template>
