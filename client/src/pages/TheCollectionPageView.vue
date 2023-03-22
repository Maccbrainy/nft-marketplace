<script setup lang="ts">
import { useRoute } from "vue-router";
import AssetsTableProfileCollections from "@/components/AssetsTableProfileCollections.vue";
const route = useRoute();
const collectionDetailLinks = [
  //ids is configured route path names in the router/index.ts file
  { id: "TableCollectionAssets", title: "items", slug: "items" },
  { id: "TableCollectionActivity", title: "activity", slug: "activity" },
];
const routePath = `/collection/${route.params.id}`;
</script>
<template>
  <AssetsTableProfileCollections
    :route-path="routePath"
    :table-link-lists="collectionDetailLinks"
  />
</template>
