<script setup lang="ts">
import {
  ButtonDropdown,
  ButtonDropdownClassic,
  ButtonInput,
  ButtonMiscellenous,
  ButtonCheckBox,
} from "@/components/buttonui";
import { ref } from "vue";

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
    icon: false
  },
  {
    id: "On Auction",
    name: "On Auction",
    icon: false
  },
  {
    id: "Not For Sale",
    name: "Not For Sale",
    icon: false
  },
];
const listOfMarketPlaces = [
  {
    id: "OpenSea",
    name: "OpenSea",
    icon: false
  },
  {
    id: "NFTary",
    name: "NFTary",
    icon: false
  },
];
const isActiveTokenCurrency = ref<string>("ETH");
let checkedProperty = ref<string[]>([]);
let checkedMarket = ref<string[]>([]);
const changeTokenCurrency = (token: { id: string }) => {
  isActiveTokenCurrency.value = token.id;
  console.log("Token selected", token.id);
};
const checkHandler = () => {
  console.log("Checked status Item(s):", checkedProperty.value);
}
const checkMarketHandler = () => {
  console.log("Checked Market Item(s):", checkedMarket.value);
}
</script>
<template>
  <ul
    class="sticky w-3/12 h-auto overflow-y-auto min-w-[288px] flex flex-col space-y-4 divide-y text-gray-700 font-semibold text-lg"
  >
    <ButtonDropdownClassic>
      <template #title>Status</template>
      <template #content>
        <div>
          <ButtonCheckBox
            v-model:optionChecked="checkedProperty"
            v-on:change="checkHandler"
            :propertyOptions="listOptions"
          ></ButtonCheckBox>
        </div>
      </template>
    </ButtonDropdownClassic>
    <ButtonDropdownClassic>
      <template #title>Price</template>
      <template #content>
        <div class="w-full flex flex-col space-y-3.5 font-medium">
          <div
            class="flex justify-between gap-2 items-center text-sm text-gray-400"
          >
            <ButtonInput class="py-2" />
            <span>to</span>
            <ButtonInput class="py-2" />
            <ButtonDropdown
              @selection-action="changeTokenCurrency"
              :list-of-options="tokenCurrencies"
              :is-active-option="isActiveTokenCurrency"
            />
          </div>
          <ButtonMiscellenous
            class="bg-gray-100 py-2.5 text-gray-700 text-sm font-semibold"
            >Apply</ButtonMiscellenous
          >
        </div>
      </template>
    </ButtonDropdownClassic>
    <ButtonDropdownClassic>
      <template #title>Marketplace</template>
      <template #content>
        <div>
          <ButtonCheckBox
            v-model:optionChecked="checkedMarket"
            v-on:change="checkMarketHandler"
            :propertyOptions="listOfMarketPlaces"
          ></ButtonCheckBox>
        </div>
      </template>
    </ButtonDropdownClassic>
  </ul>
</template>
