<script setup lang="ts">
import { inject } from "vue";
import { SideBarLayout } from "@/layouts";
import { TeleportModal } from "../teleport-modal";
import { TableAssetsSideBar } from "../tables";

const { isLargeScreen, activateModalSidebar } = inject<any>("provider");
</script>
<template>
  <teleport-modal v-if="activateModalSidebar.name == 'isTableAssetFilters'">
    <template #sidebar>
      <side-bar-layout>
        <template #default>
          <TableAssetsSideBar
            v-if="!isLargeScreen"
            class="pt-12 px-6 xs:px-7"
          />
        </template>
      </side-bar-layout>
    </template>
  </teleport-modal>
</template>
