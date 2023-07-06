<template>
  <button
    class="mr-6 mt-9 rounded border p-1 text-sm hover:bg-tertiary hover:text-primary md:mr-0 md:mt-3 md:basis-4/5"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
