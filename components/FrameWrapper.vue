<template>
  <div>
    <iframe :src="fileURL" v-if="fileURL" class="h-[400px] w-full" />
    <div v-else class="flex h-screen items-center justify-center">
      <div class="flex flex-col items-center">
        <Icon name="mdi:file-pdf-outline" class="h-24 w-24 text-gray-300" />
        <div class="text-gray-300">File Can not be previewed</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(["fileURL"]);
</script>

<style lang="scss" scoped></style>
