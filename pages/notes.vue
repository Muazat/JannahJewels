<template>
  <div>
    <PageTitle>Notes</PageTitle>
    <AddButton class="md:float-right">
      <NuxtLink to="add-note">+ADD NOTE</NuxtLink>
    </AddButton>

    <div class="mt-4 md:mt-16 md:flex">
      <Table class="md:ml-16 md:basis-4/5">
        <TableHead>
          <TableData class="font-bold"></TableData>
          <TableData class="font-bold">Category</TableData>
          <TableData class="font-bold">Title</TableData>
          <TableData class="font-bold">Created on</TableData>
          <TableData class="font-bold">Action</TableData>
        </TableHead>
        <tr v-for="note in notes" class="border">
          <TableData>
            <div class="inline-flex items-center">
              <div
                class="mr-6 font-bold text-blue-500 hover:text-blue-300"
                :class="[
                  note.has_attachment && note.file_ext
                    ? 'cursor-pointer text-blue-500 hover:text-blue-300'
                    : 'cursor-not-allowed text-gray-300',
                ]"
              >
                <button
                  @click="useDownloadFile(note, 'notes')"
                  title="Download File"
                  :disabled="!note.has_attachment && !note.file_ext"
                  :class="[
                    note.has_attachment && note.file_ext
                      ? 'cursor-pointer text-blue-500 hover:text-blue-300'
                      : '!pointer-events-none text-gray-300',
                  ]"
                >
                  <Icon name="mdi:file-download" class="h-6 w-6" />
                </button>
              </div>
            </div>
          </TableData>
          <TableData>{{ note.category }}</TableData>
          <TableData>{{ note.title }}</TableData>
          <TableData>{{ dayjs(note.created_at).fromNow() }}</TableData>
          <TableData>
            <div class="inline-flex gap-6">
              <button @click="view(note)">
                <Icon
                  name="mdi:eye-arrow-right"
                  class="h-6 w-6 cursor-pointer text-blue-500 hover:text-blue-300"
                />
              </button>
              <button @click="edit(note)">
                <Icon
                  name="material-symbols:edit-document"
                  class="h-6 w-6 cursor-pointer text-blue-500 hover:text-blue-300"
                />
              </button>
              <Icon
                name="ic:baseline-delete"
                @click="
                  documentId = note.id;
                  showConfirmModal = true;
                "
                class="h-6 w-6 cursor-pointer text-red-500 hover:text-red-300"
              />
            </div>
          </TableData>
        </tr>
        <TableEnd>
          <!-- <button @click="refreshPage()">Refresh Page</button> -->
          <Pagination></Pagination>
        </TableEnd>
      </Table>
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
            <p class="p-0">Are you sure you want to delete this note?</p>
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
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMainStore } from "~~/store";
import { Database } from "~~/types/supabase";
dayjs.extend(relativeTime);

const supabaseClient = useSupabaseClient<Database>();

const { data: notes, refresh } = useAsyncData(
  "notes",
  async () => {
    useSetAppLoader(true, "Loading notes...");
    const { data } = await supabaseClient
      .from("Notes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);
    useSetAppLoader(false, "Loading notes...");
    return data;
  },
  { server: false }
);
const showConfirmModal = ref(false);
const documentId = ref<Number | null>(null);
const deleteNote = async () => {
  showConfirmModal.value = false;
  useSetAppLoader(true, "Deleting note...");
  const { error, status } = await supabaseClient
    .from("Notes")
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
const view = (note) => {
  store.setLoadedNote(note);
  useRouter().push("/view-note");
};
const edit = (note) => {
  store.setLoadedNote(note);
  useRouter().push("/edit-note");
};
</script>

<style lang="scss" scoped></style>
