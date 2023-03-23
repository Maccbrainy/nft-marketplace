<script setup lang="ts">
import { useRoute } from "vue-router";
import { AssetsTables } from "@/components/assets-tokens";
import { AssetsDetailedLayout } from "@/layouts";

const route = useRoute();

const exploreDetailLinks = [
  //ids is configured route path names in the router/index.ts file
  { id: "TableCollections", title: "collections", slug: "collections" },
  { id: "TableCollectionNFTs", title: "NFTs", slug: "items" },
  { id: "TableCollectionUsers", title: "users", slug: "users" },
];
const routePath = `/explore/${route.params.activeBlockchainId}`;
</script>
<template>
  <assets-detailed-layout>
    <template #assets-tables>
      <assets-tables
        :route-path="routePath"
        :table-link-lists="exploreDetailLinks"
      />
    </template>
  </assets-detailed-layout>
</template>
