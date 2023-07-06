<template>
  <div class="absolute left-[25%]" ref="cat">
    <div class="mt-6 max-w-[14rem] rounded-lg bg-tertiary shadow-lg md:mt-3">
      <div class="p-6">
        <h5 class="mb-2 text-xl font-medium text-gray-900">
          Create New Category
        </h5>
        <input
          type="text"
          class="form-control mb-2 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
          id="exampleFormControlInput1"
          placeholder="Type category"
        />
        <button
          type="button"
          class="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
