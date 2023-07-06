<template>
  <PageTitle>CGPA Calculator</PageTitle>
  <form>
    <PageTitle v-if="!level" class="text-xl font-medium text-blue-700">
      First Semester level {{ semesterDisplay * 100 }}
    </PageTitle>
    <PageTitle v-if="level" class="text-xl font-medium text-blue-700">
      Second semester level {{ semesterDisplay * 100 }}
    </PageTitle>
    <div class="mt-8 space-y-2 sm:mx-24">
      <div class="border-b border-gray-900/10 pb-4">
        <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div>
        <div>
          <div class="mb-2 font-semibold">Years of course</div>
          <div class="grid grid-cols-5">
            <TextInput
              class="col-span-3 bg-gray-100"
              v-on:blur="Disabled"
              type="number"
              min="1"
              max="10"
              v-model="years"
              :disabled="!inputDisabled"
            >
            </TextInput>
            <button class="col-span-1 col-start-4" type="button" @click="undo">
              Change Year
            </button>
          </div>
        </div>
      </div>

      <CgpaHeading></CgpaHeading>
      <CgpaAdd
        ref="cgpaAdd"
        @updated="addCourse"
        v-for="i in numberOfCourses"
        :index="i"
        :key="i"
      ></CgpaAdd>

      <div
        class="grid grid-cols-3 gap-x-6 gap-y-8 font-semibold sm:grid-cols-6"
      >
        <div class="sm:col-span-2">
          <div class="mt-2">TOTAL UNITS : {{ total }}</div>
        </div>
        <div class="sm:col-span-2">
          <div class="mt-2">GPA : {{ gpa }}</div>
        </div>
        <div class="sm:col-span-2">
          <div class="mt-2">CGPA : {{ cgpa }}</div>
        </div>
      </div>
      <!-- <h1>{{ years }}</h1> -->
      <div class="border-b border-gray-900/10 pb-4"></div>
      <!-- <div class=" md:grid grid-cols-4 content-center gap-4 p-2 font-semibold "> -->
      <div class="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
        <AddButton
          type="button"
          @click="addCourseCells"
          class="m-5 bg-green-500 p-2 font-semibold text-white"
        >
          Add
        </AddButton>
        <TextInput class="mt-5 pl-6 sm:mt-2" type="number" v-model="addcell">
        </TextInput>
        <AddButton
          type="button"
          @click="calculate"
          class="m-5 bg-green-600 p-2 font-semibold text-white"
        >
          Calculate
        </AddButton>
        <AddButton
          type="button"
          @click="undo"
          class="m-5 bg-red-500 p-2 font-semibold text-white"
        >
          Undo
        </AddButton>
      </div>
      <div
        v-if="nextSemester"
        class="grid grid-cols-4 content-center gap-4 p-2 font-semibold"
      >
        <div>
          <AddButton
            class="bg-blue-300 p-1"
            type="button"
            @click="nextSemesterCal"
            >Calculate For next Semester
          </AddButton>
        </div>
        <div>
          <AddButton class="bg-blue-300 p-1" type="button" @click="evaluate"
            >Evaluate performance</AddButton
          >
        </div>
      </div>
    </div>
  </form>
  <Modal v-if="evalGrade" @close="evalGrade = false">
    <template #header>
      <h3 class="text-2xl font-semibold">GRADE EVALUATION</h3>
    </template>
    <template #default>
      <div class="text-xl font-medium leading-10">
        <p class="text-2xl">You're on a {{ years }} years program</p>
        <p>
          Your current <b>CGPA score</b> is <b> {{ cgpa }} </b>
        </p>

        <p v-if="years != semester / 2" class="font-normal">
          Note: The average score is approximated
        </p>
        <p v-if="!(averageGPA(years, 4.52) > 4.5)">
          You'll need <b>{{ averageGPA(years, 4.52) }}</b> to remain at 1st
          class for each of the semesters left
        </p>

        <p v-if="averageGPA(years, 3.52) != 0 && averageGPA(years, 3.52) < 5">
          You'll need <b>{{ averageGPA(years, 3.52) }}</b> to remain at with a
          2nd class upper for each of the semesters left
        </p>

        <p v-if="averageGPA(years, 2.52) != 0 && averageGPA(years, 2.52) < 5">
          You'll need <b>{{ averageGPA(years, 2.52) }}</b> to remain at with a
          2nd class lower for each of the semesters left
        </p>
        <div v-if="years == semester / 2">
          <p>Your <b>GPA</b> for the semesters were</p>
          <p class="inline-block font-normal" v-for="g in cgpaArray">
            <b> {{ g }}</b> ,
          </p>

          <p>
            Congratulations You will be graduating with a
            <b v-if="cgpa >= 4.5">First Class</b>
            <b v-else-if="cgpa >= 3.5">Second Class Upper</b>
            <b v-else-if="cgpa >= 2.5">Second Class Lower</b>
            <b v-else="cgpa < 2.5">Pass</b>
          </p>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
