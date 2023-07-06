<template>
  <h1 class="mt-4 text-center text-2xl font-bold text-primary">Sign Up !!</h1>
  <div class="mt-3 flex justify-center font-semibold text-primary">
    <main class="rounded border border-primary bg-tertiary md:p-6">
      <form
        class="login-form"
        action=""
        method="POST"
        novalidate
        @submit.prevent="signUpUser"
      >
        <div class="form-control">
          <label for="name">Name</label>
          <input
            class=""
            type="text"
            name="name"
            id="name"
            v-model="userDetails.name"
          />
        </div>
        <div class="form-control">
          <label for="email">Email</label>
          <input
            class=""
            type="email"
            name="username"
            id="email"
            v-model="userDetails.email"
          />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            class=""
            type="password"
            name="password"
            id="password"
            v-model="userDetails.password"
          />
        </div>
        <div class="form-control">
          <label for="confirmPassword">Confirm Password</label>
          <input
            class=""
            type="password"
            name="confirm-password"
            id="confirmPassword"
            v-model="userDetails.confirmPassword"
          />
        </div>
        <div>
          <input
            type="checkbox"
            id="instructor"
            v-model="userDetails.isInstructor"
          />
          <label for="instructor" class="ml-1 cursor-pointer">
            Sign up as instructor
          </label>
        </div>
        <Mbutton class="btn" type="submit"> SignUp </Mbutton>
        <Alert v-model="isErr">{{ msg }}</Alert>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
import Mbutton from "~~/components/Mbutton.vue";
const { auth } = useSupabaseClient();

definePageMeta({
  layout: "website",
});
const userDetails = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  isInstructor: false,
});
const msg = ref("");
const isErr = ref(false);
const signUpUser = () => {
  if (userDetails.password !== userDetails.confirmPassword) {
    msg.value = "Passwords do not match";
    isErr.value = true;
    return;
  }
  isErr.value = false;
  auth
    .signUp({
      email: userDetails.email,
      password: userDetails.password,
      options: {
        data: {
          username: userDetails.name,
          isInstructor: userDetails.isInstructor,
        },
      },
    })
    .then((res) => {
      if (res.error) {
        msg.value = res.error.message;
        isErr.value = true;
      } else {
        msg.value = "User created successfully";
        navigateTo("/dashboard");
      }
    });
};
</script>

<style scoped>
@import "@/assets/css/form.css";
</style>
