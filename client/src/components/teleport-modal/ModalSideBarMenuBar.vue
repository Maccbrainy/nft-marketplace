<script setup lang="ts">
import { inject } from "vue";
import { SideBarLayout } from "@/layouts";
import WidgetSideBarLinks from "../WidgetSideBarLinks.vue";
import { TeleportModal } from "../teleport-modal";
import { ButtonMiscellenous } from "../buttonui";

const menuNavigationLinks = [
  {
    id: "explore",
    title: "Explore",
    slug: "",
  },
  {
    id: "create",
    title: "Create",
    slug: "create",
  },
];
const { teleportModalOpenMenuBar, wallet, chooseHowToConnectWallet } =
  inject<any>("provider");
</script>
<template>
  <teleport-modal v-if="teleportModalOpenMenuBar">
    <template #default>
      <side-bar-layout>
        <template #default>
          <div class="w-full h-full flex flex-col py-6 px-6 gap-5">
            <widget-side-bar-links
              side-bar-name="isMenuBar"
              :link-options="menuNavigationLinks"
            />
            <button-miscellenous
              v-if="wallet.length == 0"
              v-on:click="chooseHowToConnectWallet($route.redirectedFrom?.path)"
              :has-list-content="false"
              class="font-semibold text-xs rounded-2xl py-3 bg-gray-900 dark:bg-white dark:text-black hover:bg-black text-darkTheme-text-b"
              >Connect wallet</button-miscellenous
            >
          </div>
        </template>
      </side-bar-layout>
    </template>
  </teleport-modal>
</template>
