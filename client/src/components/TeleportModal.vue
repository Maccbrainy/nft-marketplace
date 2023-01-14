<script setup lang="ts">
import { inject, watchEffect, computed, ref } from "vue";
import { shortenAddress } from "@/utils";
import { CloseIcon, LogOutIcon } from "./icons";
import { ButtonMiscellenous } from "./buttonui";
import { TableAssetsSideBar } from "./tables";
const {
  teleportModalCallback,
  teleportModalOpenMenuBar,
  teleportModalOpenProfileMenuBar,
  teleportModalTableAssetsFilters,
  chooseHowToConnectWallet,
  isLargeScreen,
  wallet,
} = inject<any>("provider");
const modalName = computed<string>(() =>
  teleportModalOpenMenuBar.value
    ? "isMenuBar"
    : teleportModalTableAssetsFilters.value
    ? "isTableAssetFilters"
    : teleportModalOpenProfileMenuBar.value
    ? "isProfileMenuBar"
    : ""
);
const modalMenuRef = ref<any>(null);
watchEffect(() => {
  teleportModalOpenProfileMenuBar.value;
  teleportModalOpenMenuBar.value;
  teleportModalTableAssetsFilters.value;
  console.log(
    "teleportModalOpenProfileMenuBar.value",
    teleportModalOpenProfileMenuBar.value
  );

  const closeTeleportModal = (event: { target: any }) => {
    if (modalMenuRef.value && modalMenuRef.value.contains(event.target)) {
      return;
    }
    document.removeEventListener("mousedown", closeTeleportModal);
    document.removeEventListener("touchstart", closeTeleportModal);
    teleportModalCallback({ name: modalName.value, open_modal: false });
  };
  document.addEventListener("mousedown", closeTeleportModal);
  document.addEventListener("touchstart", closeTeleportModal);
});
</script>
<template>
  <teleport to="body">
    <section
      v-if="
        teleportModalOpenMenuBar ||
        teleportModalTableAssetsFilters ||
        teleportModalOpenProfileMenuBar
      "
      class="fixed w-full sm:backdrop-blur-lg h-screen top-0 right-0 left-0 z-30"
    >
      <div class="relative w-full h-full flex justify-end">
        <div
          ref="modalMenuRef"
          class="relative w-full sm:w-1/2 lmin:w-3/12 animate-slide-in-right bg-white dark:bg-darkTheme dark:text-white sm:m-5 sm:rounded-2xl shadow-2xl dark:shadow-2xl overflow-y-auto"
        >
          <div
            v-show="teleportModalOpenMenuBar || teleportModalOpenProfileMenuBar"
            class="w-full h-full flex flex-col py-6 px-6 gap-8"
          >
            <div v-show="teleportModalOpenMenuBar" class="flex flex-col gap-6">
              <ul class="flex flex-col text-2xl font-semibold gap-2">
                <li>Explore</li>
                <li><RouterLink to="/create">Create</RouterLink></li>
              </ul>
              <button-miscellenous
                v-if="wallet.length == 0"
                v-on:click="
                  chooseHowToConnectWallet($route.redirectedFrom?.path)
                "
                :has-list-content="false"
                class="font-semibold text-xs rounded-2xl py-3 bg-gray-900 dark:bg-white dark:text-black hover:bg-black text-darkTheme-text-b"
                >Connect wallet</button-miscellenous
              >
            </div>
            <div
              v-show="teleportModalOpenProfileMenuBar"
              class="w-full h-full flex flex-col gap-5"
            >
              <ul class="flex flex-col text-2xl font-semibold gap-2">
                <li><RouterLink to="/">My NFTs</RouterLink></li>
                <li><RouterLink to="/create">Create NFT</RouterLink></li>
                <li><RouterLink to="/">Settings</RouterLink></li>
              </ul>
              <div
                class="flex flex-col gap-2 text-sm text-gray-400 font-normal"
              >
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
                        <div>{{ wallet[0].networkName }}</div>
                        <div
                          class="w-1.5 h-1.5 bg-green-500 rounded-full"
                        ></div>
                      </div>
                      <span class="text-gray-800">{{
                        shortenAddress(wallet[0].current_account)
                      }}</span>
                    </div>
                  </div>
                  <div class="flex flex-row gap-2.5 items-center">
                    <LogOutIcon />
                    <LogOutIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TableAssetsSideBar
            v-show="!isLargeScreen && teleportModalTableAssetsFilters"
            class="pt-12 px-6 xs:px-7"
          />
        </div>
        <close-icon
          @click="teleportModalCallback({ name: modalName, open_modal: false })"
          class="absolute mx-4 mt-5 sm:mx-8 sm:mt-10 dark:text-darkTheme-text-b"
        />
      </div>
    </section>
  </teleport>
</template>
