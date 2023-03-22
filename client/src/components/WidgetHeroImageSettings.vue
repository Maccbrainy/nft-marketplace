<script setup lang="ts">
import { ref, markRaw, reactive, inject } from "vue";
import type { ToastSettingsInformation } from "@/types";
import { UploadImageIcon } from "./icons";
import { useImageFileReader } from "@/utils";
import IsProcessingStatus from "./IsProcessingStatus.vue";
import { ButtonMiscellenous, ButtonImageUpload } from "./buttonui";
import { ModalSettingsUpdateToast } from "./teleport-modal";

const isProcessing = ref<boolean>(false);
const { teleportModalCallback } = inject<any>("provider");
const showEditProfileCoverImage = ref<boolean>(false);
const showEditProfileAvatar = ref<boolean>(false);
const profileImagesSettings = reactive({
  coverImageName: "",
  coverImageUrl: "",
  avatarImageName: "",
  avatarImageUrl: "",
});
const toastSettingsInformation = ref<ToastSettingsInformation>({
  title: "",
  description: "",
  icon: undefined,
  isCoverImage: false,
  isAvatarImage: false,
  isVerifyUser: false,
  isSaveUserSetting: false,
  closeButtonTitle: "Close",
});

const uploadProfileCoverImage = async (file: any) => {
  isProcessing.value = true;
  const { fileurl, fileName } = await useImageFileReader(file);
  profileImagesSettings.coverImageUrl = fileurl;
  profileImagesSettings.coverImageName = fileName;
  isProcessing.value = false;
};

const uploadProfileAvatar = async (file: any) => {
  isProcessing.value = true;
  const { fileurl, fileName } = await useImageFileReader(file);
  profileImagesSettings.avatarImageUrl = fileurl;
  profileImagesSettings.avatarImageName = fileName;
  isProcessing.value = false;
};
const openProfileCoverModal = () => {
  teleportModalCallback({
    name: "isSettingsUpdateToast",
    open_modal: true,
  });
  toastSettingsInformation.value = {
    title: "Update cover",
    description:
      "Upload new cover. We recommend to upload images in 1440x640 resolution. Max 15 MB in JPEG format",
    isCoverImage: true,
    closeButtonTitle: "Cancel",
  };
};
const openProfileAvatarModal = () => {
  teleportModalCallback({
    name: "isSettingsUpdateToast",
    open_modal: true,
  });
  toastSettingsInformation.value = {
    title: "Update avatar",
    description:
      "Upload new avatar. We recommend to upload images in 640x640 resolution. Max 5 MB in JPEG format",
    isAvatarImage: true,
    closeButtonTitle: "Cancel",
  };
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
      v-show="profileImagesSettings.coverImageUrl"
      class="absolute w-full h-full object-center object-cover min-h-full min-w-full rounded-2xl"
      :src="profileImagesSettings.coverImageUrl"
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
        v-show="profileImagesSettings.avatarImageUrl"
        class="w-full h-full object-top object-cover min-h-full min-w-full"
        :src="profileImagesSettings.avatarImageUrl"
      />
      <button-miscellenous
        v-show="showEditProfileAvatar"
        @call-to-action="openProfileAvatarModal"
        class="z-10 bg-black text-white rounded-full py-3 dark:bg-white dark:text-black text-sm"
        :has-list-content="false"
        ><component :is="markRaw(UploadImageIcon)"></component
      ></button-miscellenous>
    </div>
  </div>
  <modal-settings-update-toast :informationBus="toastSettingsInformation"
    ><template #action-handlers>
      <IsProcessingStatus
        v-show="isProcessing"
        class="w-12 place-self-center"
      />
      <button-image-upload
        v-show="
          toastSettingsInformation.isCoverImage &&
          !profileImagesSettings.coverImageUrl
        "
        @on-change-file-upload="uploadProfileCoverImage"
        label-name="Select file"
      />
      <button-image-upload
        v-show="
          toastSettingsInformation.isAvatarImage &&
          !profileImagesSettings.avatarImageUrl
        "
        @on-change-file-upload="uploadProfileAvatar"
        label-name="Select file"
      /> </template
  ></modal-settings-update-toast>
</template>
