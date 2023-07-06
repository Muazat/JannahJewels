<template>
  <div class="mb-0 w-4/5 md:w-2/3">
    <select
      class="form-select m-0 block w-full appearance-none rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
      aria-label="Default select example"
      v-model="data"
    >
      <option v-for="option in options" :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: string;
  options: string[];
}>();
const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);
</script>
