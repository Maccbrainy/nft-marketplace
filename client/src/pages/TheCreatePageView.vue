<script setup lang="ts">
import { markRaw, ref, computed, watchEffect, watch, inject } from "vue";
import { useRoute } from "vue-router";
import { useCryptoCurrencyVsUSDCurrentPrice } from "@/api/useCryptoCurrencyVsUSDCurrentPrice";
import { shortenAddress } from "@/utils";
import {
  ButtonMiscellenous,
  ButtonToggle,
  ButtonInput,
  ButtonDropdown,
} from "@/components/buttonui";
import {
  ChevronDownIcon,
  EthereumIcon,
  PolygonIcon,
  WethIcon,
} from "@/components/icons";
const { name } = useRoute();
const { blockchainNetwork, wallet } = inject<any>("provider");

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
const tokenCurrencies = [
  {
    id: "ethereum",
    name: "ETH",
    icon: markRaw(EthereumIcon),
  },
  {
    id: "weth",
    name: "wETH",
    icon: markRaw(WethIcon),
  },
];
const dateOfListExpiration = [
  {
    id: "No expiration",
    name: "No expiration",
    icon: false,
  },
  {
    id: "1-day",
    name: "1 day",
    icon: false,
  },
  {
    id: "7-days",
    name: "7 days",
    icon: false,
  },
  {
    id: "1-month",
    name: "1 month",
    icon: false,
  },
  {
    id: "3-months",
    name: "3 months",
    icon: false,
  },
  {
    id: "Pick-a-date",
    name: "Pick a date",
    icon: false,
  },
];
const blockchainNetworks = ["ethereum", "polygon", "solana"];

const onClickButtonMiscellenous = ref<boolean>(false);
const isFocused = ref<boolean>(false);
const getFocused = (focused: boolean) => {
  isFocused.value = focused;
};

const showAdvanceSettings = ref(false);
const showMarketPriceSettings = ref(true);
const priceSettingVariantId = ref<string>(pricingSettingsData[0].id);

const isActiveTokenCurrency = ref<string>(tokenCurrencies[0].id);
const isActiveTokenCurrencyName = ref<string>(tokenCurrencies[0].name);

const putOnMarketplaceHandler = (payload: boolean) => {
  showMarketPriceSettings.value = payload;
};
const isERC1155 = computed(() => (name == "CreatePageERC1155" ? true : false));
const pricingSettings = (priceSettingDataId: string) => {
  if (isERC1155.value && priceSettingDataId == pricingSettingsData[1].id)
    return;
  priceSettingVariantId.value = priceSettingDataId;
};

const changeTokenCurrency = (token: { id: string; name: string }) => {
  isActiveTokenCurrency.value = token.id;
  isActiveTokenCurrencyName.value = token.name;
  console.log("Token selected", token.id);
};

const priceOfATokenCurrencyInUSD = ref<number>();
const priceOfNewNFT = ref<number>();
const priceOfNewNFTServiceFee = computed(
  () => priceOfNewNFT.value && priceOfNewNFT.value * 0.01
);
const priceToBeReceivedForNewNFT = computed(
  () =>
    priceOfNewNFTServiceFee.value &&
    priceOfNewNFT.value &&
    priceOfNewNFT.value - priceOfNewNFTServiceFee.value
);