const nextSemester = ref(false);
const evalGrade = ref(false);
const inputDisabled = ref(true);
const level = ref(false);
const years = ref(1);
const addcell = ref(1);
const semester = ref(1);
const semesterDisplay = ref(1);
let count = 0;
let cgpaArray = [];
const numberOfCourses = ref(1);
let allCourses = reactive({});
const addCourse = (course, index) => {
  allCourses[index] = course;
};
const gpa = ref(0);
const cgpa = ref(0);
const total = ref(0);
const allTotal = {
  calgrade: [],
  total: [],
};
const cgpaAdd = ref(null);
function convert(g) {
  if (g == "A") {
    return 5;
  } else if (g == "B") {
    return 4;
  } else if (g == "C") {
    return 3;
  } else if (g == "D") {
    return 2;
  } else if (g == "E") {
    return 1;
  } else {
    return 0;
  }
}
function sum(arr) {
  let r = 0;
  for (let x in arr) {
    r = r + arr[x];
  }
  return r;
}
function calculate() {
  gpa.value = 0;
  total.value = 0;
  let calGrade = 0;
  let coursesLoad = 0;
  for (const key in allCourses) {
    if (!allCourses[key].showAdd) {
      continue;
    }
    coursesLoad = coursesLoad + +allCourses[key].creditUnit;
    calGrade =
      calGrade + convert(allCourses[key].grade) * +allCourses[key].creditUnit;
  }
  gpa.value = (calGrade / coursesLoad).toFixed(2);
  total.value = coursesLoad;
  //  adding cgpa to object checking if user have calculated and is trying to calculate again
  if (count == 0) {
    allTotal.calgrade.push(calGrade);
    allTotal.total.push(coursesLoad);
    cgpaArray.push(gpa.value);
    count++;
  } else {
    allTotal.calgrade.pop();
    allTotal.total.pop();
    allTotal.calgrade.push(calGrade);
    allTotal.total.push(coursesLoad);
    cgpaArray.pop();
    cgpaArray.push(gpa.value);
  }

  cgpa.value = (sum(allTotal.calgrade) / sum(allTotal.total)).toFixed(2);
  nextSemester.value = true;
}
function undo() {
  nextSemester.value = false;
  inputDisabled.value = true;
  semester.value = 1;
  count = 0;
  years.value = 1;
  numberOfCourses.value = 1;
  gpa.value = 0;
  cgpa.value = 0;
  total.value = 0;
  allTotal.calgrade = [];
  allTotal.total = [];
  cgpaArray = [];
  allCourses = {};
  semesterDisplay.value = 1;
  cgpaAdd.value[0].clearCourseInfo();
}
function nextSemesterCal() {
  if (semester.value != years.value * 2) {
    nextSemester.value = false;
    semester.value++;
    count = 0;
    numberOfCourses.value = 1;
    gpa.value = 0;
    cgpa.value = 0;
    total.value = 0;
    allCourses = {};
    level.value = !level.value;
    if (semester.value % 2 == 1) {
      semesterDisplay.value++;
    }
    cgpaAdd.value[0].clearCourseInfo();
  } else {
    evaluate();
  }
}
function evaluate() {
  evalGrade.value = true;
}
function Disabled() {
  inputDisabled.value = false;
}
function averageGPA(years, score) {
  let gpaNext;

  const extract = cgpaArray.reduce((a, b) => {
    a.push(score - b);
    return a;
  }, []);
  const extractSum = extract.reduce((a, b) => a + b);

  function getAverage() {
    let average;

    average = extractSum / (years * 2 - cgpaArray.length) + score;

    if (average < 0) {
      return 0;
    }

    return average.toFixed(2);
  }

  gpaNext = getAverage();

  return gpaNext;
}
function addCourseCells() {
  numberOfCourses.value = numberOfCourses.value + addcell.value;
  addcell.value = 1;
}
</script>
