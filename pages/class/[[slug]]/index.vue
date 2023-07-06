<template>
  <div>
    <PageTitle>Course Resources</PageTitle>
    <AddButton class="md:float-right" v-if="isLecturer">
      <NuxtLink :to="`/class/${course_access_code}/add-resources`">
        +ADD RESOURCES
      </NuxtLink>
    </AddButton>

    <div class="mt-4 flex-col md:mt-16 md:flex">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        class="mx-2 mb-4 inline-flex items-center justify-between rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mx-8"
        type="button"
        v-if="!isLecturer"
        @click="showAccessCode = !showAccessCode"
      >
        Previously Accessed Courses
        <Icon
          :name="!showAccessCode ? 'mdi:chevron-down' : 'mdi:chevron-up'"
          class="h-6 w-6"
        />
      </button>

      <Table v-if="showAccessCode && !isLecturer" class="md:basis-4/5">
        <TableHead>
          <TableData class="font-bold">Access Code</TableData>
          <TableData class="font-bold">Course Code</TableData>
          <TableData class="font-bold">Course TItle</TableData>
        </TableHead>
        <tr v-for="classInfo in accessedCourses" class="border">
          <TableData
            class="cursor-pointer whitespace-nowrap hover:opacity-75"
            @click="useCopyToClipboard(classInfo.access_code)"
          >
            {{ classInfo.access_code }}
            <Icon
              name="ic:round-file-copy"
              class="mr-1 h-6 w-6 cursor-pointer text-primary"
            />
          </TableData>

          <TableData class="whitespace-nowrap">{{
            classInfo.course_code
          }}</TableData>
          <TableData class="whitespace-nowrap">{{
            classInfo.course_title
          }}</TableData>
        </tr>
      </Table>
      <div class="ml-2 flex flex-col md:ml-8 md:flex-row md:justify-between">
        <div class="flex flex-col md:flex-row md:items-center">
          <div class="flex flex-col" v-if="classInfo">
            <h1 class="text-2xl font-bold">Class Information</h1>
            <p class="text-sm text-gray-500">
              Course Title:
              <span class="font-bold">
                {{ classInfo.course_name }}
              </span>
            </p>
            <p class="text-sm text-gray-500">
              Course Code:
              <span class="font-bold">
                {{ classInfo.course_code }}
              </span>
            </p>
            <p class="text-sm text-gray-500">
              Access Code:
              <span
                @click="useCopyToClipboard(classInfo.shared_code)"
                class="cursor-pointer font-bold hover:opacity-75"
              >
                {{ classInfo.shared_code }}
                <Icon
                  name="ic:round-file-copy"
                  class="mr-1 h-6 w-6 cursor-pointer text-primary"
                />
              </span>
            </p>
          </div>
        </div>
      </div>
      <form
        v-if="!isLecturer"
        @submit.prevent="refresh"
        class="flex flex-col justify-end gap-3 md:flex-row"
      >
        <input
          type="text"
          v-model="course_access_code"
          autocomplete="on"
          required
          class="float-right w-fit rounded-md border border-gray-300 px-4 py-2 md:basis-2/5"
          placeholder="Input Course Access Code"
        />
        <Mbutton class="!my-0 whitespace-nowrap"> Get Resources </Mbutton>
      </form>
      <Table class="md:basis-4/5">
        <TableHead>
          <TableData class="font-bold"></TableData>
          <TableData class="font-bold">Title</TableData>
          <TableData class="font-bold">Created on</TableData>
          <TableData class="font-bold" v-if="isLecturer">Action</TableData>
        </TableHead>
        <tr v-for="resource in resources" class="border">
          <TableData>
            <div class="inline-flex items-center gap-8">
              <div
                class="font-bold text-blue-500 hover:text-blue-300"
                :class="[
                  resource.has_attachment && resource.file_ext
                    ? 'cursor-pointer text-blue-500 hover:text-blue-300'
                    : 'cursor-not-allowed text-gray-300',
                ]"
              >
                <button
                  @click="
                    useDownloadFile(
                      resource,
                      'resources',
                      'lecturers-record',
                      resources![0].user_id
                    )
                  "
                  title="Download File"
                  :disabled="!resource.has_attachment && !resource.file_ext"
                  :class="[
                    resource.has_attachment && resource.file_ext
                      ? 'cursor-pointer text-blue-500 hover:text-blue-300'
                      : '!pointer-events-none text-gray-300',
                  ]"
                >
                  <Icon name="mdi:file-download" class="h-6 w-6" />
                </button>
              </div>
              <button @click="view(resource)">
                <Icon
                  name="mdi:eye-arrow-right"
                  class="h-6 w-6 cursor-pointer text-blue-500 hover:text-blue-300"
                />
              </button>
            </div>
          </TableData>
          <TableData class="whitespace-nowrap">{{ resource.title }}</TableData>
          <TableData class="whitespace-nowrap">{{
            dayjs(resource.created_at).fromNow()
          }}</TableData>
          <TableData v-if="isLecturer">
            <div class="inline-flex gap-6">
              <Icon
                name="material-symbols:edit-document"
                class="h-6 w-6 cursor-pointer text-blue-500 hover:text-blue-300"
              />
              <Icon
                name="ic:baseline-delete"
                @click="deleteNote(resource.id)"
                class="h-6 w-6 cursor-pointer text-red-500 hover:text-red-300"
              />
            </div>
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
import { useMainStore } from "~~/store";
import { Database } from "~~/types/supabase";
dayjs.extend(relativeTime);

