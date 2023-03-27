<script setup lang="ts">
import { inject } from "vue";
import { SideBarLayout } from "@/layouts";
import { TeleportModal } from "../teleport-modal";
import { AssetsTableSideBar } from "../assets-tokens";

const { activateModalSidebar } = inject<any>("provider");
</script>
<template>
  <teleport-modal v-if="activateModalSidebar.name == 'isTableAssetFilters'">
    <template #sidebar>
      <side-bar-layout>
        <template #header>
          <span class="font-semibold text-xl">Filter</span>
        </template>
        <template #default>
          <AssetsTableSideBar class="pt-4 px-6 xs:px-7" />
        </template>
      </side-bar-layout>
    </template>
  </teleport-modal>
</template>
