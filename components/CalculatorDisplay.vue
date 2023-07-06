<template>
  <div class="bg-screen-bg mt-4 w-full rounded-xl p-6">
    <h1 class="text-primary-text text-end text-5xl font-bold">
      {{ pressedKey || display }}
    </h1>
  </div>
</template>
<script lang="ts" setup>
const display = ref(0);
defineProps({
  pressedKey: {
    type: String,
  },
});
</script>
