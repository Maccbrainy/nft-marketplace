<script setup lang="ts">
import { ref } from "vue"
import { ButtonDropdown, ButtonTextInput } from "@/components/buttonui";
const blockChainTypes = ref([
  {
    id: "Ethereum",
    name: "Ethereum",
    // icon: markRaw(LightThemeIcon),
  },
  {
    id: "Solana",
    name: "Solana",
    // icon: markRaw(DarkThemeIcon),
  },
]);
const isActiveBlockChain = ref<string>("Ethereum");
const changeBlockChain = (blockChain: { id: string }) => {
  isActiveBlockChain.value = blockChain.id
  console.log(`Get NFTs on ${isActiveBlockChain.value} blockchain`);
}
</script>
<template>
  <section class="relative w-full max-w-7xl px-8 py-10 text-gray-700">
    <div class="flex flex-col">
      <div class="grid grid-flow-row grid-cols-7 gap-4">
        <div class="col-span-3">
          <span class="text-2xl font-semibold"> Hot Collections </span>
        </div>
        <div class="col-span-2">
          <div class="flex flex-row justify-center items-center">
            <span class="whitespace-nowrap mx-2 text-sm">Floor price</span>
            <ButtonTextInput />
            <div class="bg-gray-300 mx-3 h-1 w-3 block"></div>
            <ButtonTextInput />
          </div>
        </div>
        <ButtonDropdown
          @selection-action="changeBlockChain"
          :listOfOptions="blockChainTypes"
          :isActiveOption="isActiveBlockChain"
        >
        </ButtonDropdown>
        <div>Day</div>
      </div>
      <div>Table</div>
    </div>
  </section>
</template>
