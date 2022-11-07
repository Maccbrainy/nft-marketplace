<script setup lang="ts">
import { ref } from "vue";
import TableAssetsCard from "@/components/TableAssetsCard.vue";
import TableAssetsSideBar from "@/components/TableAssetsSideBar.vue";
import { ButtonDropdown, ButtonInput, ButtonMiscellenous } from "./buttonui";
import { RefreshIcon, ChevronDownIcon, OptionViewLargeIcon, OptionViewSmaller } from "./icons";

const listOfSortTypes = [

  {
    id: "Recently listed",
    name: "Recently listed",
    icon: false,
  },
  {
    id: "Recently sold",
    name: "Recently sold",
    icon: false,
  },
  {
    id: "Recently created",
    name: "Recently created",
    icon: false,
  },
  {
    id: "Recently received",
    name: "Recently received",
    icon: false,
  },
  {
    id: "Most viewed",
    name: "Most viewed",
    icon: false,
  },
  {
    id: "Most favorite",
    name: "Most favorite",
    icon: false,
  },
  {
    id: "Ending soon",
    name: "Ending soon",
    icon: false,
  },
  {
    id: "Low to High",
    name: "Price: low to high",
    icon: false,
  },
  {
    id: "High to Low",
    name: "Price: high to low",
    icon: false,
  },
];
const isActiveSortType = ref<string>(listOfSortTypes[0].id);
const changeSortType = (sortType: { id: string }) => {
  isActiveSortType.value = sortType.id;
  console.log("Change sorting type:", isActiveSortType.value);
};
</script>
<template>
  <div class="relative w-full flex flex-col py-6">
    <div class="flex flex-row gap-3 font-semibold text-gray-700 dark:text-darkTheme-text">
      <ButtonMiscellenous
        class="inline-flex flex-initial rounded-2xl dark:border-darkTheme-border bg-gray-100 dark:bg-darkTheme-bg hover:bg-gray-200 dark:hover:bg-darkTheme-hover dark:text-darkTheme-text-b py-3"
        ><ChevronDownIcon class="transform rotate-90 -translate-x-1" />
        <span>Filter</span></ButtonMiscellenous
      >
      <ButtonMiscellenous
        class="flex-initial rounded-2xl dark:border-darkTheme-border bg-gray-100 dark:bg-darkTheme-bg hover:bg-gray-200 dark:hover:bg-darkTheme-hover dark:text-darkTheme-text-b py-3"
        ><RefreshIcon
      /></ButtonMiscellenous>
      <ButtonInput
        input-type="search"
        place-holdertext="Search by NFTs"
        class="flex-auto rounded-2xl"
      />
      <div class="flex-initial">
        <ButtonDropdown
          @selection-action="changeSortType"
          :list-of-options="listOfSortTypes"
          :is-active-option="isActiveSortType"
        ></ButtonDropdown>
      </div>
      <div class="flex flex-initial items-center gap-2 p-1.5 rounded-2xl bg-gray-100 dark:bg-darkTheme-bg">
        <span class="bg-white dark:bg-darkTheme dark:text-darkTheme-text-b transition-all py-1.5 px-4 rounded-xl cursor-pointer"><OptionViewLargeIcon/></span>
        <span class="transition-all dark:hover:text-darkTheme-text-b py-1.5 px-4 rounded-xl cursor-pointer"><OptionViewSmaller/></span>
      </div>
    </div>
    <div class="relative w-full flex justify-start flex-row gap-8 pt-6">
      <div class="w-3/12 h-auto min-w-[288px]">
        <div class="sticky top-0">
          <TableAssetsSideBar />
        </div>
      </div>
      <div class="w-9/12">
        <ul class="w-full flex flex-wrap">
          <TableAssetsCard />
          <TableAssetsCard />
          <TableAssetsCard />
          <TableAssetsCard />
          <TableAssetsCard />
        </ul>
      </div>
    </div>
  </div>
</template>
