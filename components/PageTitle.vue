<template>
  <div
    class="ml-2 mt-16 flex items-center gap-4 text-2xl font-semibold text-black md:ml-8 md:mt-8"
  >
    <button class="inline-flex items-center" @click="useRouter().go(-1)">
      <Icon name="material-symbols:arrow-back" class="h-6 w-8" />
    </button>
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
