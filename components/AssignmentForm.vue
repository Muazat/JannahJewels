<template>
  <div>
    <Alert v-model="showAlert">Hi alert </Alert>
    <form @submit.prevent="handleSubmit" class="ml-9" ref="body">
      <div>
        <div class="mb-2 mt-4 font-semibold">Assignment Category</div>
        <Mselect v-model="taskData.category" :options="categoryOptions" />
        <div class="mb-2 mt-4 font-semibold">Title</div>

        <TextInput v-model="taskData.title" required></TextInput>
        <div class="mb-2 mt-4 font-semibold">Content</div>
        <NoteField v-model="taskData.content"></NoteField>
        <div class="mb-2 mt-4 font-semibold">Status</div>
        <Mselect v-model="taskData.status" :options="statusOptions"></Mselect>
        <div class="mb-2 mt-4 font-semibold">Priority</div>
        <Mselect v-model="taskData.priority" :options="priorityOptions" />
        <div class="mb-2 mt-4 font-semibold">Due Date</div>
        <DateInput v-model="taskData.due_date"></DateInput>
        <div class="mb-2 mt-4 font-semibold">Attachments</div>
        <div class="mb-0 w-4/5 md:w-2/3">
          <FileInput v-model="file"></FileInput>
        </div>
      </div>
      <div class="w-4/5 md:w-2/3">
        <AddButton
          class="float-right mb-10 bg-green-500 p-2 font-semibold text-white"
        >
          ADD ASSIGNMENT
        </AddButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "~~/store";

const categoryOptions = ["Individual", "Group", "Research", "Personal"];
const statusOptions = ["Started", "Doing", "Done"];
const priorityOptions = ["High", "Medium", "Low"];
const store = useMainStore();

const showAlert = ref(false);

const file = ref(null as FileList | null);
const taskData = reactive({
  title: store.getLoadedAssignment?.title || "",
  content: store.getLoadedAssignment?.content || "",
  status: store.getLoadedAssignment?.status || "",
  priority: store.getLoadedAssignment?.priority || "",
  due_date: store.getLoadedAssignment?.due_date || "",
  category: store.getLoadedAssignment?.category || "",
});

const { isEdit } = definePropsRefs({
  isEdit: Boolean,
});

const handleSubmit = () => {
  if (isEdit.value) {
    editAssignment();
  } else {
    addAssignment();
  }
};

async function addAssignment() {
  try {
    useSetAppLoader(true, "Adding Assignment");
    const file_ext = file.value
      ? file.value[0].name.split(".").at(-1)?.trim()
      : null;

    const { data: savedData, error } = await useSupabaseClient<Database>()
      .from("Assignments")
      .insert({
        ...taskData,
        has_attachement: file.value ? true : false,
        due_date: new Date(taskData.due_date),
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
            `${useSupabaseUser().value?.id}/assignment/${
              savedData[0].id
            }.${file.value[0].name.split(".").at(-1)?.trim()}`,
            file.value[0]
          );
        if (error) {
          console.log(error);
        }
        if (data) {
          // clear form iteratively
          Object.keys(taskData).forEach((key) => {
            taskData[key as keyof typeof taskData] = "";
          });
          file.value = null;
          useSetAppLoader(false);
          useSetAppAlert(true, "Assignment Added");
          navigateTo("/assignments");
        }
      } else {
        Object.keys(taskData).forEach((key) => {
          taskData[key as keyof typeof taskData] = "";
        });
        file.value = null;
        useSetAppLoader(false);
        useSetAppAlert(true, "Assignment Added");
        navigateTo("/assignments");
      }
    }
  } catch (error) {}
}
async function editAssignment() {
  try {
    useSetAppLoader(true, "Updating Assignment");
    const file_ext = file.value
      ? file.value[0].name.split(".").at(-1)?.trim()
      : null;

    const { data: savedData, error } = await useSupabaseClient<Database>()
      .from("Assignments")
      .update({
        ...taskData,
        has_attachement: useMainStore().getLoadedAssignment?.has_attachement
          ? true
          : file.value
          ? true
          : false,
        due_date: new Date(taskData.due_date),
        file_ext: file_ext
          ? file_ext
          : useMainStore().getLoadedAssignment?.file_ext,
      })
      .eq("id", store.getLoadedAssignment?.id)
      .select("*");
    if (error) {
      console.log(error);
    }
    if (savedData) {
      if (file.value) {
        const { data, error } = await useSupabaseClient()
          .storage.from("files")
          .update(
            `${useSupabaseUser().value?.id}/assignment/${
              savedData[0].id
            }.${file.value[0].name.split(".").at(-1)?.trim()}`,
            file.value[0]
          );
        if (error) {
          console.log(error);
        }
        if (data) {
          // clear form iteratively
          Object.keys(taskData).forEach((key) => {
            taskData[key as keyof typeof taskData] = "";
          });
          file.value = null;
          useSetAppAlert(true, "Assignment Updated");
          useSetAppLoader(false);
          useRouter().push("/assignments");
        }
      } else {
        Object.keys(taskData).forEach((key) => {
          taskData[key as keyof typeof taskData] = "";
        });
        useSetAppLoader(false);
        useSetAppAlert(true, "Assignment Updated");
        useRouter().push("/assignments");
      }
    }
  } catch (error) {}
}
</script>

<style scoped></style>
