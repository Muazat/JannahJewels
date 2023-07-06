<template>
  <div class="bg-toggle-bg mt-4 grid grid-cols-4 gap-4 rounded-xl p-4">
    <button
      :value="key"
      @click="$emit('display:modelValue', $event)"
      v-for="key in numbers"
      :key="key"
      class="border-key-shadow bg-key-bg text-sec-text w-16 rounded-xl border-b-4 py-3 text-4xl font-bold hover:brightness-125 md:w-24"
      :class="[
        key === 'DEL'
          ? 'bg-key2-bg border-key2-shadow text-accent-text text-2xl'
          : 'bg-key-bg',
      ]"
    >
      {{ key }}
    </button>
    <button
      value="Reset"
      class="border-key2-shadow bg-key2-bg text-accent-text col-span-2 rounded-xl border-b-4 py-3 text-3xl font-bold hover:brightness-125"
      @click="$emit('display:modelValue', $event)"
    >
      Reset
    </button>
    <button
      class="border-equal-key-shadow bg-toggle-equal-key text-eq-text col-span-2 rounded-xl border-b-4 py-3 text-3xl font-bold hover:brightness-125"
      value="Enter"
      @click="$emit('display:modelValue', $event)"
    >
      =
    </button>
  </div>
</template>
<script lang="ts" setup>
let numbers = [
  "7",
  "8",
  "9",
  "DEL",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "-",
  ".",
  "0",
  "/",
  "x",
];
const emit = defineEmits<{
  // (e: 'change', id: number): void
  (e: "display:modelValue", value: Event): void;
}>();
</script>
