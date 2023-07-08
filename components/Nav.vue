<template>
  <div class="md:hidden m-0">
    <div class="bg-[#6efafb] relative flex h-16 items-center justify-between">
      <div class="absolute inset-y-0 left-0 flex items-center"><!-- Mobile menu button--><button type="button"
          class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-controls="mobile-menu" aria-expanded="false"><span class="sr-only">Open main menu</span><svg
            class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
          </svg><svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg></button></div>
      <div class="flex flex-1 items-center justify-center items-stretch justify-start">
        <div class="flex flex-shrink-0 items-center"><img class="block h-8 w-auto lg:hidden"
            src="/_nuxt/assets/img/plain-logo.png" alt="Your Company"></div>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"><button
          type="button" class="rounded-full text-gray-400 hover:text-white"><span class="sr-only">View
            notifications</span><svg width="46" height="36" viewBox="0 0 36 36" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 0C7.16129 0 0 7.16129 0 16C0 24.8387 7.16129 32 16 32C24.8387 32 32 24.8387 32 16C32 7.16129 24.8387 0 16 0ZM16 6.19355C17.1229 6.19355 18.2206 6.52652 19.1542 7.15037C20.0879 7.77421 20.8155 8.6609 21.2453 9.69831C21.675 10.7357 21.7874 11.8773 21.5683 12.9786C21.3493 14.0799 20.8085 15.0915 20.0145 15.8855C19.2205 16.6795 18.2089 17.2202 17.1076 17.4393C16.0063 17.6584 14.8648 17.5459 13.8273 17.1162C12.7899 16.6865 11.9032 15.9588 11.2794 15.0252C10.6556 14.0915 10.3226 12.9939 10.3226 11.871C10.3226 10.3652 10.9207 8.92115 11.9855 7.85643C13.0502 6.7917 14.4943 6.19355 16 6.19355ZM16 28.3871C14.1992 28.3864 12.4202 27.9922 10.7877 27.2322C9.15507 26.4722 7.70824 25.3647 6.54839 23.9871C7.76129 21.7032 10.1355 20.129 12.9032 20.129C13.0586 20.1303 13.2129 20.1542 13.3613 20.2C15.0704 20.7935 16.9296 20.7935 18.6387 20.2C18.7871 20.1542 18.9414 20.1303 19.0968 20.129C21.8645 20.129 24.2387 21.7032 25.4516 23.9871C24.2918 25.3647 22.8449 26.4722 21.2123 27.2322C19.5798 27.9922 17.8008 28.3864 16 28.3871Z"
              fill="#968e85"></path>
            <path
              d="M16.0001 17.5485C17.123 17.5485 18.2207 17.2156 19.1543 16.5917C20.088 15.9679 20.8157 15.0812 21.2454 14.0438C21.6751 13.0063 21.7875 11.8648 21.5685 10.7635C21.3494 9.66219 20.8087 8.65057 20.0147 7.85656C19.2207 7.06256 18.209 6.52184 17.1077 6.30278C16.0064 6.08371 14.8649 6.19615 13.8275 6.62586C12.7901 7.05557 11.9034 7.78325 11.2795 8.7169C10.6557 9.65055 10.3227 10.7482 10.3227 11.8711C10.3227 13.3769 10.9209 14.8209 11.9856 15.8857C13.0503 16.9504 14.4944 17.5485 16.0001 17.5485ZM19.0969 20.1292C18.9416 20.1304 18.7873 20.1543 18.6388 20.2001C16.9298 20.7937 15.0705 20.7937 13.3614 20.2001C13.213 20.1543 13.0587 20.1304 12.9033 20.1292C10.1356 20.1292 7.76141 21.7034 6.54851 23.9872C10.9401 29.2072 18.7317 29.8789 23.9517 25.4872C24.4937 25.031 24.9955 24.5292 25.4517 23.9872C24.2388 21.7034 21.8646 20.1292 19.0969 20.1292Z"
              fill="white"></path>
          </svg></button><!-- Profile dropdown -->
        <div class="relative ml-3"></div>
      </div>
    </div>
  </div>
</template>

<script></script>
