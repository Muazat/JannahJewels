<template>
  <div
    v-if="showAdd"
    class="mt-2 grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-6"
  >
    <!-- <div class="sm:col-span-2 sm:col-start-1">
            <div class="mt-2">
              <input type="text"  v-model="courseCode"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div> -->

    <div class="sm:col-span-2">
      <div class="mt-2">
        <input
          type="number"
          v-model="courseInfo.creditUnit"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div class="sm:col-span-2">
      <div class="mt-2">
        <Mselect :options="categoryOptions" v-model="courseInfo.grade" />
      </div>
    </div>
    <button type="button" @click="showAdd = false">remove</button>
  </div>
</template>
<script setup lang="ts">
const categoryOptions = ["A", "B", "C", "D", "E", "F"];
const showAdd = ref(true);
const index = defineProp("index");

const courseInfo = reactive({
  creditUnit: "",
  grade: "",
  showAdd,
});
const clearCourseInfo = () => {
  courseInfo.creditUnit = "";
  courseInfo.grade = "";
};

const emit = defineEmits(["updated"]);
watch(
  courseInfo,
  () => {
    emit("updated", courseInfo, index.value, showAdd);
  },
  { deep: true }
);
defineExpose({
  clearCourseInfo,
});
</script>
