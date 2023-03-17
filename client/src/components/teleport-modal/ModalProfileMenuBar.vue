<script setup lang="ts">
import { inject } from "vue";
import { shortenAddress } from "@/utils";
import { CopyToClipBoardIcon, LogOutIcon } from "../icons";
import { SideBarLayout } from "@/layouts";
import WidgetSideBarLinks from "../WidgetSideBarLinks.vue";
import { TeleportModal } from "../teleport-modal";

const profileMenuLinks = [
  {
    id: "my_nfts",
    title: "My NFTs",
    slug: "#",
  },
  {
    id: "create_nft",
    title: "Create NFT",
    slug: "create",
  },
  {
    id: "settings",
    title: "Settings",
    slug: "settings",
  },
];
const { wallet } = inject<any>("provider");
</script>
<template>
  <teleport-modal>
    <template #default>
      <side-bar-layout>
        <template #default>
          <div class="w-full h-full flex flex-col py-6 px-6 gap-5">
            <widget-side-bar-links
              side-bar-name="isProfileMenuBar"
              :link-options="profileMenuLinks"
            />
            <div class="flex flex-col gap-2 text-sm text-gray-400 font-normal">
              <span>Connected wallet</span>
              <div
                v-if="wallet.length > 0"
                class="w-full h-auto flex flex-row items-center justify-between border dark:border-darkTheme-border rounded-2xl p-4 overflow-hidden"
              >
                <div class="flex flex-row gap-4">
                  <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div class="flex flex-col">
                    <div
                      class="flex flex-row items-center gap-2 flex-nowrap capitalize"
                    >
                      <div>{{ wallet[0].blockchain }}</div>
                      <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    </div>
                    <span class="text-gray-800">{{
                      shortenAddress(wallet[0].current_account, 5)
                    }}</span>
                  </div>
                </div>
                <div class="flex flex-row gap-2.5 items-center">
                  <copy-to-clip-board-icon />
                  <log-out-icon />
                </div>
              </div>
            </div>
          </div>
        </template>
      </side-bar-layout>
    </template>
  </teleport-modal>
</template>
