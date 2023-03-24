<script setup lang="ts">
import Welcome from "../components/WelcomeHero.vue";
import { TableCollections } from "../components/tables";
defineProps({
  name: String,
})
</script>
<template>
  <Welcome class="text-center" />
  <TableCollections :routeName="name" />
</template>
