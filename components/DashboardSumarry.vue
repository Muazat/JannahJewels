<template>
  <div class="mt-9 md:mt-6 md:flex">
    <div
      class="m-3 md:mx-6 md:grow"
      v-for="summary in summaries"
      :key="summary.title"
    >
      <NuxtLink
        :to="summary.link"
        class="block rounded-lg border border-gray-200 bg-tertiary p-2 px-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 md:p-4"
      >
        <h1 class="text-sm md:text-lg md:font-bold">{{ summary.title }}</h1>
        <h5
          class="text-center font-bold text-gray-900 dark:text-white md:mt-2 md:text-2xl"
        >
          {{ summary.value || 0 }}
        </h5>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { noteCount, AssignmentCount, todoCount, classCount } = definePropsRefs<{
  noteCount: number | null;
  AssignmentCount: number | null;
  todoCount: number | null;
  classCount: number | null;
}>();
const summaries = ref([
  { title: "Total notes", value: noteCount, link: "notes" },
  { title: "Assignment", value: AssignmentCount, link: "assignments" },
  { title: "Task todo", value: todoCount, link: "todo" },
]);

const isLecturer = computed(() => {
  return useSupabaseUser().value?.user_metadata?.isInstructor;
});

//if user is lecturer, replace assignment with class
if (isLecturer.value) {
  summaries.value.splice(1, 1, {
    title: "Total classes",
    value: classCount,
    link: "classes",
  });
}
</script>

<style lang="scss" scoped></style>
