<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { ButtonDropdown, ButtonInput, ButtonMiscellenous } from "../buttonui";

const blockChainNetworks = [
  {
    id: "Ethereum",
    name: "Ethereum",
    icon: false,
  },
  {
    id: "Solana",
    name: "Solana",
    icon: false,
  },
  {
    id: "Polygon",
    name: "Polygon",
    icon: false,
  },
];

const timeDurations = [
  {
    id: "5 Minutes",
    name: "5 Minutes",
    icon: false,
  },
  {
    id: "30 Minutes",
    name: "30 Minutes",
    icon: false,
  },
  {
    id: "1 Hour",
    name: "1 Hour",
    icon: false,
  },
  {
    id: "6 Hours",
    name: "6 Hours",
    icon: false,
  },
  {
    id: "Day",
    name: "Day",
    icon: false,
  },
  {
    id: "Week",
    name: "Week",
    icon: false,
  },
  {
    id: "Month",
    name: "Month",
    icon: false,
  },
];
const isActiveBlockChain = ref<string>("Ethereum");
const isActiveTime = ref<string>("Day");
const changeBlockChainNetwork = (blockChainNetwork: { id: string }) => {
  isActiveBlockChain.value = blockChainNetwork.id;
  console.log(`Get NFTs on ${isActiveBlockChain.value} blockchain`);
};
const changeTimeDuration = (timeDuration: { id: string }) => {
  isActiveTime.value = timeDuration.id;
  console.log(`Time duration in ${isActiveTime.value} ago`);
};
</script>
<template>
  <section class="relative w-full py-10 text-gray-700 dark:text-darkTheme-text">
    <div class="flex flex-col">
      <div
        class="grid xs:grid-cols-1 xs:grid-flow-row grid-cols-3 md:grid-rows-2 lg:grid-rows-none lg:grid-flow-row lg:grid-cols-8 gap-4 pb-4"
      >
        <div class="col-span-2 lg:col-span-3">
          <span class="text-2xl font-semibold dark:text-darkTheme-text-b"> Hot Collections </span>
        </div>
        <div class="xs:col-span-2 inline-grid">
          <ButtonDropdown
            @selection-action="changeTimeDuration"
            :listOfOptions="timeDurations"
            :isActiveOption="isActiveTime"
          >
          </ButtonDropdown>
        </div>
        <span class="xs:col-span-2 col-auto inline-grid lg:col-auto">
          <ButtonDropdown
            @selection-action="changeBlockChainNetwork"
            :listOfOptions="blockChainNetworks"
            :isActiveOption="isActiveBlockChain"
          >
          </ButtonDropdown>
        </span>
        <div class="col-span-2 inline-grid lg:col-span-3">
          <div class="flex flex-row items-center justify-start">
            <span class="whitespace-nowrap mx-2 text-sm">Floor price</span>
            <div class="w-full flex flex-shrink max-w-full items-center">
              <ButtonInput input-type="number" place-holdertext="Min" class="flex-auto" />
              <div
                class="bg-gray-300 dark:bg-darkTheme-text mx-3 h-1 w-10 block"
              ></div>
              <ButtonInput input-type="number" place-holdertext="Max" class="flex-auto" />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full relative lg:pt-10">
        <div class="flex flex-col">
          <div
            class="lmax:hidden relative w-full flex justify-start text-sm text-gray-400 dark:text-darkTheme-text pl-8 pr-2.5 pb-4"
          >
            <div class="w-3/12">Collection</div>
            <div class="w-2/12">{{ isActiveTime }} volume</div>
            <div class="w-2/12">Floor price</div>
          </div>

          <div
            class="relative w-full h-auto overflow-hidden lg:border lg:dark:border-darkTheme-border rounded-2xl"
          >
            <RouterLink
              :to="{
                path: '/collection/Art BLocks x Pace',
              }"
              class="sf:w-full lmax:w-1/2 lmax:inline-flex sf:border-none lg:border-none border-solid border-transparent border-x-8 border-t-8"
            >
              <div
                class="w-[99%] lmax:w-full lmax:border lmax:overflow-hidden lmax:dark:border-darkTheme-border flex lmax:flex-col flex-row justify-start lmax:p-5 sf:p-4 lmax:gap-5 py-1 pl-8 pr-2.5 rounded-2xl hover:bg-gray-50 dark:hover:bg-darkTheme-hover cursor-pointer lg:mx-auto my-1.5"
              >
                <div
                  class="w-3/12 lmax:w-10/12 flex items-center dark:text-darkTheme-text-b"
                >
                  <div
                    class="animate-pulse h-14 w-14 min-w-[56px] rounded-xl bg-gray-200 dark:bg-darkTheme-bg-0.08"
                    title="Contract address"
                  ></div>
                  <div
                    class="text-lg font-semibold pr-2 pl-3 truncate"
                    title="Art BLocks x Pace"
                  >
                    Art BLocks x Pace
                  </div>
                </div>
                <div
                  class="lg:hidden w-full flex justify-start text-sm text-gray-400 dark:text-darkTheme-text pt-1.5"
                >
                  <div class="w-1/2">{{ isActiveTime }} volume</div>
                  <div class="w-1/2">Floor price</div>
                </div>
                <div
                  class="w-4/12 lmax:w-full flex flex-row justify-start mx-auto lmax:-mt-3"
                >
                  <div
                    class="w-1/2 lmax:inline-flex flex flex-col my-auto"
                    title="400.9 ETH"
                  >
                    <div class="flex items-center">
                      <div class="flex items-end">
                        <span class="text-2xl font-semibold dark:text-darkTheme-text-b">400.9</span>
                        <span class="px-1 text-gray-400 text-sm font-medium"
                          >ETH</span
                        >
                      </div>
                    </div>
                    <span class="text-green-500 text-sm font-semibold"
                      >+45,001.8%</span
                    >
                  </div>
                  <div
                    class="w-1/2 lmax:inline-flex flex items-center"
                    title="0.45 ETH"
                  >
                    <div class="flex items-end">
                      <span class="font-semibold text-2xl dark:text-darkTheme-text-b">0.45</span>
                      <span class="px-1 text-gray-400 text-sm font-medium"
                        >ETH</span
                      >
                    </div>
                  </div>
                </div>
                <div class="relative w-5/12 lmax:w-full overflow-hidden">
                  <div
                    class="flex flex-row space-x-4 items-center lmax:ml-1 lg:p-1"
                  >
                    <div
                      class="animate-pulse relative w-[100px] h-[100px] min-w-[100px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 dark:hover:ring-darkTheme-200 hover:transition-all lmax:my-1"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-[95%] mx-0.5 h-auto text-gray-100 text-xs p-1 bottom-1.5 whitespace-nowrap text-center space-x-1"
                      >
                      <span>ico</span>
                      <span>0.104 ETH</span>
                      </div>
                    </div>
                    <div
                      class="animate-pulse relative w-[100px] h-[100px] min-w-[100px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 dark:hover:ring-darkTheme-200 hover:transition-all lmax:my-1"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-[95%] mx-0.5 h-auto text-gray-100 text-xs p-1 bottom-1.5 whitespace-nowrap text-center space-x-1"
                      >
                      <span>ico</span>
                      <span>0.104 ETH</span>
                      </div>
                    </div>

                    <div
                      class="animate-pulse relative w-[100px] h-[100px] min-w-[100px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 dark:hover:ring-darkTheme-200 hover:transition-all lmax:my-1"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-[95%] mx-0.5 h-auto text-gray-100 text-xs p-1 bottom-1.5 whitespace-nowrap text-center space-x-1"
                      >
                      <span>ico</span>
                      <span>0.104 ETH</span>
                      </div>
                    </div>

                    <div
                      class="animate-pulse relative w-[100px] h-[100px] min-w-[100px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 dark:hover:ring-darkTheme-200 hover:transition-all lmax:my-1"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-[95%] mx-0.5 h-auto text-gray-100 text-xs p-1 bottom-1.5 whitespace-nowrap text-center space-x-1"
                      >
                      <span>ico</span>
                      <span>0.104 ETH</span>
                      </div>
                    </div>

                    <div
                      class="animate-pulse relative w-[100px] h-[100px] min-w-[100px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 dark:hover:ring-darkTheme-200 hover:transition-all lmax:my-1"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-[95%] mx-0.5 h-auto text-gray-100 text-xs p-1 bottom-1.5 whitespace-nowrap text-center space-x-1"
                      >
                      <span>ico</span>
                      <span>0.104 ETH</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RouterLink>
          </div>
          <ButtonMiscellenous
            :has-list-content="false"
            class="bg-gray-100 rounded-2xl hover:bg-gray-200 py-3 dark:bg-darkTheme-bg dark:hover:bg-darkTheme-hover mt-3"
            >View All Collections</ButtonMiscellenous
          >
        </div>
      </div>
    </div>
  </section>
</template>
