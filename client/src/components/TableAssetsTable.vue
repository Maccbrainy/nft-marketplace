<script setup lang="ts">
import TableAssetsCard from "@/components/TableAssetsCard.vue";
import TableAssetsSideBar from "@/components/TableAssetsSideBar.vue";
</script>
<template>
  <div class="relative w-full flex flex-col py-6">
    <div class="grid grid-flow-col grid-cols-12 gap-3">
      <div class="border rounded-xl bg-gray-100">Filter</div>
      <div class="border rounded-xl bg-gray-100">Refresh</div>
      <div class="col-span-7 border rounded-xl bg-gray-100">Search Widget</div>
      <div class="col-span-2 border rounded-xl bg-gray-100">
        Price: Low to High
      </div>
      <div class="col-span-1 border rounded-xl bg-gray-100">Option views</div>
    </div>
    <div class="relative w-full flex justify-start flex-row gap-8 pt-6">
      <TableAssetsSideBar/>
      <ul class="w-9/12 flex flex-wrap">
        <TableAssetsCard />
        <TableAssetsCard />
        <TableAssetsCard />
        <TableAssetsCard />
        <TableAssetsCard />
      </ul>
    </div>
  </div>
</template>
