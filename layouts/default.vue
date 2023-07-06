<template>
  <div>
    <div class="md:flex">
      <side-bar></side-bar>
      <div class="container w-full">
        <drop-down></drop-down>
        <slot />
      </div>
    </div>
    <Modal v-if="useAppLoader">
      <div class="flex items-center justify-center gap-3">
        <Icon name="line-md:loading-loop" class="h-8 w-8" />
        <span>{{ useAppLoaderText }}</span>
      </div>
    </Modal>

    <Alert v-model="showAlert" :type="useAppAlertType">
      {{ useAppAlertText }}
    </Alert>
  </div>
</template>

<script setup>
const showAlert = ref(false);
watch(useAppAlert, () => {
  showAlert.value = useAppAlert.value;
  setTimeout(() => {
    useSetAppAlert(false);
  }, 5000);
});
</script>

<style scoped></style>
