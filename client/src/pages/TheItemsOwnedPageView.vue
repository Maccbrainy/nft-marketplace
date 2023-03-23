<script setup lang="ts">
import {
  AssetsTables,
  AssetsDescriptionDetails,
} from "@/components/assets-tokens";
import WidgetHeroImageSettings from "@/components/WidgetHeroImageSettings.vue";
import { AssetsDetailedLayout } from "@/layouts";
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
  <assets-detailed-layout>
    <template #assets-hero>
      <widget-hero-image-settings />
    </template>
    <template #assets-description-details>
      <AssetsDescriptionDetails />
    </template>
    <template #assets-tables>
      <assets-tables
        :route-path="routePath"
        :table-link-lists="itemsOwnedTableLinks"
      />
    </template>
  </assets-detailed-layout>
</template>
