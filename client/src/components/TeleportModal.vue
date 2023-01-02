<script setup lang="ts">
import { inject, watchEffect, computed, ref } from "vue";
import { CloseIcon } from "./icons";
import { ButtonMiscellenous } from "./buttonui";
const {
  teleportModalOpenMenuBar,
  teleportModalCallback,
  chooseHowToConnectWallet,
} = inject<any>("provider");
const modalName = computed<string>(() =>
  teleportModalOpenMenuBar.value ? "isMenuBar" : "empty"
);
const menuBarRef = ref<any>(null);
watchEffect(() => {
  teleportModalOpenMenuBar.value;
  const closeTeleportModal = (event: { target: any }) => {
    if (menuBarRef.value && menuBarRef.value.contains(event.target)) {
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
      v-if="teleportModalOpenMenuBar"
      class="fixed w-full sm:backdrop-blur-lg h-screen top-0 right-0 left-0 z-30"
    >
      <div class="relative w-full h-full flex justify-end">
        <div
          ref="menuBarRef"
          class="relative w-full sm:w-1/2 animate-slide-in-right bg-white dark:bg-darkTheme dark:text-white sm:m-5 sm:rounded-2xl shadow-2xl overflow-y-auto"
        >
          <div class="flex flex-col py-6 px-6 gap-8">
            <ul class="flex flex-col text-2xl font-semibold gap-2">
              <li>Explore</li>
              <li><RouterLink to="/create">Create</RouterLink></li>
            </ul>
            <button-miscellenous
              v-on:click="chooseHowToConnectWallet($route.redirectedFrom?.path)"
              :has-list-content="false"
              class="text-base font-medium rounded-2xl py-3.5 bg-gray-900 dark:bg-white dark:text-gray-700 hover:bg-black text-darkTheme-text-b"
              >Connect wallet</button-miscellenous
            >
          </div>
        </div>
        <close-icon
          @click="teleportModalCallback({ name: modalName, open_modal: false })"
          class="absolute mx-4 mt-5 sm:mx-8 sm:mt-10 dark:text-darkTheme-text-b"
        />
      </div>
    </section>
  </teleport>
</template>
