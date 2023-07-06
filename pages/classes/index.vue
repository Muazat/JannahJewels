<template>
  <div>
    <PageTitle>Classes</PageTitle>
    <AddButton class="md:float-right">
      <NuxtLink to="add-class">+ADD CLASS</NuxtLink>
    </AddButton>

    <div class="mt-4 md:mt-16 md:flex">
      <Table class="md:basis-4/5">
        <TableHead>
          <TableData class="font-bold">Course Code</TableData>
          <TableData class="font-bold">Course Title</TableData>
          <TableData class="font-bold">Course Shared Code</TableData>
          <TableData class="font-bold">Action</TableData>
        </TableHead>
        <tr v-for="individualClass in classes" class="border">
          <TableData class="whitespace-nowrap">{{
            individualClass.course_code
          }}</TableData>
          <TableData>{{ individualClass.course_name }}</TableData>
          <TableData
            class="cursor-pointer whitespace-nowrap hover:opacity-75"
            @click="useCopyToClipboard(individualClass.shared_code)"
          >
            <Icon
              name="ic:round-file-copy"
              class="mr-1 h-6 w-6 cursor-pointer text-primary"
            />
            {{ individualClass.shared_code }}
          </TableData>
          <TableData>
            <NuxtLink
              :to="`/class/${individualClass.shared_code}`"
              class="whitespace-nowrap font-semibold text-primary"
            >
              View
              <Icon name="ic:baseline-arrow-forward" class="ml-1 h-6 w-6" />
            </NuxtLink>
          </TableData>
        </tr>
        <TableEnd>
          <Pagination></Pagination>
        </TableEnd>
      </Table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Database } from "~~/types/supabase";
dayjs.extend(relativeTime);

definePageMeta({
  middleware: ["admin"],
});

const supabaseClient = useSupabaseClient<Database>();

const { data: classes } = useAsyncData(
  "classes",
  async () => {
    useSetAppLoader(true);
    const { data } = await supabaseClient
      .from("Lecturer's classes")
      .select("*")
      .order("created_at", { ascending: false })
      .eq("user_id", useSupabaseUser()?.value.id);
    useSetAppLoader(false);
    return data;
  },
  { server: false }
);

const deleteNote = async (id: number) => {
  const { data, error } = await supabaseClient
    .from("Lecturer's classes")
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
