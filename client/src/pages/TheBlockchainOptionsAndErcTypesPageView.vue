<script setup lang="ts">
import { inject, markRaw } from "vue";
import { useRouter } from "vue-router";
import { EthereumIcon, PolygonIcon } from "@/components/icons";

defineProps({
  routeName: String,
  startSlug: String,
});
const router = useRouter();
const { selectBlockchain } = inject<any>("provider");

const blockchainOptions = [
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    icon: markRaw(EthereumIcon),
  },
  {
    id: "polygon",
    name: "Polygon",
    symbol: "MATIC",
    icon: markRaw(PolygonIcon),
  },
];
const ercOptions = [
  {
    id: "erc-721",
    name: "Single",
    symbol: "EIP-721",
    description:
      "If you want to highlight the uniqueness and individuality of an item",
    // icon: markRaw(EthereumIcon)
  },
  {
    id: "erc-1155",
    name: "Multiple",
    symbol: "EIP-1155",
    description:
      "If you want to share your NFT with a large number of community members",
    // icon: markRaw(EthereumIcon)
  },
];

const chooseBlockchain = (blockchain: { id: string }) => {
  let blockchainId = blockchain.id;
  router.push({
    path: `/create/start/${blockchainId}`,
  });
  selectBlockchain(blockchainId)
};
const chooseERCType = (erc: { id: string }) => {
  let ercId = erc.id;
  router.push({
    path: `/create/${ercId}`,
  });
};
</script>
<template>
  <section
    class="relative w-full max-w-screen-2xl min-h-screen px-4 sm:px-6 md:px-7 lg:px-8 pb-10 m-auto dark:text-darkTheme-text"
  >
    <div
      class="relative w-full flex flex-col gap-4 mt-10 text-gray-800 font-medium"
    >
      <h1 class="text-4xl font-semibold">
        {{
          routeName == "ChooseERCTypesPage"
            ? "Choose Type"
            : "Choose Blockchain"
        }}
      </h1>
      <p
        v-if="routeName == 'ChooseERCTypesPage'"
        class="text-gray-400 font-normal"
      >
        Choose “Single” for one of a kind or “Multiple” if you want to sell one
        collectible multiple times
      </p>
      <p class="text-gray-400 font-normal" v-else>
        Choose the most suitable blockchain for your needs.
        <br />
        You need to connect wallet for creation.
      </p>
      <div
        v-if="routeName == 'ChooseERCTypesPage'"
        class="w-full flex flex-row flex-wrap gap-4"
      >
        <div
          v-for="erc in ercOptions"
          :key="erc.id"
          v-on:click="chooseERCType(erc)"
          :id="erc.id"
          :value="erc.id"
          :title="erc.name"
          class="flex flex-col justify-center items-center gap-3 border rounded-xl p-8 cursor-pointer"
        >
          <!-- <component :is="erc.icon" class="w-20 h-20"></component> -->
          <h1 class="text-2xl">{{ erc.name }}</h1>
          <p class="text-gray-400 text-center">{{ erc.description }}</p>
        </div>
      </div>
      <div class="flex flex-row flex-wrap gap-4" v-else>
        <div
          v-for="blockchain in blockchainOptions"
          :key="blockchain.id"
          v-on:click="chooseBlockchain(blockchain)"
          :id="blockchain.id"
          :value="blockchain.id"
          :title="blockchain.name"
          class="flex flex-col justify-center items-center border rounded-xl p-4 cursor-pointer"
        >
          <component :is="blockchain.icon" class="w-20 h-20"></component>
          <span>{{ blockchain.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
