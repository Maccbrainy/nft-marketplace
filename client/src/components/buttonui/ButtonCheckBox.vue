<script setup lang="ts">
import type { OptionType } from "@/types";
import type { PropType } from "vue";
import { ButtonCheckBoxInput } from "@/components/buttonui";

// type Property = string | undefined

const props = defineProps({
  optionChecked: {
    type: Array as PropType<string[]>,
    required: true,
  },
  propertyOptions: {
    type: Array as PropType<OptionType[]>,
    required: true,
  },
});
let emit = defineEmits(["update:optionChecked"]);

const check = (propertyOptionId: string, checked: boolean) => {
  let updatedValue = [...props.optionChecked];
  if (checked) {
    updatedValue.push(propertyOptionId);
  } else {
    updatedValue.splice(updatedValue.indexOf(propertyOptionId), 1);
  }
  emit("update:optionChecked", updatedValue);
  console.log("Checkbox optionId:", propertyOptionId);
  console.log("Checkbox checked:", checked);
  console.log("Checkbox updatedValue:", updatedValue);
  console.log("Checkbox OptionChecked:", [...props.optionChecked]);
};
</script>
<template>
  <ul class="py-1">
    <li
      class="px-2 py-2.5 block hover:bg-gray-100 rounded-xl"
      v-for="propertyOption in propertyOptions"
      v-bind:key="propertyOption.id"
    >
      <ButtonCheckBoxInput
        v-bind:checked="optionChecked.includes(propertyOption.id)"
        @update:checked="check(propertyOption.id, $event)"
        v-bind:fieldId="propertyOption.id"
        v-bind:label="propertyOption.id"
      >
        <span class="text-sm text-gray-400 font-semibold">{{
          propertyOption.name
        }}</span>
      </ButtonCheckBoxInput>
    </li>
  </ul>
</template>
