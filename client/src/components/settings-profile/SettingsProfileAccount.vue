<script setup lang="ts">
import { reactive, ref } from "vue";
import { useHandleImageChange } from "@/utils";
import {
  ButtonInput,
  ButtonMiscellenous,
  ButtonImageUpload,
} from "../buttonui";
import { TwitterIcon, UploadImageIcon } from "../icons";

interface ProfileAccountSettings {
  fullName: string;
  username: string;
  shortBio: string;
  email: string;
  websiteURL: string;
  twitterUsername: string;
}
const isInputWarning = ref<boolean>(false);
const userProfileAccountSettings = reactive<ProfileAccountSettings>({
  fullName: "",
  username: "",
  shortBio: "",
  email: "",
  websiteURL: "",
  twitterUsername: "",
});
const showEditProfileCoverImage = ref<boolean>(false);
const showEditProfileAvatar = ref<boolean>(false);
const profileImagesSettings = reactive({
  coverImageName: "",
  coverImageUrl: "",
  avatarImageName: "",
  avatarImageUrl: "",
});

const profileCoverImageHandler = async (file: any) => {
  const { fileurl, fileName } = await useHandleImageChange(file);
  profileImagesSettings.coverImageUrl = fileurl;
  profileImagesSettings.coverImageName = fileName;
};
const uploadProfileAvatar = async (file: any) => {
  const { fileurl, fileName } = await useHandleImageChange(file);
  profileImagesSettings.avatarImageUrl = fileurl;
  profileImagesSettings.avatarImageName = fileName;
};
const confirmEmailHandler = () => {
  const { email } = userProfileAccountSettings;
  if (!email) return (isInputWarning.value = true);
  console.log("User Email:", email);
};
const linkTwitterHandler = () => {
  const { twitterUsername } = userProfileAccountSettings;
  if (!twitterUsername) return (isInputWarning.value = true);
  console.log("Linking Twitter action");
};
const saveUserProfileSettings = () => {
  // const { fullName, username, shortBio, email, websiteURL, twitterUsername } =
  //   userProfileAccountSettings;
  const userProfileSettings: any = {};
  Object.keys(userProfileAccountSettings).forEach((key: string) => {
    if ((userProfileAccountSettings as any)[key])
      userProfileSettings[key] = (userProfileAccountSettings as any)[key];
  });
  console.log("userProfileSettings", userProfileSettings);
};
const verifyUserHandler = () => {
  const { fullName, username, shortBio, email, websiteURL, twitterUsername } =
    userProfileAccountSettings;
  //Check for empty  field and warning activated
  if (
    !fullName ||
    !username ||
    !shortBio ||
    !email ||
    !websiteURL ||
    !twitterUsername
  )
    return (isInputWarning.value = true);
  console.log("verify user data:", userProfileAccountSettings);
};
</script>
<template>
  <div class="relative flex flex-col">
    <div
      @mouseover="showEditProfileCoverImage = true"
      @mouseout="showEditProfileCoverImage = false"
      class="relative rounded-2xl bg-gray-100 dark:bg-darkTheme-bg w-full h-72 max-h-72 cursor-pointer"
    >
      <button-image-upload
        v-show="showEditProfileCoverImage"
        class="animate-slide-up"
        @on-change-image-action="profileCoverImageHandler"
        label-name="Edit cover"
      />
      <img
        v-show="profileImagesSettings.coverImageUrl"
        class="absolute w-full h-full object-center object-cover min-h-full min-w-full rounded-2xl"
        :src="profileImagesSettings.coverImageUrl"
      />

      <div
        @mouseover="showEditProfileAvatar = true"
        @mouseout="showEditProfileAvatar = false"
        class="absolute flex justify-center items-center -bottom-5 bg-gray-400 h-28 w-28 rounded-full z-10 left-8 ring-4 ring-offset-0 ring-white dark:ring-darkTheme overflow-hidden"
      >
        <img
          v-show="profileImagesSettings.avatarImageUrl"
          class="w-full h-full object-center object-contain min-h-full min-w-full"
          :src="profileImagesSettings.avatarImageUrl"
        />
        <button-image-upload
          v-show="showEditProfileAvatar"
          @on-change-image-action="uploadProfileAvatar"
          label-name="Edit Avatar"
          :label-icon="UploadImageIcon"
        />
        <!-- <button-miscellenous
          @selection-action="uploadProfileAvatar"
          v-show="showEditProfileAvatar"
          :has-list-content="false"
          class="rounded-2xl py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-darkTheme-bg dark:text-darkTheme-text dark:hover:bg-darkTheme-hover dark:hover:text-darkTheme-text-b"
        >
          <upload-image-icon />
        </button-miscellenous> -->
      </div>
    </div>
    <div
      class="relative w-full flex flex-row gap-4 items-start pt-10 font-normal"
    >
      <form @submit.prevent="saveUserProfileSettings" class="w-[65%] space-y-8">
        <button-input
          v-model:input-value="userProfileAccountSettings.fullName"
          label-name="Display name"
          input-type="text"
          place-holdertext="Your name"
          :is-text-area="false"
          :is-required="isInputWarning && !userProfileAccountSettings.fullName"
        />
        <button-input
          v-model:input-value="userProfileAccountSettings.username"
          label-name="Username"
          label-symbol="@"
          input-type="text"
          place-holdertext="Enter your username"
          description-end="Your profile will be available on interestQQ.com/[username]"
          :is-text-area="false"
          :is-required="isInputWarning && !userProfileAccountSettings.username"
        />
        <button-input
          v-model:input-value="userProfileAccountSettings.shortBio"
          label-name="Short bio"
          input-type="text"
          place-holdertext="Tell yourself in a few words"
          :is-text-area="true"
          :is-required="isInputWarning && !userProfileAccountSettings.shortBio"
        />
        <button-input
          v-model:input-value="userProfileAccountSettings.email"
          label-name="Email"
          input-type="email"
          label-description="Your email for marketplace notifications"
          place-holdertext="Enter your email"
          call-to-action-name="Confirm"
          v-on:callToActionHandler="confirmEmailHandler"
          :is-required="isInputWarning && !userProfileAccountSettings.email"
          :is-text-area="false"
        />
        <div class="flex flex-col space-y-6 pt-5">
          <div>
            <h1 class="text-xl font-medium text-gray-800">Social links</h1>
            <p>
              Add your existing social links to build a stronger reputation.
            </p>
          </div>
          <button-input
            v-model:input-value="userProfileAccountSettings.websiteURL"
            label-name="Website URL"
            input-type="text"
            place-holdertext="https://"
            :is-text-area="false"
            :is-required="
              isInputWarning && !userProfileAccountSettings.websiteURL
            "
          />
          <button-input
            v-model:input-value="userProfileAccountSettings.twitterUsername"
            label-name="Twitter"
            input-type="text"
            :label-icon="TwitterIcon"
            place-holdertext="Enter your twitter username"
            call-to-action-name="Link"
            v-on:callToActionHandler="linkTwitterHandler"
            :is-text-area="false"
            :is-required="
              isInputWarning && !userProfileAccountSettings.twitterUsername
            "
          />
        </div>
        <button-miscellenous
          type="submit"
          class="w-auto bg-black text-white rounded-xl py-3 dark:bg-white dark:text-black mt-2 text-sm"
          :has-list-content="false"
          >Save settings</button-miscellenous
        >
      </form>
      <div class="sticky top-20 w-[25%] flex items-start">
        <div
          class="w-[250px] min-w-[250px] flex flex-col shadow-lg rounded-2xl p-2.5"
        >
          <div class="w-full h-[130px] rounded-2xl bg-gray-200"></div>
          <div class="flex flex-col p-2">
            <h1 class="text-gray-800 my-3 text-lg">Verify your account</h1>
            <p class="mb-4 text-xs">
              Proceed with verification process to get more visibility and gain
              trust on InterestQQ
            </p>
            <button-miscellenous
              @call-to-action="verifyUserHandler"
              :has-list-content="false"
              class="border font-normal text-gray-800 rounded-2xl hover:bg-gray-200 py-2 dark:bg-darkTheme-bg dark:hover:bg-darkTheme-hover"
              >Get verified</button-miscellenous
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
