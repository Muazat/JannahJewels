<template>
  <PageTitle>New Priority</PageTitle>
  <div class="md:ml-9">
    <div class="mb-2 mt-4 font-semibold">Description</div>
    <!-- <TextInput></TextInput> -->
    <div class="mb-2 mt-4 font-semibold">Status</div>
    <Status></Status>
    <div class="mb-2 mt-4 font-semibold">Priority</div>
    <PrioritySelect></PrioritySelect>
    <div class="mb-2 mt-4 font-semibold">Due Date</div>
    <DateInput></DateInput>
  </div>
  <div class="w-4/5 md:w-2/3">
    <AddButton
      class="float-right mb-10 bg-green-500 p-2 font-semibold text-white"
      >CREATE PRIORITY</AddButton
    >
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
