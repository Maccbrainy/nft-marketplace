<template>
  <div
    class="relative w-full h-auto sm:w-[380px] 2xl:w-[480px] animate-slide-in-right bg-white dark:bg-darkTheme dark:text-white sm:m-5 sm:rounded-2xl shadow-2xl dark:shadow-2xl overflow-y-auto"
  >
    <div class="relative mt-8 ml-6">
      <slot name="header"></slot>
    </div>
    <slot name="default"></slot>
  </div>
</template>
