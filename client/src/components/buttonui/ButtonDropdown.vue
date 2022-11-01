<script setup lang="ts">
import { ref, computed, type PropType } from "vue";
import { ChevronDownIcon, TickCheckIcon } from "@/components/icons";
import type { OptionType } from "@/types";

const props = defineProps({
  listOfOptions: {
    type: Array as PropType<OptionType[]>,
    required: true
  },
  isActiveOption: {
    type: String,
    required: true
  },
});

const openDropDownMenu = ref<Boolean>(false);
// eslint-disable-next-line no-undef
const getActiveOption = computed<OptionType[]>(() => {
  return props.listOfOptions.filter(
    (theme) => theme.id === props.isActiveOption
  );
});
</script>
<template>
  <div class="relative">
    <button
      v-for="(option, index) in getActiveOption"
      :key="option.id + index"
      @click="openDropDownMenu = !openDropDownMenu"
      :class="{
        'text-black bg-gray-200 dark:text-white dark:bg-darkTheme-hover':
          openDropDownMenu,
        'bg-gray-100': !openDropDownMenu,
      }"
      class="transition-all h-full py-2.5 flex justify-center text-center space-x-2 items-center dark:bg-darkTheme-bg hover:bg-gray-200 dark:hover:bg-darkTheme-hover hover:text-black dark:hover:text-white rounded-xl px-2 transform active:scale-95"
    >
      <span><component :is="option.icon"></component></span>
      <span>{{ option.name }}</span>
      <span><ChevronDownIcon /></span>
    </button>
    <div
      v-show="openDropDownMenu"
      class="animate-slide-up absolute w-40 overflow-hidden max-w-xl h-auto max-h-80 border rounded-xl shadow-md dark:border-darkTheme-border left-0 bottom-12 z-50"
    >
      <div
        tabindex="-1"
        class="relative bg-white dark:bg-darkTheme-bgx dark:backdrop-blur-lg"
      >
        <div class="relative w-full p-2">
          <div
            v-for="(option, index) in listOfOptions"
            :key="option.id + index"
            @click="$emit('selectionAction', option)"
            class="text-black dark:text-white hover:bg-gray-100 font-semibold dark:hover:bg-darkTheme-hover rounded-xl w-full grid grid-flow-col grid-cols-5 mx-auto py-3 px-3 cursor-pointer"
          >
            <span v-if="option.icon" class="col-span-1"
              ><component :is="option.icon"></component
            ></span>
            <span
              :class="{
                'col-span-4 justify-start': !option.icon,
                'col-span-3 justify-center': option.icon,
              }"
              class="w-full flex"
              >{{ option.name }}</span
            >
            <span
              class="col-span-1 w-full flex justify-end"
              v-show="option.id === isActiveOption"
              ><TickCheckIcon
            /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
