<template>
  <div>
    <PageTitle>Add Course</PageTitle>
    <form @submit.prevent="submitHandler">
      <div class="md:ml-9" ref="body">
        <div class="mb-2 mt-4 font-semibold">Course Code</div>
        <TextInput v-model="courseCode" required></TextInput>
        <div class="mb-2 mt-4 font-semibold">Course Title</div>
        <TextInput v-model="course_name"></TextInput>

        <div class="mb-2 mt-4 font-semibold">Description</div>
        <NoteField v-model="description"></NoteField>
      </div>
      <div class="w-4/5 md:w-2/3">
        <AddButton
          class="float-right mb-10 bg-green-500 p-2 font-semibold uppercase text-white"
        >
          Add Class
        </AddButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Database } from "~~/types/supabase";
const supabaseClient = useSupabaseClient<Database>();

definePageMeta({
  middleware: ["admin"],
});

const course_name = ref("");
const description = ref("");
const courseCode = ref("");

const submitHandler = async () => {
  try {
    useSetAppLoader(true, "Adding class...");
    const { data, error } = await supabaseClient
      .from("Lecturer's classes")
      .insert({
        course_name: `${course_name.value}`,
        description: description.value,
        course_code: courseCode.value.toUpperCase().trim(),
        //remove any white space in courseCode.value and convert to uppercase
        shared_code: `${courseCode.value
          .toUpperCase()
          .trim()
          .replace(/\s/g, "")}-${Date.now().toString().slice(-5)}`,
      });
    useSetAppLoader(false);
    navigateTo("/classes");
    if (error) {
      console.log(error);
    }
  } catch (error) {}
};
</script>

<style lang="scss" scoped></style>
