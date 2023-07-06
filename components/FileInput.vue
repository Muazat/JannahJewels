<template>
  <input
    class="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
    type="file"
    id="formFileMultiple"
    @change="handleFileChange"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: FileList | null;
}>();
const emit = defineEmits(["update:modelValue"]);

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.files);
};
</script>
