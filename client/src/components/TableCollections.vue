<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
// import { EthereumIcon } from "@/components/icons";
import { ButtonDropdown, ButtonInput } from "@/components/buttonui";
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
];

const timeDurations = [
  {
    id: "5 minutes",
    name: "5 minutes",
    icon: false,
  },
  {
    id: "30 minutes",
    name: "30 minutes",
    icon: false,
  },
  {
    id: "1 hour",
    name: "1 hour",
    icon: false,
  },
  {
    id: "6 hours",
    name: "6 hours",
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
          <span class="text-2xl font-semibold"> Hot Collections </span>
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
              <ButtonInput class="py-2 flex-auto" />
              <div
                class="bg-gray-300 dark:bg-darkTheme-text mx-3 h-1 w-10 block"
              ></div>
              <ButtonInput class="py-2 flex-auto" />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full relative pt-10">
        <div class="flex flex-col">
          <div
            class="relative w-full flex justify-start text-sm text-gray-400 dark:text-darkTheme-text pl-8 pr-2.5 pb-4"
          >
            <div class="w-3/12">Collection</div>
            <div class="w-2/12">{{ isActiveTime }} volume</div>
            <div class="w-2/12">Floor price</div>
          </div>
          <div
            class="relative w-full h-auto overflow-hidden border dark:border-darkTheme-border rounded-2xl"
          >
            <RouterLink
              :to="{
                path: 'Art BLocks x Pace',
              }"
            >
              <div
                class="w-[99%] flex flex-row justify-start py-1 pl-8 pr-2.5 rounded-2xl dark:hover:bg-darkTheme-hover cursor-pointer mx-auto my-1.5"
              >
                <div class="w-3/12 flex items-center">
                  <div
                    class="animate-pulse h-14 w-14 min-w-[56px] rounded-xl bg-gray-200 dark:bg-darkTheme-bg-0.08"
                    title="Contract address"
                  ></div>
                  <div
                    class="text-lg font-semibold pr-2 pl-3"
                    title="Art BLocks x Pace"
                  >
                    Art BLocks x Pace
                  </div>
                </div>
                <div class="w-2/12 flex flex-col my-auto" title="400.9 ETH">
                  <div class="flex items-center">
                    <div class="flex items-end">
                      <span class="text-2xl font-semibold">400.9</span>
                      <span class="px-1 text-gray-400 text-sm font-medium"
                        >ETH</span
                      >
                    </div>
                  </div>
                  <span class="text-green-500 text-sm font-semibold"
                    >+45,001.8%</span
                  >
                </div>
                <div class="w-2/12 flex items-center" title="0.45 ETH">
                  <div class="flex items-end">
                    <span class="font-semibold text-2xl">0.45</span>
                    <span class="px-1 text-gray-400 text-sm font-medium"
                      >ETH</span
                    >
                  </div>
                </div>
                <div class="relative w-5/12 overflow-hidden">
                  <div class="flex flex-row space-x-4 items-center p-1">
                    <div
                      class="relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                    <div
                      class="animate-pulse relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                    <div
                      class="animate-pulse relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                    <div
                      class="animate-pulse relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                    <div
                      class="animate-pulse relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                    <div
                      class="animate-pulse relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RouterLink>
            <RouterLink
              :to="{
                path: 'Art BLocks x Pace',
              }"
            >
              <div
                class="w-[99%] flex flex-row justify-start py-1 pl-8 pr-2.5 rounded-2xl dark:hover:bg-darkTheme-hover cursor-pointer mx-auto my-1.5"
              >
                <div class="w-3/12 flex items-center">
                  <div
                    class="animate-pulse h-14 w-14 min-w-[56px] rounded-xl bg-gray-200 dark:bg-darkTheme-bg-0.08"
                    title="Contract address"
                  ></div>
                  <div
                    class="text-lg font-semibold pr-2 pl-3"
                    title="Art BLocks x Pace"
                  >
                    Art BLocks x Pace
                  </div>
                </div>
                <div class="w-2/12 flex flex-col my-auto" title="400.9 ETH">
                  <div class="flex items-center">
                    <div class="flex items-end">
                      <span class="text-2xl font-semibold">400.9</span>
                      <span class="px-1 text-gray-400 text-sm font-medium"
                        >ETH</span
                      >
                    </div>
                  </div>
                  <span class="text-green-500 text-sm font-semibold"
                    >+45,001.8%</span
                  >
                </div>
                <div class="w-2/12 flex items-center" title="0.45 ETH">
                  <div class="flex items-end">
                    <span class="font-semibold text-2xl">0.45</span>
                    <span class="px-1 text-gray-400 text-sm font-medium"
                      >ETH</span
                    >
                  </div>
                </div>
                <div class="relative w-5/12 overflow-hidden">
                  <div class="flex flex-row space-x-4 items-center p-1">
                    <div
                      class="relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                    <div
                      class="animate-pulse relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                    <div
                      class="animate-pulse relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                    <div
                      class="animate-pulse relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                    <div
                      class="animate-pulse relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                    <div
                      class="animate-pulse relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RouterLink>
            <RouterLink
              :to="{
                path: 'Art BLocks x Pace',
              }"
            >
              <div
                class="w-[99%] flex flex-row justify-start py-1 pl-8 pr-2.5 rounded-2xl dark:hover:bg-darkTheme-hover cursor-pointer mx-auto my-1.5"
              >
                <div class="w-3/12 flex items-center">
                  <div
                    class="animate-pulse h-14 w-14 min-w-[56px] rounded-xl bg-gray-200 dark:bg-darkTheme-bg-0.08"
                    title="Contract address"
                  ></div>
                  <div
                    class="text-lg font-semibold pr-2 pl-3"
                    title="Art BLocks x Pace"
                  >
                    Art BLocks x Pace
                  </div>
                </div>
                <div class="w-2/12 flex flex-col my-auto" title="400.9 ETH">
                  <div class="flex items-center">
                    <div class="flex items-end">
                      <span class="text-2xl font-semibold">400.9</span>
                      <span class="px-1 text-gray-400 text-sm font-medium"
                        >ETH</span
                      >
                    </div>
                  </div>
                  <span class="text-green-500 text-sm font-semibold"
                    >+45,001.8%</span
                  >
                </div>
                <div class="w-2/12 flex items-center" title="0.45 ETH">
                  <div class="flex items-end">
                    <span class="font-semibold text-2xl">0.45</span>
                    <span class="px-1 text-gray-400 text-sm font-medium"
                      >ETH</span
                    >
                  </div>
                </div>
                <div class="relative w-5/12 overflow-hidden">
                  <div class="flex flex-row space-x-4 items-center p-1">
                    <div
                      class="relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                    <div
                      class="animate-pulse relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                    <div
                      class="animate-pulse relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                    <div
                      class="animate-pulse relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                    <div
                      class="animate-pulse relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                    <div
                      class="animate-pulse relative w-24 h-24 min-w-[96px] rounded-xl bg-gray-100 dark:bg-darkTheme-bg-0.08 hover:ring hover:ring-offset-0 hover:ring-gray-200 hover:transition-all"
                    >
                      <div
                        class="absolute bg-darkTheme-bgx rounded-xl w-10/12 h-auto text-gray-100 text-xs p-1 left-1.5 bottom-1.5 whitespace-nowrap"
                      >
                        0.104 ETH
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
