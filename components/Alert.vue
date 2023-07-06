<template>
  <transition name="fade">
    <div v-if="showAlert" class="flex w-full items-center justify-center">
      <div
        id="alert-1"
        class="fixed top-11 mb-4 flex items-center justify-center rounded-lg bg-blue-50 p-4 dark:bg-gray-800"
        role="alert"
        :class="{
          'text-green-800  dark:text-green-400': type === 'success',
          'text-red-800  dark:text-red-400': type === 'error',
        }"
      >
        <Icon name="material-symbols:info" />
        <div class="mx-3 text-sm font-medium">
          <slot />
        </div>
        <button
          type="button"
          class="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 p-1.5 hover:bg-blue-200 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
          :class="{
            'text-green-800  dark:text-green-400': type === 'success',
            'text-red-800  dark:text-red-400': type === 'error',
          }"
          data-dismiss-target="#alert-1"
          aria-label="Close"
          @click="showAlert = false"
        >
          <Icon name="material-symbols:close-rounded" class="h-6 w-6" />
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
// const { modelValue, timeout } = definePropsRefs({
//   modelValue: Boolean,
//   timeout: Number,
// });

const type = defineProp<String>("type", { default: "success" });
const timeout = defineProp<Number>("timeout", { default: 5000 });
const modelValue = defineProp<Boolean>("modelValue", { default: false });

let showAlert = ref(modelValue.value);
const emit = defineEmits(["update:modelValue"]);

watch(modelValue, (val) => {
  showAlert.value = val;
  setTimeout(() => {
    showAlert.value = false;
    emit("update:modelValue", false);
  }, timeout.value);
});
</script>

<style scoped></style>
