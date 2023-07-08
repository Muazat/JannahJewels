<template>
  <div>
    <button class="my_button" v-bind="$attrs">
      <slot></slot>
      <!-- This slot will make it possible to pass anything inside the component, you can even use default inside the slot if nothing is passed -->
    </button>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.my_button {
  @apply block text-[#ffdb58] py-2 px-8 transition my-6 rounded;
}

.my_button:hover {
  @apply bg-[#ffdb58]  text-secondary;
}

.my_button:active {
  @apply text-[#ffdb58];
}
</style>
