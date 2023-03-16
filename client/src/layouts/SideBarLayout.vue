<template>
  <div
    class="relative w-full sm:w-[340px] 2xl:w-3/12 animate-slide-in-right bg-white dark:bg-darkTheme dark:text-white sm:m-5 sm:rounded-2xl shadow-2xl dark:shadow-2xl overflow-y-auto"
  >
    <main class="w-full h-full flex flex-col py-6 px-6 gap-5">
      <slot name="default"></slot>
    </main>
  </div>
</template>
