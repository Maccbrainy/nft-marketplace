<script setup lang="ts">
import { ButtonMiscellenous } from "../buttonui";

const tokenLastestBidsData = [
  {
    name: "Playboypunk.eth",
    timeSignature: "2 weeks ago",
    type: "Floor bid",
    price: 1.2,
    currency: "wETH",
    dollarEquivalent: 1888,
    expirationDate: "10 weeks",
  },
  {
    name: "Chao",
    timeSignature: "3 weeks ago",
    type: "Floor bid",
    price: 3.2,
    currency: "wETH",
    dollarEquivalent: 10828,
    expirationDate: null,
  },
  {
    name: "Beehive",
    timeSignature: "4 weeks ago",
    type: "Floor bid",
    price: 3.3,
    currency: "wETH",
    dollarEquivalent: 11882,
    expirationDate: null,
  },
];
const imageUrl = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9IjE0MDkzMzY3Mjg5NTciPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSJyZ2IoMCwgNjgsIDI1NSkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDI1NSwgMCwgNjgpIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0idXJsKCMxNDA5MzM2NzI4OTU3KSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIj48L3JlY3Q+CiAgPC9nPgo8L3N2Zz4=`;
</script>
<template>
  <div
    class="w-full h-auto flex flex-col gap-7 border dark:border-darkTheme-border rounded-2xl py-5 px-5 lmin:px-7 mt-4 text-base font-medium"
  >
    <div
      v-for="(data, index) in tokenLastestBidsData"
      :key="data.name + index"
      class="flex flex-row justify-between items-center"
    >
      <div class="flex flex-row items-center gap-3">
        <div
          class="flex justify-center items-center h-10 w-10 min-w-[40px] bg-gray-50 dark:bg-darkTheme-bg rounded-full overflow-hidden"
        >
          <img
            class="h-10 w-10 rounded-full object-cover object-center cursor-pointer"
            :src="imageUrl"
          />
        </div>
        <div class="flex flex-col">
          <span class="cursor-pointer truncate">{{ data.name }}</span>
          <ul
            class="flex xs:flex-wrap-reverse text-xs text-gray-400 dark:text-darkTheme-text font-normal list-inside list-disc gap-2"
          >
            <li class="marker:hidden">
              <span class="-ml-1 whitespace-nowrap">{{ data.timeSignature }}</span>
            </li>
            <li v-if="data.expirationDate">
              <span class="-ml-1 truncate">Expires in {{ data.expirationDate }}</span>
            </li>
            <li>
              <span class="-ml-1 truncate">{{ data.type }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex flex-col items-end">
        <span class="whitespace-nowrap">{{ `${data.price} ${data.currency}` }}</span>
        <span class="text-gray-400 dark:text-darkTheme-text text-xs">${{ data.dollarEquivalent }}</span>
      </div>
    </div>
    <ButtonMiscellenous
      :has-list-content="false"
      class="bg-gray-100 rounded-2xl hover:bg-gray-200 py-3 dark:bg-darkTheme-bg dark:hover:bg-darkTheme-hover"
      >See all</ButtonMiscellenous
    >
  </div>
</template>
