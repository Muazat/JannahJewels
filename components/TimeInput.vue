<template>
  <div class="mb-0 w-4/5 md:w-2/3">
    <Datepicker
      v-model="modelValue"
      time-picker
      v-bind="$attrs"
      placeholder="Select time"
    ></Datepicker>
  </div>
</template>

<script setup lang="ts">
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
defineProps<{
  modelValue?: {};
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

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
