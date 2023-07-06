<template>
  <div>
    <form class="md:ml-9" @submit.prevent="handleSubmit">
      <div class="mb-2 mt-4 font-semibold">Title</div>
      <TextInput v-model="taskData.description"></TextInput>
      <div class="mb-2 mt-4 font-semibold">Status</div>
      <Mselect v-model="taskData.status" :options="statusOptions"></Mselect>
      <div class="mb-2 mt-4 font-semibold">Priority</div>
      <Mselect v-model="taskData.priority" :options="priorityOptions" />
      <div class="mb-2 mt-4 font-semibold">Date</div>
      <DateInput v-model="taskData.due_date"></DateInput>
      <div class="mb-2 mt-4 font-semibold">Time</div>

      <TimeInput v-model="taskData.time"></TimeInput>
      <div class="w-4/5 md:w-2/3">
        <AddButton
          class="float-right mb-10 bg-green-500 p-2 font-semibold text-white"
        >
          CREATE TASK
        </AddButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "~~/store";

const statusOptions = ["Started", "Doing", "Done"];
const priorityOptions = ["High", "Medium", "Low"];
const store = useMainStore();

const file = ref(null as FileList | null);
const taskData = reactive({
  description: store.getLoadedTask?.description || "",
  status: store.getLoadedTask?.status || "",
  priority: store.getLoadedTask?.priority || "",
  due_date: store.getLoadedTask?.due_date || "",
  time: store.getLoadedTask?.time || "",
});

const { isEdit } = definePropsRefs({
  isEdit: Boolean,
});

const handleSubmit = () => {
  if (isEdit.value) {
    editTask();
  } else {
    addTask();
  }
};

async function addTask() {
  try {
    useSetAppLoader(true, "Adding Task");
    const { data: savedData, error } = await useSupabaseClient<Database>()
      .from("Tasks")
      .insert({
        ...taskData,
        due_date: new Date(taskData.due_date),
      })
      .select("*");
    if (error) {
      useSetAppAlert(true, error.message, "error");
    }
    if (savedData) {
      Object.keys(taskData).forEach((key) => {
        taskData[key as keyof typeof taskData] = "";
      });
      file.value = null;
      useSetAppLoader(false);
      useSetAppAlert(true, "Task Added");
      useRouter().push("/todo");
    }
  } catch (error) {}
}
async function editTask() {
  try {
    useSetAppLoader(true, "Updating Task");
    const { data: savedData, error } = await useSupabaseClient<Database>()
      .from("Tasks")
      .update({
        ...taskData,
        due_date: new Date(taskData.due_date),
      })
      .eq("id", store.getLoadedTask?.id)
      .select("*");
    if (error) {
      console.log(error);
    }
    if (savedData) {
      Object.keys(taskData).forEach((key) => {
        taskData[key as keyof typeof taskData] = "";
      });
      useSetAppLoader(false);
      useSetAppAlert(true, "Task Updated");
      useRouter().push("/todo");
    }
  } catch (error) {}
}
</script>

<style lang="scss" scoped></style>
