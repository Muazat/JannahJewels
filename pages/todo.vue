<template>
  <div>
    <PageTitle>Tasks</PageTitle>
    <AddButton class="md:float-right"
      ><NuxtLink to="add-task">+Add Task</NuxtLink></AddButton
    >

    <div class="mt-4 md:mt-16 md:flex">
      <Table class="md:ml-16 md:basis-4/5">
        <TableHead>
          <TableData class="font-bold">Date</TableData>
          <TableData class="font-bold">Time</TableData>
          <TableData class="font-bold"> Description</TableData>
          <TableData class="font-bold"> Action</TableData>
        </TableHead>
        <tr v-for="task in tasks" :key="task.id" class="border">
          <TableData>{{ dayjs(task.due_date).format("DD/MM/YY") }}</TableData>
          <TableData>
            {{ JSON.parse(task.time).hours }} :
            {{ JSON.parse(task.time).minutes }}
          </TableData>
          <TableData>{{ task.description }}</TableData>

          <TableData>
            <div class="inline-flex gap-6">
              <button @click="">
                <Icon
                  name="mdi:eye-arrow-right"
                  class="h-6 w-6 cursor-pointer text-blue-500 hover:text-blue-300"
                />
              </button>
              <button @click="">
                <Icon
                  name="material-symbols:edit-document"
                  class="h-6 w-6 cursor-pointer text-blue-500 hover:text-blue-300"
                />
              </button>
              <Icon
                name="ic:baseline-delete"
                @click="
                  documentId = task.id;
                  showConfirmModal = true;
                "
                class="h-6 w-6 cursor-pointer text-red-500 hover:text-red-300"
              />
            </div>
          </TableData>
        </tr>

        <TableEnd><Pagination></Pagination></TableEnd>
      </Table>
    </div>
    <Modal
      v-if="showConfirmModal"
      @close="
        showConfirmModal = false;
        documentId = null;
      "
    >
      <template #header>
        <h3 class="text-2xl font-semibold">Confirm Deletion</h3>
      </template>
      <template #default>
        <div class="">
          <p class="p-0">Are you sure you want to delete this assignment?</p>
        </div>
      </template>
      <template #footer>
        <div class="flex items-center justify-end gap-4 px-4 py-3">
          <Button
            class="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            @click="
              showConfirmModal = false;
              documentId = null;
            "
          >
            Cancel
          </Button>
          <Button
            class="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            @click="deleteNote"
          >
            Confirm
          </Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "~~/store";
import { Database } from "~~/types/supabase";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

const supabaseClient = useSupabaseClient<Database>();

const { data: tasks, refresh } = useAsyncData(
  "tasks",
  async () => {
    useSetAppLoader(true, "Loading tasks...");
    const { data } = await supabaseClient
      .from("Tasks")
      .select("*")
      .order("created_at", { ascending: false });
    useSetAppLoader(false, "Loading tasks...");
    return data;
  },
  { server: false }
);

const showConfirmModal = ref(false);
const documentId = ref<Number | null>(null);
const deleteNote = async () => {
  showConfirmModal.value = false;
  useSetAppLoader(true, "Deleting task...");
  const { error, status } = await supabaseClient
    .from("Tasks")
    .delete()
    .match({ id: documentId.value });
  useSetAppLoader(false);
  if (error) {
    useSetAppAlert(true, error.message, "error");
  }
  if (status === 204) {
    await refresh();
    documentId.value = null;
  }
};

const store = useMainStore();
const view = (task) => {
  store.setLoadedTask(task);
  useRouter().push("/view-task");
};
const edit = (task) => {
  store.setLoadedTask(task);
  useRouter().push("/edit-task");
};
</script>

<style lang="scss" scoped></style>
