<template>
  <div class="md:ml-9" ref="body">
    <div class="mb-2 mt-10 font-semibold">Note Category</div>
    <Mselect
      v-model="noteData.category"
      :options="['Personal', 'School', 'Others']"
    ></Mselect>
    <div class="mb-2 mt-4 font-semibold">Title</div>
    <TextInput v-model="noteData.title"></TextInput>

    <div class="mb-2 mt-4 font-semibold">Content</div>
    <NoteField v-model="noteData.description"></NoteField>
    <div class="mb-2 mt-4 font-semibold">Attachments</div>
    <div class="mb-0 w-4/5 md:w-2/3">
      <FileInput v-model="file"></FileInput>
    </div>
  </div>
  <div class="w-4/5 md:w-2/3">
    <AddButton
      class="float-right mb-10 bg-green-500 p-2 font-semibold text-white"
      @click="submitHandler"
    >
      {{ isEdit ? "EDIT NOTE" : "ADD NOTE" }}
    </AddButton>
    <!-- work on this code to add categories to options easily -->
    <!-- <div class="hidden opacity-100 " ref="category">
        <CreateCategory></CreateCategory>
    </div> -->
    <!-- <a class="text-primary md:float-right md:w-1/2" @click="categoryClickHandler">Create New Category</a> -->
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "~~/store";

const store = useMainStore();
const file = ref(null as FileList | null);
const noteData = reactive({
  title: store.getLoadedNote?.title || "",
  description: store.getLoadedNote?.description || "",
  category: store.getLoadedNote?.category || "",
});

const { isEdit } = definePropsRefs({
  isEdit: Boolean,
});

const submitHandler = () => {
  if (isEdit.value) {
    editNotes();
  } else {
    addNotes();
  }
};

async function addNotes() {
  try {
    useSetAppLoader(true, "Adding Notes...");
    const file_ext = file.value
      ? file.value[0].name.split(".").at(-1)?.trim()
      : null;

    const { data: savedData, error } = await useSupabaseClient<Database>()
      .from("Notes")
      .insert({
        ...noteData,
        has_attachment: file.value ? true : false,
        file_ext,
      })
      .select("*");
    if (error) {
      console.log(error);
    }
    if (savedData) {
      if (file.value) {
        const { data, error } = await useSupabaseClient()
          .storage.from("files")
          .upload(
            `${useSupabaseUser().value?.id}/notes/${
              savedData[0].id
            }.${file.value[0].name.split(".").at(-1)?.trim()}`,
            file.value[0]
          );
        if (error) {
          console.log(error);
        }
        if (data) {
          // clear form iteratively
          Object.keys(noteData).forEach((key) => {
            noteData[key as keyof typeof noteData] = "";
          });
          file.value = null;
          useSetAppLoader(false);
          useSetAppAlert(true, "Notes Added");
          navigateTo("/notes");
        }
      } else {
        Object.keys(noteData).forEach((key) => {
          noteData[key as keyof typeof noteData] = "";
        });
        file.value = null;
        useSetAppLoader(false);
        useSetAppAlert(true, "Notes Added");
        navigateTo("/notes");
      }
    }
  } catch (error) {}
}
async function editNotes() {
  try {
    useSetAppLoader(true, "Updating Notes");
    const file_ext = file.value
      ? file.value[0].name.split(".").at(-1)?.trim()
      : null;

    const { data: savedData, error } = await useSupabaseClient<Database>()
      .from("Notes")
      .update({
        ...noteData,
        has_attachment: useMainStore().getLoadedNote?.has_attachment
          ? true
          : file.value
          ? true
          : false,
        file_ext: file_ext
          ? file_ext
          : useMainStore().getLoadedNote?.file_ext
          ? useMainStore().getLoadedNote?.file_ext
          : null,
      })
      .eq("id", store.getLoadedNote?.id)
      .select("*");
    if (error) {
      console.log(error);
    }
    if (savedData) {
      if (file.value) {
        const { data, error } = await useSupabaseClient()
          .storage.from("files")
          .update(
            `${useSupabaseUser().value?.id}/notes/${
              savedData[0].id
            }.${file.value[0].name.split(".").at(-1)?.trim()}`,
            file.value[0]
          );
        if (error) {
          console.log(error);
        }
        if (data) {
          // clear form iteratively
          Object.keys(noteData).forEach((key) => {
            noteData[key as keyof typeof noteData] = "";
          });
          file.value = null;
          useSetAppAlert(true, "Notes Updated");
          useSetAppLoader(false);
          useRouter().push("/notes");
        }
      } else {
        Object.keys(noteData).forEach((key) => {
          noteData[key as keyof typeof noteData] = "";
        });
        useSetAppLoader(false);
        useSetAppAlert(true, "Notes Updated");
        useRouter().push("/notes");
      }
    }
  } catch (error) {}
}
</script>

<style lang="scss" scoped></style>
