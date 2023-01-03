<script setup lang="ts">
import { ref } from "vue";
import { ButtonInput } from "../buttonui";
import { CloseIcon } from "../icons";
const showSearchBar = ref(false);
</script>
<template>
  <button v-on:click="showSearchBar = !showSearchBar" class="lmin:hidden">
    <svg
      viewBox="0 0 25 24"
      fill="none"
      width="24"
      height="24"
      xlmns="http://www.w3.org/2000/svg"
      class="w-[34px] h-[34px] dark:text-white cursor-pointer"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.74658 11.125C7.74658 8.70875 9.70534 6.75 12.1216 6.75C14.5378 6.75 16.4966 8.70875 16.4966 11.125C16.4966 13.5412 14.5378 15.5 12.1216 15.5C9.70534 15.5 7.74658 13.5412 7.74658 11.125ZM12.1216 5C8.73884 5 5.99658 7.74226 5.99658 11.125C5.99658 14.5077 8.73884 17.25 12.1216 17.25C13.5005 17.25 14.773 16.7943 15.7967 16.0253C15.8212 16.0579 15.8482 16.0891 15.8779 16.1187L18.5029 18.7437C18.8446 19.0854 19.3986 19.0854 19.7403 18.7437C20.082 18.402 20.082 17.848 19.7403 17.5063L17.1153 14.8813C17.0857 14.8516 17.0545 14.8246 17.0219 14.8001C17.7909 13.7764 18.2466 12.5039 18.2466 11.125C18.2466 7.74226 15.5043 5 12.1216 5Z"
        fill="currentColor"
      ></path>
    </svg>
  </button>
  <teleport to="body">
    <div
      v-if="showSearchBar"
      class="fixed animate-slide-up w-full max-w-screen-2xl top-0 bg-white dark:bg-darkTheme flex flex-row justify-center items-center gap-4 z-30 py-4 px-4 sm:px-6 md:px-7 lg:px-8 mx-auto"
    >
      <ButtonInput
        class="w-full"
        input-type="search"
        place-holdertext="Search Web3"
      />
      <button><close-icon @click="showSearchBar = false"></close-icon></button>
    </div>
  </teleport>
</template>
