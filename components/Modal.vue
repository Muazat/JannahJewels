<template>
  <teleport to="body">
    <div
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 z-50 flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-600 bg-opacity-60 md:inset-0 md:h-full"
    >
      <div
        class="relative flex h-screen items-center justify-center overflow-auto p-4"
      >
        <!-- Modal content -->
        <div class="relative rounded-lg bg-white shadow" ref="modalBody">
          <!-- Modal header -->
          <div
            v-if="$slots.header"
            class="mx-4 flex items-center justify-between rounded-t border-b py-3"
          >
            <slot name="header" />
            <button
              type="button"
              class="ml-auto inline-flex items-center rounded-lg p-1.5 text-sm text-gray-400 hover:text-gray-900"
              @click="$emit('close')"
            >
              <Icon name="ei:close" class="!text-subdued !h-7 !w-7" />
            </button>
          </div>
          <!-- Modal body -->
          <div class="space-y-6 p-4">
            <slot />
          </div>
          <!-- Modal footer -->
          <slot name="footer" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
const emit = defineEmits(["outside"]);

const modalBody = ref(null);
onClickOutside(modalBody, () => {
  emit("outside");
});
</script>

<style scoped></style>
