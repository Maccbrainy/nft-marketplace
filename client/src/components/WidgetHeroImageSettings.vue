<script setup lang="ts">
import { ref, markRaw, inject } from "vue";
import { UploadImageIcon } from "./icons";
import { ButtonMiscellenous } from "./buttonui";

const {
  teleportModalCallback,
  teleportModalToastInfoHandler,
  appToastInformationBus,
} = inject<any>("provider");
const showEditProfileCoverImage = ref<boolean>(false);
const showEditProfileAvatar = ref<boolean>(false);

const openProfileCoverModal = () => {
  teleportModalCallback({
    name: "isSettingsUpdateToast",
    open_modal: true,
  });
  teleportModalToastInfoHandler({
    title: "Update cover",
    description:
      "Upload new cover. We recommend to upload images in 1440x640 resolution. Max 15 MB in JPEG format",
    isCoverImage: true,
    closeButtonTitle: "Cancel",
  });
};
const openProfileAvatarModal = () => {
  teleportModalCallback({
    name: "isSettingsUpdateToast",
    open_modal: true,
  });
  teleportModalToastInfoHandler({
    title: "Update avatar",
    description:
      "Upload new avatar. We recommend to upload images in 640x640 resolution. Max 5 MB in JPEG format",
    isAvatarImage: true,
    closeButtonTitle: "Cancel",
  });
};
</script>
<template>
  <div
    @mouseover="showEditProfileCoverImage = true"
    @mouseout="showEditProfileCoverImage = false"
    class="relative rounded-2xl bg-gray-100 dark:bg-darkTheme-bg w-full h-72 max-h-72 cursor-pointer"
  >
    <button-miscellenous
      v-show="showEditProfileCoverImage"
      @call-to-action="openProfileCoverModal"
      class="absolute float-right z-10 mr-4 mt-4 w-auto animate-slide-up bg-black text-white rounded-2xl py-3 dark:bg-white dark:text-black text-sm"
      :has-list-content="false"
      >Edit cover</button-miscellenous
    >
    <img
      v-if="appToastInformationBus.coverImageUrl"
      class="absolute w-full h-full object-center object-cover min-h-full min-w-full rounded-2xl"
      :src="appToastInformationBus.coverImageUrl"
    />

    <div
      @mouseover="showEditProfileAvatar = true"
      @mouseout="showEditProfileAvatar = false"
      :class="{
        'rounded-3xl': !$route.meta.requiresWalletAuth,
        'rounded-full': $route.meta.requiresWalletAuth,
      }"
      class="absolute flex justify-center items-center -bottom-5 bg-gray-400 h-28 w-28 z-10 left-8 ring-4 ring-offset-0 ring-white dark:ring-darkTheme overflow-hidden"
    >
      <img
        v-if="appToastInformationBus.avatarImageUrl"
        class="w-full h-full object-top object-cover"
        :src="appToastInformationBus.avatarImageUrl"
      />
      <button-miscellenous
        id-attr="absolute"
        v-show="showEditProfileAvatar"
        @call-to-action="openProfileAvatarModal"
        class="z-10 bg-black text-white rounded-full py-3 dark:bg-white dark:text-black text-sm"
        :has-list-content="false"
        ><component :is="markRaw(UploadImageIcon)"></component
      ></button-miscellenous>
    </div>
  </div>
</template>
