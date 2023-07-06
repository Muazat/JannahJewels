<template>
  <div>
    <Alert v-model="showAlert">Resource has been added successfully</Alert>
    <PageTitle>Add Resources</PageTitle>

    <div class="md:ml-9" ref="body">
      <div class="mb-2 mt-4 font-semibold">Title</div>
      <TextInput v-model="title"></TextInput>

      <div class="mb-2 mt-4 font-semibold">Attachments</div>
      <div class="mb-0 w-4/5 md:w-2/3">
        <FileInput v-model="file"></FileInput>
      </div>

      <div class="mb-2 mt-4 font-semibold">Content</div>
      <NoteField v-model="description"></NoteField>
    </div>
    <div class="w-4/5 md:w-2/3">
      <AddButton
        class="float-right mb-10 bg-green-500 p-2 font-semibold text-white"
        @click="submitHandler"
      >
        ADD NOTE
      </AddButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Database } from "~~/types/supabase";
const supabaseClient = useSupabaseClient<Database>();

definePageMeta({
  middleware: ["admin"],
});

const title = ref("");
const description = ref("");
const file = ref<FileList | null>(null);
const showAlert = ref(false);

const submitHandler = async () => {
  try {
    const file_ext = file.value
      ? file.value[0].name.split(".").at(-1)?.trim()
      : null;
    const { data: savedData, error } = await supabaseClient
      .from("Lecturer's resources")
      .insert({
        title: title.value,
        description: description.value,
        has_attachment: file.value ? true : false,
        access_code: useRoute().params.slug,
        file_ext,
      })
      .select("*");
    if (error) {
      console.log(error);
    }
    if (savedData) {
      if (file.value) {
        const { data, error } = await supabaseClient.storage
          .from("lecturers-record")
          .upload(
            `${useSupabaseUser().value?.id}/resources/${
              savedData[0].id
            }.${file_ext}`,
            file.value[0]
          );
        if (error) {
          console.log(error);
        }
        if (data) {
          console.log(data);
          showAlert.value = true;
        }
      } else {
        showAlert.value = true;
      }
    }
  } catch (error) {}
};
</script>

<style lang="scss" scoped></style>