const showAccessCode = ref(false);
const supabaseClient = useSupabaseClient<Database>();

const course_access_code = ref(useRoute().params.slug);
const classInfo = ref(null);
const accessedCourses = ref(null);
const { data: resources, refresh } = useAsyncData(
  "resources",
  async () => {
    useSetAppLoader(true);
    const { data } = await supabaseClient
      .from("Lecturer's resources")
      .select("*")
      .eq("access_code", course_access_code.value)
      .order("created_at", { ascending: false });

    const { data: courseInfo } = await supabaseClient
      .from("Lecturer's classes")
      .select("*")
      .eq("shared_code", course_access_code.value);
    if (courseInfo) {
      classInfo.value = courseInfo[0];
    }

    if (!isLecturer.value) {
      console.log("is not lecturer, getting accessed courses");

      const { data: accessedClasses } = await supabaseClient
        .from("Accessed Courses")
        .select("*");
      if (accessedClasses) {
        accessedCourses.value = accessedClasses;
      }
    }

    // check if user has accessed this course before
    if (
      !isLecturer.value &&
      accessedCourses.value &&
      data?.length &&
      course_access_code.value &&
      classInfo.value
    ) {
      const hasAccessed = accessedCourses.value.find(
        (course) => course.access_code === course_access_code.value
      );
      if (!hasAccessed) {
        await supabaseClient.from("Accessed Courses").insert([
          {
            access_code: course_access_code.value,
            course_code: classInfo.value.course_code,
            course_title: classInfo.value.course_name,
          },
        ]);
      }
    }

    useSetAppLoader(false);
    showAccessCode.value = course_access_code.value ? false : true;
    return data;
  },
  { server: false }
);

const deleteNote = async (id: number) => {
  const { data, error } = await supabaseClient
    .from("Lecturer's resources")
    .delete()
    .match({ id });
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }
};
const isLecturer = computed(() => {
  return useSupabaseUser().value?.user_metadata?.isInstructor;
});

const downloadFile = async (resource) => {
  useDownloadFile(
    resource,
    "resources",
    "lecturers-record",
    resources.value[0].user_id
  );
};
const store = useMainStore();
const view = (note) => {
  store.setLoadedNote(note);
  useRouter().push("/view-resource");
};
</script>

<style lang="scss" scoped></style>
