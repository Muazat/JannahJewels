<template>
  <div>
    <Alert v-model="showAlert">Dashboard has been loaded successfully</Alert>
    <PageTitle>Dashboard</PageTitle>
    <DashboardSumarry
      :noteCount="noteCount"
      :AssignmentCount="assignmentCount"
      :todoCount="todoCount"
      :classCount="classCount"
    />

    <div class="mt-16 md:flex">
      <div class="md:mx-6 md:basis-1/3">
        <h1 class="text-left font-bold">Latest Schedule</h1>
        <Table>
          <TableHead>
            <TableData class="font-bold">Date</TableData>
            <TableData class="font-bold">Time</TableData>
            <TableData class="font-bold"> Description</TableData>
          </TableHead>
          <tbody>
            <tr
              class="border"
              v-for="(schedule, index) in latestSchedule"
              :key="index"
            >
              <TableData>
                {{ dayjs(schedule.due_date).format("DD/MM/YY") }}
              </TableData>
              <TableData>
                {{ JSON.parse(schedule.time).hours }} :
                {{ JSON.parse(schedule.time).minutes }}</TableData
              >
              <TableData>{{ schedule.description }}</TableData>
            </tr>
            <TableEnd>
              <NuxtLink to="todo" class="font-light text-primary">
                see more
              </NuxtLink>
            </TableEnd>
          </tbody>
        </Table>
      </div>

      <div class="mt-9 md:mt-0 md:basis-3/5">
        <h1 class="text-left font-bold">Top 5 Priorities</h1>
        <Table>
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
            <TableEnd>
              <NuxtLink class="font-light text-primary" to="priorities">
                see more
              </NuxtLink>
            </TableEnd>
          </tbody>
        </Table>
      </div>
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

const noteCount = ref<number | null>(0);
const assignmentCount = ref<number | null>(0);
const todoCount = ref<number | null>(0);
const classCount = ref<number | null>(0);
const latestSchedule = ref([]);
const latestAssignment = ref([]);

async function getCounts() {
  const noteCall = supabaseClient
    .from("Notes")
    .select("*", { count: "exact", head: true });

  const AssignmentCall = supabaseClient
    .from("Assignments")
    .select("*", { count: "exact" })
    .neq("status", "Done")
    .limit(5);

  const todoCall = supabaseClient
    .from("Tasks")
    .select("*", { count: "exact" })
    .order("due_date")
    .neq("status", "Done")
    .limit(5);

  const classCall = supabaseClient
    .from("Lecturer's classes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", useSupabaseUser()?.value.id);
  Promise.allSettled([noteCall, AssignmentCall, todoCall, classCall]).then(
    (res) => {
      console.log({ res });

      noteCount.value = res[0].value?.count;
      assignmentCount.value = res[1].value?.count;
      latestAssignment.value = res[1].value.data;
      todoCount.value = res[2].value?.count;
      latestSchedule.value = res[2].value.data;
      classCount.value = res[3].value?.count;

      showAlert.value = true;
    }
  );
}
getCounts();

const sortedPriority = computed(() => {
  // merge latestSchedule and latestAssignment and sort them by priority [High, Medium, Low]
  const merged = [...latestSchedule.value, ...latestAssignment.value];
  return merged.sort((a, b) => {
    if (a.priority === "High") return -1;
    if (a.priority === "Medium" && b.priority === "Low") return -1;
    return 1;
  }).length > 5
    ? merged.slice(0, 5)
    : merged;
});
</script>

<style lang="scss" scoped></style>
