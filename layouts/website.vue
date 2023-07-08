<template>
  <Announcement></Announcement>
  <div>
    <div class="backdrop" ref="backDrop" @click="backdropClickHandler"></div>


    <!-- <div class="flex items-center justify-center gap-16 bg-black md:hidden">
      <button id="side-menu-toggle" @click="menuToggleClickHandler">
        <svg class="h-6 w-6" aria-hidden="true" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
      <div class="">
        <img class="h-18 w-32 rounded-full" src="../assets/img/named-logo.png" alt="">
      </div>
      <div>
        <Profile class=""></Profile>
      </div>
    </div> -->
    <Nav></Nav>
    <MobileNav></MobileNav>
    <header class="main-header">
      <nav class="main-header__nav">
        <ul class="main-header__item-list text-xl">
          <li class="main-header__item">
            <img class="h-32 w-44 rounded-full" src="../assets/img/named-logo.png" alt="">
          </li>
        </ul>
        <ul class="main-header__item-list text-lg">
          <li class="main-header__item">
            <NuxtLink class="active " to="/">About Us</NuxtLink>
          </li>
          <li class="main-header__item">
            <NuxtLink class="active" to="/">Programs</NuxtLink>
          </li>
          <li class="main-header__item">
            <NuxtLink class="active" to="/">Membership</NuxtLink>
          </li>
          <li class="main-header__item">
            <NuxtLink class="active" to="/">Gallery</NuxtLink>
          </li>
          <li class="main-header__item">
            <NuxtLink class="active" to="/">News</NuxtLink>
          </li>
        </ul>
        <ul class="main-header__item-list">
          <li class="main-header__item">
            <!-- <NuxtLink class="" to="/login">Log In</NuxtLink> -->
            <Mbutton class="rounded bg-[#1f3481]">DONATE</Mbutton>
          </li>
          <li class="main-header__item">
            <Profile></Profile>
          </li>
        </ul>
      </nav>
    </header>

    <!-- <MobileNav></MobileNav> -->

    <nav ref="sideDrawer" class="mobile-nav">
      <ul class="mobile-nav__item-list">
        <li class="mobile-nav__item">
          <NuxtLink class="" to="/login" @click="backdropClickHandler">Log In</NuxtLink>
        </li>
        <li class="mobile-nav__item">
          <NuxtLink class="" to="/signup" @click="backdropClickHandler">Sign Up</NuxtLink>
        </li>
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
