<template>
  <PageTitle>Credentials</PageTitle>
  <AddButton class="md:float-right"
    ><NuxtLink to="add-credential">+Add Credential</NuxtLink></AddButton
  >

  <div class="mt-4 md:mt-16 md:flex">
    <Table class="md:ml-16 md:basis-4/5">
      <TableHead>
        <TableData class="font-bold"></TableData>
        <TableData class="font-bold">Type</TableData>
        <TableData class="font-bold">Action</TableData>
      </TableHead>
      <tr v-for="credential in credentials" :key="credential.id" class="border">
        <TableData>
          <div class="inline-flex items-center">
            <div
              class="mr-6 font-bold text-blue-500 hover:text-blue-300"
              :class="[
                credential.has_attachment && credential.file_ext
                  ? 'cursor-pointer text-blue-500 hover:text-blue-300'
                  : 'cursor-not-allowed text-gray-300',
              ]"
            >
              <button
                @click="useDownloadFile(credential, 'credentials')"
                title="Download File"
                :disabled="!credential.has_attachment && !credential.file_ext"
                :class="[
                  credential.has_attachment && credential.file_ext
                    ? 'cursor-pointer text-blue-500 hover:text-blue-300'
                    : '!pointer-events-none text-gray-300',
                ]"
              >
                <Icon name="mdi:file-download" class="h-6 w-6" />
              </button>
            </div>
          </div>
        </TableData>
        <TableData>{{ credential.title }}</TableData>
        <TableData>
          <div class="inline-flex gap-6">
            <Icon
              name="material-symbols:edit-document"
              class="h-6 w-6 cursor-pointer text-blue-500 hover:text-blue-300"
            />
            <Icon
              name="ic:baseline-delete"
              @click="deleteNote(credential.id)"
              class="h-6 w-6 cursor-pointer text-red-500 hover:text-red-300"
            />
          </div>
        </TableData>
      </tr>
    </Table>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Database } from "~~/types/supabase";
dayjs.extend(relativeTime);

const supabaseClient = useSupabaseClient<Database>();

const { data: credentials } = useAsyncData("credentials", async () => {
  const { data } = await supabaseClient
    .from("Credentials")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);
  return data;
});

const deleteNote = async (id: number) => {
  const { data, error } = await supabaseClient
    .from("Credentials")
    .delete()
    .match({ id });
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }
};
</script>

<style lang="scss" scoped></style>
