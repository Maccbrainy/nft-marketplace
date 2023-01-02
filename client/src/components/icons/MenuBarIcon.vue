<script setup lang="ts">
import { inject } from "vue";
const { teleportModalCallback } = inject<any>("provider");
</script>
<template>
  <svg
    @click="
      teleportModalCallback({
        name: 'isMenuBar',
        open_modal: true,
      })
    "
    viewBox="0 0 32 32"
    fill="none"
    width="24"
    height="24"
    xlmns="http://www.w3.org/2000/svg"
    class="w-8 h-8 dark:text-white cursor-pointer md:hidden"
  >
    <path
      d="M5.05366 12.0074H26.9346C27.52 12.0074 28 11.5527 28 10.9982C28 10.4436 27.52 10 26.9346 10H5.05366C4.46829 10 4 10.4436 4 10.9982C4 11.5416 4.46829 12.0074 5.05366 12.0074ZM5.05366 16.9982H26.9346C27.52 16.9982 28 16.5434 28 16C28 15.4344 27.52 14.9797 26.9346 14.9797H5.05366C4.46829 14.9797 4 15.4344 4 16C4 16.5434 4.46829 16.9982 5.05366 16.9982ZM5.05366 22H26.9346C27.52 22 28 21.5453 28 20.9797C28 20.4251 27.52 19.9815 26.9346 19.9815H5.05366C4.46829 19.9815 4 20.4362 4 20.9797C4 21.5342 4.46829 22 5.05366 22Z"
      fill="currentColor"
    ></path>
  </svg>
</template>
