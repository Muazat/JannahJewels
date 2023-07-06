<template>
  <div class="mb-0 w-4/5 md:w-2/3">
    <Datepicker
      v-model="modelValue"
      auto-apply
      :enable-time-picker="false"
      :format="format"
      v-bind="$attrs"
      placeholder="Select a date"
    ></Datepicker>
  </div>
</template>

<script setup lang="ts">
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
defineProps<{
  modelValue?: Date | string;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
const value = ref(0);
const modelValue = computed({
  get() {
    return value.value;
  },
  set(val) {
    value.value = val;
    emit("update:modelValue", value.value);
  },
});
</script>
