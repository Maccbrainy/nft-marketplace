<script setup lang="ts">
import { AssetsTables } from "@/components/assets-tokens";
import { AssetsDetailedLayout } from "@/layouts";
const props = defineProps({
  // name: String,
  activeBlockchainId: String,
  slug: String,
});

const exploreDetailLinks = [
  /*ids is configured route path names in the router/index.ts file*/
  { id: "TableCollections", title: "collections", slug: "collections" },
  { id: "TableCollectionNFTs", title: "NFTs", slug: "items" },
  { id: "TableCollectionUsers", title: "users", slug: "users" },
];
const routePath: string = `/explore/${props.activeBlockchainId}`;
</script>
<template>
  <assets-detailed-layout>
    <template #assets-description-details
      ><h1 class="pt-8 text-3xl font-semibold">Collection Stats</h1></template
    >
    <template #assets-tables>
      <assets-tables
        :route-path="routePath"
        :table-link-lists="exploreDetailLinks"
      />
    </template>
  </assets-detailed-layout>
</template>
