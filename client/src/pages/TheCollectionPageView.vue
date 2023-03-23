<script setup lang="ts">
import { useRoute } from "vue-router";
import WidgetHeroImageSettings from "@/components/WidgetHeroImageSettings.vue";
import { AssetsDetailedLayout } from "@/layouts";
import {
  AssetsTables,
  AssetsDescriptionDetails,
} from "@/components/assets-tokens";
const route = useRoute();
const collectionDetailLinks = [
  //ids is configured route path names in the router/index.ts file
  { id: "TableCollectionAssets", title: "items", slug: "items" },
  { id: "TableCollectionActivity", title: "activity", slug: "activity" },
];
const routePath = `/collection/${route.params.id}`;
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
      <AssetsTables
        :route-path="routePath"
        :table-link-lists="collectionDetailLinks"
      />
    </template>
  </assets-detailed-layout>
</template>
