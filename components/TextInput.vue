<template>
  <div class="mb-0 w-4/5 md:w-2/3">
    <input
      type="text"
      v-bind="$attrs"
      class="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
      v-model="data"
    />
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);
</script>
