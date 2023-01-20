<script setup lang="ts">
import { ref, computed, type PropType, watchEffect } from "vue";
import { ChevronDownIcon, TickCheckIcon } from "@/components/icons";
import type { OptionType } from "@/types";

const props = defineProps({
  listOfOptions: {
    type: Array as PropType<OptionType[]>,
    required: true,
  },
  isActiveOption: {
    type: String,
    required: true,
  },
  isCreateNftPage: Boolean,
});
const emit = defineEmits(["selectionAction"]);

const openDropDownMenu = ref<Boolean>(false);
const dropDownMenuRef = ref<any>(null);
const dropDownButtonRef = ref<any>(null);
// eslint-disable-next-line no-undef
const getActiveOption = computed<OptionType[]>(() => {
  return props.listOfOptions.filter(
    (option) => option.id === props.isActiveOption
  );
});
const selectionActionCallback = (option: OptionType) => {
  emit("selectionAction", option);
  openDropDownMenu.value = false;
};
watchEffect(() => {
  openDropDownMenu.value;
  const catchOutsideClickAndCloseMenu = (event: { target: any }) => {
    if (dropDownMenuRef.value && dropDownMenuRef.value.contains(event.target)) {
      return;
    }
    if (dropDownButtonRef.value.contains(event.target)) {
      return;
    }
    document.removeEventListener("mousedown", catchOutsideClickAndCloseMenu);
    document.removeEventListener("touchstart", catchOutsideClickAndCloseMenu);
    openDropDownMenu.value = false;
  };
  document.addEventListener("mousedown", catchOutsideClickAndCloseMenu);
  document.addEventListener("touchstart", catchOutsideClickAndCloseMenu);
});
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<style scoped>
/* .dropdown__menu::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.dropdown__menu::-webkit-scrollbar-thumb {
  background: rgb(50, 50, 50);
  border-radius: 10px;
} 
.dropdown__menu::-webkit-scrollbar-track {
  background: transparent;
}  */
.hide-horizontal__scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-horizontal__scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
<template>
  <div class="relative">
    <button
      :ref="(el) => (dropDownButtonRef = el)"
      v-for="(option, index) in getActiveOption"
      :key="option.id + index"
      @click="openDropDownMenu = !openDropDownMenu"
      :class="{
        'text-black bg-gray-200 dark:text-white dark:bg-darkTheme-hover':
          openDropDownMenu && !isCreateNftPage,
        'bg-gray-100': !openDropDownMenu && !isCreateNftPage,
        'dark:bg-darkTheme-bg hover:bg-gray-200 dark:hover:bg-darkTheme-hover':
          !isCreateNftPage,
      }"
      class="transition-all w-full h-full outline-none py-3 whitespace-nowrap flex justify-center space-x-2 items-center hover:text-black dark:hover:text-white rounded-xl px-2 transform active:scale-95"
    >
      <span v-if="option.icon"><component :is="option.icon"></component></span>
      <span>{{ option.name }}</span>
      <span><ChevronDownIcon class="h-5 w-5" /></span>
    </button>
    <div
      v-show="openDropDownMenu"
      v-bind="$attrs"
      ref="dropDownMenuRef"
      class="hide-horizontal__scrollbar animate-slide-up absolute w-max min-w-[11rem] max-w-xl overflow-y-auto h-auto max-h-80 border rounded-xl shadow-md dark:border-darkTheme-border left-auto mt-1.5 z-30"
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
            class="text-black dark:text-white hover:bg-gray-100 text-sm font-semibold dark:hover:bg-darkTheme-hover rounded-xl w-full grid grid-flow-col grid-cols-5 items-center gap-2 mx-auto py-3 px-3 cursor-pointer"
          >
            <span v-if="option.icon" class="col-span-1"
              ><component :is="option.icon"></component
            ></span>
            <span
              :class="{
                'col-span-4 justify-start': !option.icon,
                'col-span-3 justify-start': option.icon,
              }"
              class="w-full flex whitespace-nowrap"
              >{{ option.name }}</span
            >
            <span
              class="col-span-1 w-full flex justify-end items-center"
              v-show="option.id === isActiveOption"
              ><TickCheckIcon
            /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
