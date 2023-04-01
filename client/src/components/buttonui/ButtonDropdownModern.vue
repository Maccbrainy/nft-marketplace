<script setup lang="ts">
import { ref, computed, type PropType, watchEffect } from "vue";
import { ChevronDownIcon, TickCheckIcon } from "@/components/icons";
import type { OptionType } from "@/types";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  listOfOptions: {
    type: Array as PropType<OptionType[]>,
    required: true,
  },
  isActiveOption: {
    type: String,
    required: true,
  },
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
    if (
      dropDownButtonRef.value &&
      dropDownButtonRef.value.contains(event.target)
    ) {
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
  <li class="relative">
    <button
      :ref="(el) => (dropDownButtonRef = el)"
      v-for="(option, index) in getActiveOption"
      :key="option.id + index"
      @click="openDropDownMenu = !openDropDownMenu"
      class="flex flex-row justify-between items-center capitalize transition-all w-full outline-none h-11 whitespace-nowrap hover:text-black dark:hover:text-white"
    >
      <div class="flex flex-row items-center justify-start gap-3">
        <component
          v-if="option.icon"
          :is="option.icon"
          class="w-10 h-10"
        ></component>
        <div class="flex flex-col justify-start items-start">
          <span class="text-xs dark:text-darkTheme-text">{{ title }}</span>
          <span class="text-base">{{ option.name }}</span>
        </div>
      </div>
      <ChevronDownIcon
        :class="{ 'transition-all rotate-180': openDropDownMenu }"
        class="h-5 w-5"
      />
    </button>
    <div
      v-show="openDropDownMenu"
      v-bind="$attrs"
      ref="dropDownMenuRef"
      class="hide-horizontal__scrollbar animate-slide-up absolute w-full min-w-[11rem] overflow-y-auto h-auto max-h-80 border rounded-xl shadow-md dark:border-darkTheme-border left-auto mt-1.5 z-30"
    >
      <div
        tabindex="-1"
        class="relative bg-[#ffffffdd] backdrop-blur-md dark:bg-darkTheme-bgx rounded-xl"
      >
        <div class="relative w-full p-2">
          <div
            v-for="(option, index) in listOfOptions"
            :key="option.id + index"
            @click="selectionActionCallback(option)"
            class="text-black dark:text-white hover:bg-gray-100 text-sm font-semibold dark:hover:bg-darkTheme-hover rounded-xl w-full grid grid-flow-col grid-cols-5 items-center mx-auto py-3 px-3 cursor-pointer"
          >
            <span v-if="option.icon" class="col-span-1"
              ><component class="w-6 h-6" :is="option.icon"></component
            ></span>
            <span
              :class="{
                'col-span-4 justify-start': !option.icon,
                'col-span-3 justify-start': option.icon,
              }"
              class="w-full flex whitespace-nowrap capitalize"
              >{{ option.name }}</span
            >
            <span
              class="col-span-1 w-full flex justify-end items-center"
              v-show="option.id === isActiveOption"
              ><TickCheckIcon class="w-4 h-4"
            /></span>
          </div>
        </div>
      </div>
    </div>
</li>
</template>
