<script setup lang="ts">
import { inject, reactive } from "vue";
import { useRouter } from "vue-router";
import { useImageFileReader } from "@/utils";
import { TeleportModal } from ".";
import { ButtonMiscellenous, ButtonImageUpload } from "../buttonui";
import IsProcessingStatus from "../IsProcessingStatus.vue";

const router = useRouter();
const profileImagesSettings = reactive({
  coverImageName: "",
  coverImageUrl: "",
  avatarImageName: "",
  avatarImageUrl: "",
});
const {
  activateModalSidebar,
  teleportModalCallback,
  serviceDiscoveryAndDeliveryHandler,
  serviceDiscoveryAndDelivery,
} = inject<any>("provider");

const uploadProfileCoverImage = async (file: any) => {
  serviceDiscoveryAndDeliveryHandler({
    isProcessing: true,
    description: "Your cover image is uploading...",
    closeButtonTitle: "Cancel",
  });
  const { fileurl, fileName } = await useImageFileReader(file);

  profileImagesSettings.coverImageUrl = fileurl;
  profileImagesSettings.coverImageName = fileName;
  serviceDiscoveryAndDeliveryHandler({
    isProcessing: false,
    coverImageUrl: fileurl,
    isCoverImage: false,
    description: "Cover image successfully uploaded",
    closeButtonTitle: "Close",
  });
};

const uploadProfileAvatar = async (file: any) => {
  serviceDiscoveryAndDeliveryHandler({
    isProcessing: true,
    description: "Your avatar image is uploading...",
    closeButtonTitle: "Cancel",
  });

  const { fileurl, fileName } = await useImageFileReader(file);
  profileImagesSettings.avatarImageUrl = fileurl;
  profileImagesSettings.avatarImageName = fileName;

  serviceDiscoveryAndDeliveryHandler({
    isProcessing: false,
    avatarImageUrl: fileurl,
    isAvatarImage: false,
    description: "Avatar image successfully uploaded",
    closeButtonTitle: "Close",
  });
};
const goToMyItemsOwned = () => {
  teleportModalCallback({
    name: "isSettingsUpdateToast",
    open_modal: false,
  });
  router.push({
    path: "/items",
  });
};
</script>
<template>
  <teleport-modal v-if="activateModalSidebar.name == 'isSettingsUpdateToast'">
    <template #sidebar>
      <div
        class="sf:absolute sf:bottom-0 flex flex-col w-full sm:w-[380px] p-8 rounded-t-3xl sm:rounded-2xl bg-white m-auto text-gray-500 font-normal text-base space-y-3"
      >
        <IsProcessingStatus
          v-show="serviceDiscoveryAndDelivery.isProcessing"
          class="w-12 place-self-center"
        />
        <span class="place-self-center" v-if="serviceDiscoveryAndDelivery.icon"
          ><component :is="serviceDiscoveryAndDelivery.icon"></component
        ></span>
        <h1
          v-show="serviceDiscoveryAndDelivery.title"
          :class="{
            'text-3xl': serviceDiscoveryAndDelivery.icon,
            'text-xl': !serviceDiscoveryAndDelivery.icon,
          }"
          class="text-center text-gray-900 font-semibold"
        >
          {{ serviceDiscoveryAndDelivery.title }}
        </h1>
        <p
          :class="{
            'text-center text-sm': serviceDiscoveryAndDelivery.icon,
            'text-center': !serviceDiscoveryAndDelivery.icon,
          }"
          v-show="serviceDiscoveryAndDelivery.description"
        >
          {{ serviceDiscoveryAndDelivery.description }}
        </p>

        <button-image-upload
          v-show="
            serviceDiscoveryAndDelivery.isCoverImage &&
            !serviceDiscoveryAndDelivery.coverImageUrl
          "
          @on-change-file-upload="uploadProfileCoverImage"
          label-name="Select file"
        />
        <button-image-upload
          v-show="
            serviceDiscoveryAndDelivery.isAvatarImage &&
            !serviceDiscoveryAndDelivery.avatarImageUrl
          "
          @on-change-file-upload="uploadProfileAvatar"
          label-name="Select file"
        />
        <button-miscellenous
          v-show="
            serviceDiscoveryAndDelivery.saveUserProfileSettingsMethod &&
            !serviceDiscoveryAndDelivery.isProcessing
          "
          @call-to-action="goToMyItemsOwned"
          type="button"
          class="bg-black text-white rounded-xl py-3 dark:bg-white dark:text-black mt-2 text-sm"
          :has-list-content="false"
          >Continue</button-miscellenous
        >
        <button-miscellenous
          @call-to-action="
            teleportModalCallback({
              name: activateModalSidebar.name,
              open_modal: false,
            })
          "
          class="border rounded-2xl mt-1 py-2 w-full"
          :has-list-content="false"
          >{{
            serviceDiscoveryAndDelivery.closeButtonTitle
          }}</button-miscellenous
        >
      </div>
    </template>
  </teleport-modal>
</template>
