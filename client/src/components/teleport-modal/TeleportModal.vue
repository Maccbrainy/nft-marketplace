<script setup lang="ts">
import { inject, watchEffect, computed, ref } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { CloseIcon } from "../icons";
const {
  teleportModalCallback,
  teleportModalOpenMenuBar,
  teleportModalOpenProfileMenuBar,
  teleportModalTableAssetsFilters,
} = inject<any>("provider");
const isTabletToLargeScreenMinWidth640px = useMediaQuery("(min-width: 640px)");
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
  if (isTabletToLargeScreenMinWidth640px.value) {
    teleportModalOpenProfileMenuBar.value;
    teleportModalOpenMenuBar.value;
    teleportModalTableAssetsFilters.value;
    const closeTeleportModal = (event: { target: any }) => {
      if (modalMenuRef.value && modalMenuRef.value.contains(event.target)) {
        return;
      }
      document.removeEventListener("mousedown", closeTeleportModal);
      document.removeEventListener("touchstart", closeTeleportModal);
      teleportModalCallback({ name: modalName.value, open_modal: false });
      return;
    };
    document.addEventListener("mousedown", closeTeleportModal);
    document.addEventListener("touchstart", closeTeleportModal);
  }
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
      :class="{
        'sm:backdrop-blur-lg':
          teleportModalOpenMenuBar ||
          teleportModalTableAssetsFilters ||
          teleportModalOpenProfileMenuBar,
      }"
      class="fixed w-full h-screen top-0 right-0 left-0 z-30"
    >
      <div class="relative w-full h-full flex justify-end">
        <slot name="default" ref="modalMenuRef"></slot>
      </div>
      <close-icon
        @click="teleportModalCallback({ name: modalName, open_modal: false })"
        class="absolute top-0 right-0 mx-4 mt-5 sm:mx-8 sm:mt-12 dark:text-darkTheme-text-b"
      />
    </section>
  </teleport>
</template>
