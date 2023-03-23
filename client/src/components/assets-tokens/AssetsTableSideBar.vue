<script setup lang="ts">
import { ref } from "vue";
import {
  ButtonDropdown,
  ButtonDropdownClassic,
  ButtonInput,
  ButtonMiscellenous,
  ButtonCheckBox,
} from "../buttonui";

const tokenCurrencies = [
  {
    id: "ETH",
    name: "ETH",
    icon: false,
  },
  {
    id: "wETH",
    name: "wETH",
    icon: false,
  },
  {
    id: "USDC",
    name: "USDC",
    icon: false,
  },
  {
    id: "SOL",
    name: "SOL",
    icon: false,
  },
];
const listOptions = [
  {
    id: "Buy Now",
    name: "Buy Now",
    icon: false,
  },
  {
    id: "On Auction",
    name: "On Auction",
    icon: false,
  },
  {
    id: "Not For Sale",
    name: "Not For Sale",
    icon: false,
  },
];
const listOfMarketPlaces = [
  {
    id: "OpenSea",
    name: "OpenSea",
    icon: false,
  },
  {
    id: "Rarible",
    name: "Rarible",
    icon: false,
  },
];
const isActiveTokenCurrency = ref<string>("ETH");
let checkedProperty = ref<string[]>([]);
let checkedMarket = ref<string[]>([]);
const changeTokenCurrency = (token: { id: string }) => {
  isActiveTokenCurrency.value = token.id;
  console.log("Token selected", token.id);
};
const checkStatusHandler = () => {
  console.log("Checked status Item(s):", checkedProperty.value);
};
const checkMarketHandler = () => {
  console.log("Checked Market Item(s):", checkedMarket.value);
};
</script>
<template>
  <ul
    class="flex flex-col space-y-4 divide-y dark:divide-darkTheme-border text-gray-700 dark:text-darkTheme-text-b font-semibold text-lg"
  >
    <button-dropdown-classic>
      <template #title>Status</template>
      <template #content>
        <div>
          <button-check-box
            v-model:optionChecked="checkedProperty"
            v-on:change="checkStatusHandler"
            :propertyOptions="listOptions"
          ></button-check-box>
        </div>
      </template>
    </button-dropdown-classic>
    <button-dropdown-classic>
      <template #title>Price</template>
      <template #content>
        <div class="w-full flex flex-col space-y-3.5 font-medium">
          <div
            class="flex justify-between gap-2 items-center text-sm text-gray-400 dark:text-darkTheme-text"
          >
            <button-input
              input-type="number"
              place-holdertext="Min"
              :is-text-area="false"
            />
            <span>to</span>
            <button-input
              input-type="number"
              place-holdertext="Max"
              :is-text-area="false"
            />
            <button-dropdown
              class="right-0"
              @selection-action="changeTokenCurrency"
              :list-of-options="tokenCurrencies"
              :is-active-option="isActiveTokenCurrency"
            />
          </div>
          <button-miscellenous
            :has-list-content="false"
            class="bg-gray-100 rounded-xl hover:bg-gray-200 dark:bg-darkTheme-bg py-3 text-gray-700 dark:text-darkTheme-text dark:hover:text-darkTheme-text-b text-sm font-semibold dark:hover:bg-darkTheme-hover"
            >Apply</button-miscellenous
          >
        </div>
      </template>
    </button-dropdown-classic>
    <button-dropdown-classic>
      <template #title>Marketplace</template>
      <template #content>
        <button-check-box
          v-model:optionChecked="checkedMarket"
          v-on:change="checkMarketHandler"
          :propertyOptions="listOfMarketPlaces"
        ></button-check-box>
      </template>
    </button-dropdown-classic>
  </ul>
</template>
