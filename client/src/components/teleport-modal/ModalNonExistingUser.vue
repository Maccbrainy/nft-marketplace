<script setup lang="ts">
import { inject, ref } from "vue";
import { TeleportModal } from ".";
import { ButtonMiscellenous, ButtonInput, ButtonCheckBox } from "../buttonui";

const accountTermsOfServiceAgreement = [
  {
    id: "termsOfServiceAgreement",
    name: "I have read and accept the Terms of Service and confirmed that I am at least 13 years old",
    icon: false,
  },
];
const acceptTermsOfService = ref<string[]>([]);
const registerNewUserAccount = ref<{
  fullName: string;
  email: string;
  acceptedTermsOfService: boolean;
}>({
  fullName: "",
  email: "",
  acceptedTermsOfService: false,
});
const { activateModalSidebar, teleportModalCallback } = inject<any>("provider");
const acceptedTermsOfServiceAgreements = () => {
  registerNewUserAccount.value.acceptedTermsOfService =
    acceptTermsOfService.value.length > 0 ?? false;
};
const finishSignUp = () => {
  const { fullName, email, acceptedTermsOfService } =
    registerNewUserAccount.value;
  if (!fullName || !email || !acceptedTermsOfService) return;
  console.log("finishSignUp:", registerNewUserAccount.value);
};
</script>
<template>
  <teleport-modal v-if="activateModalSidebar.name == 'nonExistingUserForm'">
    <template #sidebar>
      <div
        class="sf:absolute sf:bottom-0 flex flex-col w-full sm:w-[380px] p-8 border dark:border-darkTheme-border rounded-t-3xl sm:rounded-2xl bg-white dark:bg-darkTheme m-auto text-gray-500 dark:text-darkTheme-text font-normal text-base space-y-3"
      >
        <h1 class="text-2xl font-semibold text-center dark:text-white">
          You are almost there!
        </h1>
        <p class="text-center text-sm font-normal">
          Choose a display name and enter your email address to receive updates
          when your NFTs sell or receive offers.
        </p>
        <form @submit.prevent="finishSignUp" class="space-y-3">
          <button-input
            v-model:input-value="registerNewUserAccount.fullName"
            input-type="text"
            place-holdertext="Display name"
            :is-text-area="false"
          />
          <button-input
            v-model:input-value="registerNewUserAccount.email"
            input-type="email"
            place-holdertext="Enter your email"
            :is-text-area="false"
          />
          <button-check-box
            v-model:option-checked="acceptTermsOfService"
            :property-options="accountTermsOfServiceAgreement"
            @change="acceptedTermsOfServiceAgreements"
          />
          <button-miscellenous
            type="submit"
            :class="{
              'cursor-not-allowed active:scale-100':
                !registerNewUserAccount.acceptedTermsOfService ||
                !registerNewUserAccount.fullName ||
                !registerNewUserAccount.email
            }"
            class="bg-gray-100 rounded-2xl hover:bg-gray-200 py-3 dark:bg-darkTheme-bg-0.08 dark:hover:bg-darkTheme-hover font-semibold text-sm mt-3"
            :has-list-content="false"
            >Finish sign-up</button-miscellenous
          >
        </form>
        <button-miscellenous
          @call-to-action="
            teleportModalCallback({
              name: activateModalSidebar.name,
              open_modal: false,
            })
          "
          class="border transition-all duration-300 dark:border-darkTheme-border dark:hover:border-darkTheme-hover-b rounded-2xl mt-1 py-2.5 w-full dark:text-white font-semibold text-sm"
          :has-list-content="false"
          >Disconnect</button-miscellenous
        >
      </div>
    </template>
  </teleport-modal>
</template>
