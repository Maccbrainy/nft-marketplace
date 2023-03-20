<script setup lang="ts">
import { inject, watchEffect, ref } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { CloseIcon } from "../icons";
const { teleportModalCallback, activateModalSidebar } = inject<any>("provider");
const isTabletToLargeScreenMinWidth640px = useMediaQuery("(min-width: 640px)");

const modalMenuRef = ref<any>(null);
watchEffect(() => {
  const { name, active } = activateModalSidebar.value;
  if (isTabletToLargeScreenMinWidth640px.value && active) {
    const closeTeleportModal = (event: { target: any }) => {
      if (modalMenuRef.value && modalMenuRef.value.contains(event.target)) {
        return;
      }
      document.removeEventListener("mousedown", closeTeleportModal);
      document.removeEventListener("touchstart", closeTeleportModal);
      teleportModalCallback({ name: name, open_modal: false });
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
      v-if="activateModalSidebar.active"
      :class="{
        'sm:backdrop-blur-lg':
          activateModalSidebar.active &&
          activateModalSidebar.name !== 'isSettingsUpdateToast',
        'bg-[#000000de]': activateModalSidebar.name === 'isSettingsUpdateToast',
      }"
      class="fixed w-full h-screen top-0 right-0 left-0 z-30"
    >
      <div
        :class="{
          'sm:justify-center':
            activateModalSidebar.name === 'isSettingsUpdateToast',
          'justify-end': activateModalSidebar.name !== 'isSettingsUpdateToast',
        }"
        class="flex relative w-full h-full"
      >
        <div class="sf:w-full h-full flex justify-end" ref="modalMenuRef">
          <slot name="sidebar"></slot>
        </div>
      </div>
      <close-icon
        @click="
          teleportModalCallback({
            name: activateModalSidebar.name,
            open_modal: false,
          })
        "
        :class="{
          'sm:mt-12 dark:text-darkTheme-text-b':
            activateModalSidebar.name !== 'isSettingsUpdateToast',
          'border border-darkTheme-border text-white hover:bg-transparent hover:border-darkTheme-hover-b':
            activateModalSidebar.name === 'isSettingsUpdateToast',
        }"
        class="absolute top-0 right-0 mx-4 mt-5 sm:mx-8"
      />
    </section>
  </teleport>
</template>