watchEffect(async () => {
  const { currentPrice, errorFetch } = await useCryptoCurrencyVsUSDCurrentPrice(
    isActiveTokenCurrency.value
  );
  priceOfATokenCurrencyInUSD.value = currentPrice.value;
  console.log("errorFetch:", errorFetch.value);
});
watch(
  [priceSettingVariantId, showMarketPriceSettings],
  (
    [newPriceSettingVariantId, newShowMarketPriceSettings],
    [oldPriceSettingVariantId, oldShowMarketPriceSettings]
  ) => {
    if (
      newPriceSettingVariantId != oldPriceSettingVariantId ||
      newShowMarketPriceSettings != oldShowMarketPriceSettings
    ) {
      priceOfNewNFT.value = undefined;
    }
  }
);
const priceOfNewNFToUSD = computed(
  () =>
    priceToBeReceivedForNewNFT.value &&
    priceOfATokenCurrencyInUSD.value &&
    priceOfATokenCurrencyInUSD.value * priceToBeReceivedForNewNFT.value
);
const isActiveDateOfListExpiration = ref<string>(dateOfListExpiration[4].id);
const changeDateOfListingExpiration = (date: { id: string }) => {
  isActiveDateOfListExpiration.value = date.id;
  console.log("isActiveDateOfListExpiration.value", date.id);
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
      <h4 class="text-base text-gray-400 capitalize">
        {{
          name === "CreatePageERC1155"
            ? `Multiple Edition on ${blockchainNetwork}`
            : `Single Edition on ${blockchainNetwork}`
        }}
      </h4>
      <div
        class="flex flex-row gap-8 justify-between items-start pt-5 text-gray-400"
      >
        <div class="w-full flex flex-col space-y-8 justify-start items-start">
          <div class="relative w-full">
            <h1 class="text-gray-800">Choosen Wallet</h1>
            <div v-if="wallet.length > 0"
              class="flex flex-row justify-between items-center border rounded-2xl p-2 mt-3"
            >
              <div class="flex justify-start items-center gap-4 py-3">
                <div>
                  <span v-if="wallet[0].networkName == blockchainNetworks[0]"
                    ><ethereum-icon class="w-10 h-10"
                  /></span>
                  <span v-if="wallet[0].networkName == blockchainNetworks[1]"
                    ><polygon-icon class="w-10 h-10"
                  /></span>
                </div>
                <div class="flex flex-col">
                  <span class="text-gray-800">{{
                    shortenAddress(wallet[0].current_account)
                  }}</span>
                  <span class="text-xs capitalize">{{
                    wallet[0].networkName
                  }}</span>
                </div>
              </div>
              <div
                class="text-green-600 text-xs py-0.5 px-1.5 bg-green-50 rounded-md"
              >
                <span>{{ wallet[0].is_connected && "Connected" }}</span>
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
              v-if="showMarketPriceSettings"
              class="relative flex flex-col gap-8"
            >
              <div
                class="w-full flex flex-row justify-between items-center gap-8"
              >
                <div
                  v-for="(priceSetting, index) in pricingSettingsData"
                  :key="priceSetting.id + index"
                  @click="pricingSettings(priceSetting.id)"
                  :title="
                    isERC1155 && pricingSettingsData[1].id == priceSetting.id
                      ? `${priceSetting.title} not supported in multiple edition`
                      : priceSetting.title
                  "
                  :class="{
                    'border-black': priceSettingVariantId == priceSetting.id,
                    'bg-gray-200 cursor-not-allowed':
                      isERC1155 && pricingSettingsData[1].id == priceSetting.id,
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
                  <div class="flex flex-col space-y-4">
                    <span class="text-gray-800">Price</span>
                    <div
                      :class="{
                        'focus:bg-white border focus:border-gray-300 hover:dark:border-darkTheme-hover focus:dark:border-darkTheme-border focus:dark:bg-darkTheme':
                          isFocused,
                        'bg-gray-100 dark:bg-darkTheme-bg border border-transparent hover:border-gray-300':
                          !isFocused,
                      }"
                      class="w-full flex flex-row justify-between flex-nowrap items-center rounded-xl"
                    >
                      <button-input
                        v-model:input-value="priceOfNewNFT"
                        v-on:input-focused="getFocused"
                        class="text-sm w-full"
                        input-type="number"
                        step-value="0.00000001"
                        place-holder-text="Enter price for one piece"
                        :is-create-nft-page="true"
                      ></button-input>
                      <button-dropdown
                        class="right-0 w-full"
                        @selection-action="changeTokenCurrency"
                        :list-of-options="tokenCurrencies"
                        :is-active-option="isActiveTokenCurrency"
                        :is-create-nft-page="true"
                      />
                    </div>
                    <div
                      class="w-full flex justify-center flex-col space-y-3 divide-y border rounded-2xl h-24 p-4 text-sm font-normal"
                    >
                      <div
                        class="w-full flex flex-row items-center justify-between"
                      >
                        <span>Service fee</span>
                        <div class="flex flex-row items-center gap-2">
                          <span>{{ priceOfNewNFTServiceFee }}</span>
                          <span>{{
                            priceOfNewNFT && isActiveTokenCurrencyName
                          }}</span>
                          <span class="text-gray-800 font-semibold">1%</span>
                        </div>
                      </div>
                      <div
                        class="w-full flex flex-row items-center justify-between pt-3"
                      >
                        <span>You will recieve</span>
                        <div class="flex flex-row items-center gap-2">
                          <span v-show="priceOfNewNFT">{{
                            `$${priceOfNewNFToUSD?.toLocaleString()}`
                          }}</span>
                          <span class="text-gray-800 font-semibold">{{
                            priceToBeReceivedForNewNFT
                          }}</span>
                          <span class="text-gray-800 font-semibold">{{
                            priceOfNewNFT ? isActiveTokenCurrencyName : `-`
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col space-y-2">
                    <span class="text-gray-800"
                      >Date of listing expiration</span
                    >
                    <button-miscellenous
                      v-on:click="
                        onClickButtonMiscellenous = !onClickButtonMiscellenous
                      "
                      class="border w-full rounded-xl py-2.5"
                      @selection-action="changeDateOfListingExpiration"
                      :list-of-options="dateOfListExpiration"
                      :is-active-option="isActiveDateOfListExpiration"
                      :has-list-content="true"
                      :compute-list-content="true"
                    >
                      <chevron-down-icon
                        :class="{
                          'transition-all rotate-180':
                            onClickButtonMiscellenous,
                        }"
                      />
                    </button-miscellenous>
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
              :list-of-options="[]"
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
            :list-of-options="[]"
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
