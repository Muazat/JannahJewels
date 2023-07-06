<template>
  <div>
    <div class="backdrop" ref="backDrop" @click="backdropClickHandler"></div>
    <header class="main-header">
      <button id="side-menu-toggle" @click="menuToggleClickHandler">
        <svg
          class="h-6 w-6"
          aria-hidden="true"
          fill="white"
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
      <p class="text-lg font-bold text-white md:hidden">Student PA</p>
      <nav class="main-header__nav">
        <ul class="main-header__item-list">
          <li class="main-header__item">
            <NuxtLink class="active muaxxa" to="/">Student PA</NuxtLink>
          </li>
        </ul>
        <ul class="main-header__item-list">
          <li class="main-header__item">
            <NuxtLink class="" to="/login">Log In</NuxtLink>
          </li>
          <li class="main-header__item">
            <NuxtLink class="" to="/signup">Sign Up</NuxtLink>
          </li>
          <!-- <li class="main-header__item">
            <NuxtLink class="" to="/admin-login">Instructor</NuxtLink>
          </li> -->
        </ul>
      </nav>
    </header>

    <nav ref="sideDrawer" class="mobile-nav">
      <ul class="mobile-nav__item-list">
        <li class="mobile-nav__item">
          <NuxtLink class="" to="/login" @click="backdropClickHandler"
            >Log In</NuxtLink
          >
        </li>
        <li class="mobile-nav__item">
          <NuxtLink class="" to="/signup" @click="backdropClickHandler"
            >Sign Up</NuxtLink
          >
        </li>
        <!-- <li class="mobile-nav__item">
          <NuxtLink class="" to="/admin-login" @click="backdropClickHandler"
            >Instructor</NuxtLink
          >
        </li> -->
      </ul>
    </nav>
    <slot />
    <Modal v-if="useAppLoader">
      <div class="flex items-center justify-center gap-3">
        <Icon name="line-md:loading-loop" class="h-8 w-8" />
        <span>{{ useAppLoaderText }}</span>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
const backDrop = ref<HTMLDivElement>(null);
const sideDrawer = ref<HTMLDivElement>(null);

function backdropClickHandler() {
  backDrop.value.style.display = "none";
  sideDrawer.value.classList.remove("open");
}

function menuToggleClickHandler() {
  backDrop.value.style.display = "block";
  sideDrawer.value.classList.add("open");
}
</script>

<style scoped></style>
