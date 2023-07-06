<template>
  <nav class="px-2 dark:bg-blue-900 sm:px-4 md:bg-primary">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <a href="/" class="flex items-center">
        <span
          class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
          >Muaxxa</span
        >
      </a>
      <div class="flex items-center md:order-2">
        <button
          @click="backdropClickHandler"
          data-collapse-toggle="mobile-menu-2"
          type="button"
          class="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-blue-400 dark:hover:bg-blue-700 dark:focus:ring-blue-600 md:hidden"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="h-6 w-6"
            aria-hidden="true"
            fill="blue"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        ref="backDrop"
        class="hidden w-full translate-y-2 items-center justify-between transition-transform md:order-1 md:flex md:w-auto"
        id="mobile-menu-2"
      >
        <ul
          class="mt-4 flex flex-col p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:text-sm md:font-medium md:dark:bg-blue-900"
        >
          <li>
            <a
              href="#"
              class="block bg-tertiary py-2 pl-3 pr-4 text-center dark:text-white md:bg-transparent md:p-0 md:text-black"
              aria-current="page"
              >Home</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block bg-tertiary py-2 pl-3 pr-4 text-center text-black hover:bg-blue-100 dark:hover:bg-blue-700 dark:hover:text-white md:bg-inherit md:p-0 md:text-white md:hover:bg-transparent md:hover:text-black md:dark:hover:bg-transparent md:dark:hover:text-white"
              >Sign in</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block bg-tertiary py-2 pl-3 pr-4 text-center text-black hover:bg-blue-100 dark:border-blue-700 dark:hover:text-white md:bg-inherit md:p-0 md:text-white md:hover:bg-transparent md:hover:text-black md:dark:hover:bg-transparent md:dark:hover:text-white"
              >Sign up</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const backDrop = ref<HTMLDivElement>(null);

function backdropClickHandler() {
  backDrop.value.style.display = "block";
  // sideDrawer.value.classList.remove("open");
}
</script>

<style lang="scss" scoped></style>
