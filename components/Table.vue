<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full py-4 sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full text-center">
            <slot></slot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
