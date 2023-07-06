<template>
  <div>
    <PageTitle>Priorities</PageTitle>
    <div class="mt-4 md:mt-16 md:flex">
      <Table class="md:ml-16 md:basis-4/5">
        <TableHead>
          <TableData class="font-bold">Priority</TableData>
          <TableData class="font-bold"> Description</TableData>
          <TableData class="font-bold">Due Date</TableData>
          <TableData class="font-bold">Status</TableData>
        </TableHead>
        <tbody>
          <tr class="border" v-for="(priority, index) in sortedPriority">
            <TableData>
              <Priority
                :class="
                  priority.priority === 'High'
                    ? 'bg-red-500'
                    : priority.priority === 'Medium'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                "
              ></Priority>
            </TableData>
            <TableData>
              {{ priority.description ?? priority.title }}
            </TableData>
            <TableData>
              {{ dayjs(priority.due_date).format("DD/MM/YY") }}
            </TableData>
            <TableData>{{ priority.status }}</TableData>
          </tr>
        </tbody>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Database } from "~~/types/supabase";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);
const supabaseClient = useSupabaseClient<Database>();

const showAlert = ref(false);

const assignmentCount = ref<number | null>(0);
const todoCount = ref<number | null>(0);
const latestSchedule = ref([]);
const latestAssignment = ref([]);
async function getCounts() {
  const AssignmentCall = supabaseClient
    .from("Assignments")
    .select("*")
    .neq("status", "Done");

  const todoCall = supabaseClient
    .from("Tasks")
    .select("*")
    .neq("status", "Done");

  Promise.allSettled([AssignmentCall, todoCall]).then((res) => {
    console.log({ res });

    assignmentCount.value = res[0].value?.count;
    todoCount.value = res[1].value?.count;
    latestSchedule.value = res[1].value.data;
    latestAssignment.value = res[0].value.data;
    showAlert.value = true;
  });
}
getCounts();

const sortedPriority = computed(() => {
  // merge latestSchedule and latestAssignment and sort them by priority [High, Medium, Low]
  const merged = [...latestSchedule.value, ...latestAssignment.value];
  return merged.sort((a, b) => {
    if (a.priority === "High") return -1;
    if (a.priority === "Medium" && b.priority === "Low") return -1;
    return 1;
  });
});
</script>

<style lang="scss" scoped></style>
