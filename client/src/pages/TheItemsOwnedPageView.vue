<script setup lang="ts">
import AssetsTableProfileCollections from "@/components/AssetsTableProfileCollections.vue";
const itemsOwnedTableLinks = [
  //ids is configured route path names in the router/index.ts file
  { id: "ItemsOwned", title: "Owned", slug: "owned" },
  { id: "ItemsOwnedOnSale", title: "On sale", slug: "sale" },
  { id: "ItemsOwnedActivity", title: "activity", slug: "activity" },
  { id: "ItemsOwnedCollections", title: "collections", slug: "collections" },
];
const routePath = `/items`;
</script>
<template>
  <AssetsTableProfileCollections
    :route-path="routePath"
    :table-link-lists="itemsOwnedTableLinks"
  />
</template>
