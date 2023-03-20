<script setup lang="ts">
import { inject } from "vue";
import { TeleportModal } from ".";
import { ButtonMiscellenous } from "../buttonui";
defineProps({
  informationBus: Object,
});
const { activateModalSidebar, teleportModalCallback } = inject<any>("provider");
</script>
<template>
  <teleport-modal
    v-if="
      activateModalSidebar.name == 'isSettingsUpdateToast' && informationBus
    "
  >
    <template #sidebar>
      <div
        class="sf:absolute sf:bottom-0 flex flex-col w-full sm:w-[380px] p-8 rounded-t-3xl sm:rounded-2xl bg-white m-auto text-gray-500 font-normal text-base space-y-3"
      >
        <span class="place-self-center" v-if="informationBus.icon"
          ><component :is="informationBus.icon"></component
        ></span>
        <h1
          v-show="informationBus.title"
          :class="{
            'text-center text-3xl': informationBus.icon,
            'text-start text-xl': !informationBus.icon,
          }"
          class="text-gray-900 font-semibold"
        >
          {{ informationBus.title }}
        </h1>
        <p
          :class="{
            'text-center text-sm': informationBus.icon,
            'text-start': !informationBus.icon,
          }"
          v-show="informationBus.description"
        >
          {{ informationBus.description }}
        </p>
        <slot name="action-handlers"></slot>
        <button-miscellenous
          @call-to-action="
            teleportModalCallback({
              name: activateModalSidebar.name,
              open_modal: false,
            })
          "
          class="border rounded-2xl mt-1 py-2 w-full"
          :has-list-content="false"
          >{{ informationBus.closeButtonTitle }}</button-miscellenous
        >
      </div>
    </template>
  </teleport-modal>
</template>
