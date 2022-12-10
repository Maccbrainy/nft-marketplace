<script setup lang="ts">
import { ref } from "vue";
import {
  ButtonMiscellenous,
  ButtonToggle,
  ButtonInput,
} from "@/components/buttonui";
const pricingSettingsData = [
  {
    id: "fixedPrice",
    title: "Fixed Price",
    icon: "icon",
  },
  {
    id: "timedAuction",
    title: "Timed Auction",
    icon: "icon",
  },
];
const showAdvanceSettings = ref(false);
const showMarketPriceSettings = ref(true);
const priceSettingVariantId = ref<string>("fixedPrice");

const putOnMarketplaceHandler = (payload: boolean) => {
  showMarketPriceSettings.value = payload;
};
const pricingSettings = (priceSettingDataId: string) => {
  priceSettingVariantId.value = priceSettingDataId;
};

const unlockOncePurchasedHandler = (payload: boolean) => {
  console.log("unlockOncePurchasedHandler", payload);
};

const freeMintingHandler = (payload: boolean) => {
  console.log("freeMintingHandler:", payload);
};
</script>
<template>
  <section
    class="relative flex justify-center max-w-screen-2xl min-h-screen px-4 sm:px-6 md:px-7 lg:px-8 mx-auto"
  >
    <div
      class="relative w-full h-auto flex flex-col space-y-3 justify-start max-w-4xl font-medium py-10"
    >
      <h1 class="text-5xl text-gray-800 font-semibold">Create New NFT</h1>
      <h4 class="text-base text-gray-400">Single Edition on Ethereum</h4>
      <div
        class="flex flex-row gap-8 justify-between items-start pt-5 text-gray-400"
      >
        <div class="w-full flex flex-col space-y-8 justify-start items-start">
          <div class="relative w-full">
            <h1 class="text-gray-800">Choosen Wallet</h1>
            <div
              class="flex flex-row justify-between items-center border rounded-2xl p-2 mt-3"
            >
              <div class="flex justify-start items-center gap-4">
                <div class="flex bg-gray-200 rounded-full w-16 h-16">
                  <span class="text-center text-xs m-auto">Chain Icon</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-gray-800">0x46...381E</span>
                  <span class="text-xs">Ethereum</span>
                </div>
              </div>
              <div
                class="text-green-600 text-xs py-0.5 px-1.5 bg-green-50 rounded-md"
              >
                <span>Connected</span>
              </div>
            </div>
          </div>
          <div class="relative w-full">
            <h1 class="text-gray-800">Upload file</h1>
            <div class="flex border-2 border-dashed rounded-2xl h-auto mt-3">
              <div class="p-10 text-center my-auto text-gray-800">
                <p>PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</p>
                <button-miscellenous
                  class="bg-gray-100 rounded-2xl hover:bg-gray-200 py-2 dark:bg-darkTheme-bg dark:hover:bg-darkTheme-hover mt-2 text-xs"
                  :has-list-content="false"
                  >Choose file</button-miscellenous
                >
              </div>
            </div>
          </div>
          <div class="relative w-full flex flex-col space-y-6">
            <div class="flex flex-row justify-between items-center">
              <div class="flex flex-col">
                <span class="text-gray-800">Put on marketplace</span>
                <span class="text-xs"
                  >Enter price to allow users instantly purchase your NFT</span
                >
              </div>
              <button-toggle
                v-on:toggle-handler="putOnMarketplaceHandler"
                :switchChangeProvide="showMarketPriceSettings"
              ></button-toggle>
            </div>
            <div
              v-show="showMarketPriceSettings"
              class="relative flex flex-col gap-8"
            >
              <div
                class="w-full flex flex-row justify-between items-center gap-8"
              >
                <div
                  v-for="(priceSetting, index) in pricingSettingsData"
                  :key="priceSetting.id + index"
                  @click="pricingSettings(priceSetting.id)"
                  :title="priceSetting.title"
                  :class="{
                    'border-black': priceSettingVariantId == priceSetting.id,
                  }"
                  class="w-full flex border rounded-xl py-8 cursor-pointer"
                >
                  <div class="flex flex-col m-auto text-center text-xs">
                    <span>{{ priceSetting.icon }}</span>
                    <span>{{ priceSetting.title }}</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col">
                <div
                  v-show="priceSettingVariantId == pricingSettingsData[0].id"
                  class="flex flex-col gap-6"
                >
                  <div class="flex flex-col space-y-3">
                    <span class="text-gray-800">Price</span>
                    <button-input
                      class="text-sm"
                      inputType="number"
                      stepValue="0.00000001"
                      placeHoldertext="Enter price for one piece"
                    ></button-input>
                    <div class="w-full border rounded-2xl h-20"></div>
                  </div>
                  <div class="flex flex-col space-y-2">
                    <span class="text-gray-800"
                      >Date of listing expiration</span
                    >
                    <button-input
                      class="text-sm"
                      inputType="number"
                      stepValue="0.00000001"
                      placeHoldertext="Enter price for one piece"
                    ></button-input>
                  </div>
                </div>
                <div
                  v-show="priceSettingVariantId == pricingSettingsData[1].id"
                  class="flex flex-col gap-6"
                >
                  <div class="flex flex-col space-y-3">
                    <span class="text-gray-800">Minimium bid.</span>
                    <button-input
                      class="text-sm"
                      inputType="number"
                      stepValue="0.00000001"
                      placeHoldertext="Enter price minmium bid"
                    ></button-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="relative w-full flex flex-col space-y-4">
            <div class="flex flex-row justify-between items-center">
              <div class="flex flex-col">
                <span class="text-gray-800">Unlock once purchased</span>
                <span class="text-xs"
                  >Content will be unlocked after successful transaction</span
                >
              </div>
              <button-toggle
                v-on:toggle-handler="unlockOncePurchasedHandler"
                :switchChangeProvide="false"
              ></button-toggle>
            </div>
          </div>

          <div class="relative w-full flex flex-col space-y-4">
            <span class="text-gray-800">Choose collection</span>
            <div
              class="w-full flex flex-row justify-between items-center gap-8"
            >
              <div class="w-full flex border border-black rounded-xl py-8">
                <div class="flex flex-col m-auto text-center text-xs">
                  <span>Icon</span>
                  <span>Create ERC-721</span>
                </div>
              </div>
              <div class="w-full flex border rounded-xl py-8">
                <div class="flex flex-col m-auto text-center text-xs">
                  <span>Icon</span>
                  <span>Not available yet</span>
                </div>
              </div>
            </div>
          </div>

          <div class="relative w-full flex flex-col space-y-4">
            <div class="flex flex-row justify-between items-center">
              <div class="flex flex-col">
                <span class="text-gray-800">Free minting</span>
                <span class="text-xs">Buyer will pay gas fees for minting</span>
              </div>
              <button-toggle
                v-on:toggle-handler="freeMintingHandler"
                :switchChangeProvide="false"
              ></button-toggle>
            </div>
          </div>

          <div class="relative w-full flex flex-col space-y-1">
            <span class="text-gray-800">Name</span>
            <button-input
              class="text-sm"
              inputType="text"
              placeHoldertext="'e.g. T-shirt with logo'"
            ></button-input>
          </div>
          <div class="relative w-full flex flex-col space-y-1">
            <div class="flex flex-row items-center gap-2">
              <span class="text-gray-800">Description</span>
              <span class="text-gray-400 text-sm">(Optional)</span>
            </div>
            <button-input
              class="text-sm"
              inputType="text"
              placeHoldertext="e.g. Decription of T-shirt with logo"
            ></button-input>
          </div>
          <div class="relative w-full flex flex-col space-y-1">
            <span class="text-gray-800">Royalties</span>
            <button-input
              class="text-sm"
              inputType="number"
              placeHoldertext="E.g 10"
              hasSymbol="%"
            ></button-input>
            <span class="text-xs"
              >Suggested: 0%, 10%, 20%, 30%, 40%, Maximium is 50%</span
            >
          </div>
          <div class="w-full relative flex flex-col space-y-6">
            <button-miscellenous
              v-on:click="showAdvanceSettings = !showAdvanceSettings"
              class="w-full text-gray-800 border rounded-xl py-3 dark:bg-darkTheme-bg dark:hover:bg-darkTheme-hover mt-2 text-sm"
              :has-list-content="false"
              >{{ showAdvanceSettings ? `Hide` : `Show` }} advanced
              settings</button-miscellenous
            >
            <div
              v-show="showAdvanceSettings"
              class="relative w-full flex flex-col space-y-3"
            >
              <div class="flex flex-row items-center gap-2">
                <span class="text-gray-800">Properties</span>
                <span class="text-gray-400 text-sm">(Optional)</span>
              </div>
              <div class="flex flex-row items-center gap-4">
                <button-input
                  class="text-sm w-full"
                  inputType="text"
                  placeHoldertext="E.g Size"
                ></button-input>
                <button-input
                  class="text-sm w-full"
                  inputType="text"
                  placeHoldertext="E.g M"
                ></button-input>
              </div>
              <div class="space-y-2 pt-4">
                <div class="flex flex-row items-center gap-2">
                  <span class="text-gray-800">Alternative text for NFT</span>
                  <span class="text-gray-400 text-sm">(Optional)</span>
                </div>
                <div class="flex flex-col">
                  <button-input
                    class="text-sm"
                    inputType="text"
                    placeHoldertext="Image description in details (do not start with word “image”)"
                  ></button-input>
                  <span class="text-xs mt-1"
                    >Text that will be used in VoiceOver for people with
                    disabilities</span
                  >
                </div>
              </div>
            </div>
          </div>
          <button-miscellenous
            class="bg-black text-white border rounded-xl py-3 dark:bg-darkTheme-bg dark:hover:bg-darkTheme-hover mt-2 text-sm"
            :has-list-content="false"
            >Create item</button-miscellenous
          >
        </div>
        <div class="w-full flex flex-col justify-start">
          <h1 class="text-gray-800">Preview</h1>
          <div class="flex border rounded-2xl w-9/12 h-[60vh] mt-3 text-xs">
            <p class="p-10 text-center my-auto">
              Upload file and choose collection to preview your brand new NFT
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
