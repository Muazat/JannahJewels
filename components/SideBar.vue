<template>
  <div>
    <div class="backdrop" ref="backDrop" @click="backdropClickHandler"></div>
    <header class="">
      <button class="ml-1 mt-2 rounded border border-[tertiary] p-1 font-bold" @click="menuToggleClickHandler">
        <svg class="h-8 w-8" aria-hidden="true" fill="blue" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
    </header>

    <nav ref="sideDrawer" class="mobile-nav">
      <ul class="m-8 flex flex-col gap-10">
        <li v-for="link in appSections" :key="link.slug">
          <nuxt-link @click="backdropClickHandler" :to="`/${link.slug}`"
            class="flex items-center rounded-lg text-xl text-[#657BCA] hover:text-primary">
            <Icon :name="link.icon" />
            <span class="ml-4">{{ link.name }}</span>
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <slot />
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

const studentsAppSection = [
  {
    slug: "dashboard",
    name: "Dashboard",
    icon: "fluent:calendar-data-bar-20-regular",
  },
  { slug: "notes", name: "Notes", icon: "fluent:notepad-20-regular" },
  {
    slug: "assignments",
    name: "Assignments",
    icon: "fluent:book-letter-20-regular",
  },
  {
    slug: "class",
    name: "Resources",
    icon: "fluent:folder-20-regular",
  },
  {
    slug: "todo",
    name: "Todo",
    icon: "fluent:task-list-square-ltr-20-regular",
  },
  {
    slug: "priorities",
    name: "Priorities",
    icon: "fluent:calendar-20-regular",
  },
  {
    slug: "credentials",
    name: "Credentials",
    icon: "fluent:credit-card-clock-20-regular",
  },
  {
    slug: "utilities",
    name: "Utilities",
    icon: "fluent:calculator-multiple-20-regular",
  },
];
const lecturerAppSection = studentsAppSection
  .filter((section) => section.slug !== "credentials")
  .map((section) => {
    if (section.slug === "assignments") {
      return {
        slug: "classes",
        name: "Classes",
        icon: "fluent:people-20-regular",
      };
    }
    if (section.slug === "credentials") {
      return;
    }
    return section;
  });

const appSections = computed(() => {
  const user = useSupabaseUser();
  if (user.value?.user_metadata?.isInstructor) {
    return lecturerAppSection;
  }
  return studentsAppSection;
});
</script>

<style scoped></style>
