<script setup lang="ts">
import Welcome from "../components/WelcomeHero.vue";
import { TableCollections } from "../components/tables";
</script>
<template>
  <section
    class="relative top-10 pb-20 flex flex-col justify-center items-center max-w-screen-2xl min-h-screen px-4 sm:px-6 md:px-7 lg:px-8 mx-auto"
  >
    <Welcome />
    <TableCollections />
  </section>
</template>
