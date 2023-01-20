<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type PropType } from "vue";
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
const emit = defineEmits(["selectionAction"]);

const openDropDownMenu = ref<Boolean>(false);
const dropDownMenuRef = ref<any>(null);
const dropDownButtonRef = ref<any>(null);
const getActiveOption = computed<OptionType[]>(() => {
  return props.listOfOptions.filter(
    (option) => option.id === props.isActiveOption
  );
});
const selectionActionCallback = (option: OptionType) => {
  emit("selectionAction", option);
  openDropDownMenu.value = false;
};
const catchOutsideClickAndCloseMenu = (event: { target: any }) => {
  if (dropDownMenuRef.value && dropDownMenuRef.value.contains(event.target)) {
    return;
  }
  if (dropDownButtonRef.value.contains(event.target)){
    return;
  }
  openDropDownMenu.value = false;
};
onMounted(() => {
  document.addEventListener("mousedown", catchOutsideClickAndCloseMenu);
  document.addEventListener("touchstart", catchOutsideClickAndCloseMenu);
});
onUnmounted(() => {
  document.removeEventListener("mousedown", catchOutsideClickAndCloseMenu);
  document.removeEventListener("touchstart", catchOutsideClickAndCloseMenu);
});
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<template>
  <div class="relative">
    <button
      @click="openDropDownMenu = !openDropDownMenu"
      :ref="(el) => (dropDownButtonRef = el)"
      v-for="(option, index) in getActiveOption"
      :key="computeListContent ? option.id + index : 0"
      v-bind="$attrs"
      :class="{
        'bg-gray-100 dark:bg-darkTheme-hover dark:text-darkTheme-text-b':
          openDropDownMenu && hasListContent,
      }"
      class="relative w-full h-full outline-none transition-all px-3.5 active:scale-95 whitespace-nowrap"
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
    </button>
    <div
      v-if="openDropDownMenu && hasListContent"
      ref="dropDownMenuRef"
      class="animate-slide-up absolute w-max min-w-[11rem] max-w-xl overflow-y-auto h-auto max-h-80 border rounded-xl shadow-md dark:border-darkTheme-border left-auto right-0 mt-1 z-20"
    >
      <div
        tabindex="-1"
        class="relative bg-[#ffffffdd] backdrop-blur-md dark:bg-darkTheme-bgx"
      >
        <div class="relative w-full p-2">
          <div
            v-for="(option, index) in listOfOptions"
            :key="option.id + index"
            @click="selectionActionCallback(option)"
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
  </div>
</template>
