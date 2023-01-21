<script setup lang="ts">
import { inject, markRaw, ref, watchEffect } from "vue";
import { TableAssetsCard, TableAssetsSideBar } from "../tables";
import { ButtonDropdown, ButtonInput, ButtonMiscellenous } from "../buttonui";
import {
  RefreshIcon,
  ChevronDownIcon,
  OptionViewLargeIcon,
  OptionViewSmaller,
  FilterIcon,
} from "../icons";
const NFTTokensInCollection = [
  {
    tokenId: 12345,
    tokenAddress: "0x4exr12309846567386sfdrteg23AW54EDWCAT6WUHSY",
    tokenName: "Bored Ape Yacht Club",
    tokenPrice: 0.443,
  },
  {
    tokenId: 2213,
    tokenAddress: "OjhutsU2X6567386sfdrteg23AW54EDWCAT6WUHSY",
    tokenName: "LuppyclubOfficial",
    tokenPrice: 3.123,
  },
  {
    tokenId: 30033,
    tokenAddress: "040x2ssdrU2X6567386234567drteg23AW54E0oiuydbgjsl",
    tokenName: "Clone X",
    tokenPrice: 11.0,
  },
  {
    tokenId: 42213,
    tokenAddress: "04ex0uyu67drtwe432eg23AW54E0oiuydbgjsl",
    tokenName: "CryptoPunks",
    tokenPrice: 1.1,
  },
  {
    tokenId: 662,
    tokenAddress: "3023erds2eg23AW54E0oiuydbgjsl",
    tokenName: "PROOF Collective",
    tokenPrice: 0.122,
  },
  {
    tokenId: 390,
    tokenAddress: "0903e4r2eg2323ewqszxcvfr4567AW54E0oiuydbgjsl",
    tokenName: "Azuki",
    tokenPrice: 0.023,
  },
  {
    tokenId: 91700,
    tokenAddress: "1w23e4r5t6y7u8i9o0pasderftgyhujikolpgjsl",
    tokenName: "Light Years by Dmitri Cherniak",
    tokenPrice: 0.15,
  },
  {
    tokenId: 5414,
    tokenAddress: "po90iuy6780pasderftgyhujikolpgjsl",
    tokenName: "CryptoNinja NFT",
    tokenPrice: 1.12,
  },
];
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
const viewOptionsSettings = [
  {
    id: "largerViewOption",
    name: "Larger view option",
    icon: markRaw(OptionViewLargeIcon),
  },
  {
    id: "smallerViewOption",
    name: "Smaller view option",
    icon: markRaw(OptionViewSmaller),
  },
];
const { teleportModalCallback, isLargeScreen } = inject<any>("provider");
const hideTableAssetsSideBarFilters = ref<boolean>(false);

const activeViewOption = ref<string>(viewOptionsSettings[1].id);
const isActiveSortType = ref<string>(listOfSortTypes[0].id);
const changeSortType = (sortType: { id: string }) => {
  isActiveSortType.value = sortType.id;
  console.log("Change sorting type:", isActiveSortType.value);
};
const activeViewOptionCallback = (viewOptionId: string) => {
  let viewOption = viewOptionId;
  if (activeViewOption.value == viewOption) return;
  activeViewOption.value = viewOption;
};
watchEffect(() => {
  if (!isLargeScreen.value) {
    hideTableAssetsSideBarFilters.value = true;
  }
});
const hideTableAssetsSideBarFiltersCallback = () => {
  if (isLargeScreen.value) {
    hideTableAssetsSideBarFilters.value = !hideTableAssetsSideBarFilters.value;
    return;
  }
  teleportModalCallback({ name: "isTableAssetFilters", open_modal: true });
};
</script>
<style scoped>
.hide-horizontal__scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-horizontal__scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
<template>
  <div class="relative w-full flex flex-col py-6">
    <div
      class="flex flex-row items-center flex-wrap gap-3 text-sm font-semibold text-black dark:text-white"
    >
      <button-miscellenous
        title="Filters"
        v-on:click="hideTableAssetsSideBarFiltersCallback"
        :has-list-content="false"
        class="inline-flex flex-initial items-center rounded-2xl dark:border-darkTheme-border bg-gray-100 dark:bg-darkTheme-bg hover:bg-gray-200 dark:hover:bg-darkTheme-hover dark:text-darkTheme-text-b py-2.5"
        ><ChevronDownIcon
          v-show="!hideTableAssetsSideBarFilters"
          class="mf:hidden rotate-90 -translate-x-1"
        />
        <FilterIcon
          :class="{
            'lmin:hidden': !hideTableAssetsSideBarFilters,
          }"
          class="-translate-x-1"
        />
        <span>Filter</span></button-miscellenous
      >
      <button-miscellenous
        title="Refresh collection"
        :has-list-content="false"
        class="flex-initial rounded-2xl dark:border-darkTheme-border bg-gray-100 dark:bg-darkTheme-bg hover:bg-gray-200 dark:hover:bg-darkTheme-hover dark:text-darkTheme-text-b py-2.5"
        ><refresh-icon
      /></button-miscellenous>
      <button-input
        input-type="search"
        place-holdertext="Search by NFTs"
        class="flex-auto rounded-2xl"
      ></button-input>
      <div class="flex-initial">
        <button-dropdown
          @selection-action="changeSortType"
          :list-of-options="listOfSortTypes"
          :is-active-option="isActiveSortType"
        ></button-dropdown>
      </div>
      <div
        class="relative flex flex-initial items-center gap-2 p-1 rounded-2xl bg-gray-100 dark:bg-darkTheme-bg"
      >
        <div
          :class="{
            'translate-x-[112%]': activeViewOption == 'smallerViewOption',
            'left-1.5': activeViewOption == 'largerViewOption',
          }"
          class="absolute bg-white dark:bg-darkTheme rounded-xl py-[18px] px-7 transition-all duration-300"
        ></div>
        <span
          v-for="viewOption in viewOptionsSettings"
          :key="viewOption.id"
          :title="viewOption.name"
          v-on:click="activeViewOptionCallback(viewOption.id)"
          class="dark:text-darkTheme-text-b py-1.5 px-4 cursor-pointer z-10"
          ><component :is="viewOption.icon"></component
        ></span>
      </div>
    </div>
    <div
      class="relative w-full h-full flex justify-start items-start flex-row gap-3 pt-6"
    >
      <div
        v-if="isLargeScreen"
        :class="{
          'lmin:hidden': hideTableAssetsSideBarFilters,
        }"
        class="sticky top-20 mf:hidden w-3/12 h-[85vh] overflow-x-auto hide-horizontal__scrollbar min-w-[288px] border dark:border-darkTheme-border rounded-xl py-2 px-6 mt-3.5"
      >
        <TableAssetsSideBar />
      </div>
      <div
        :class="{
          'w-9/12': !hideTableAssetsSideBarFilters,
          'w-full': hideTableAssetsSideBarFilters,
        }"
      >
        <ul class="flex flex-wrap">
          <TableAssetsCard
            v-for="tokenData in NFTTokensInCollection"
            :key="tokenData.tokenId + tokenData.tokenAddress"
            :filterIsHidden="hideTableAssetsSideBarFilters"
            :viewOptionSize="activeViewOption"
            :assetInfo="tokenData"
          />
        </ul>
      </div>
    </div>
  </div>
</template>
