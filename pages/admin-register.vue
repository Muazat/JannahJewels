<template>
  <h1 class="mt-4 text-center text-2xl font-bold text-primary">
    Instructor Registration !!
  </h1>
  <div class="mt-3 flex justify-center font-semibold text-primary">
    <main class="rounded border border-primary bg-tertiary md:p-6">
      <form class="login-form m-16" action="" method="POST" novalidate>
        <div class="form-control">
          <label for="email">Name</label>
          <MInput class="" type="username" name="username" id="username" />
        </div>
        <div class="form-control">
          <label for="email">Email</label>
          <MInput class="" type="email" name="email" id="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <MInput class="" type="password" name="password" id="password" />
        </div>
        <div class="form-control">
          <label for="confirmPassword">Confirm Password</label>
          <MInput
            class=""
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
        </div>
        <Mbutton class="btn" type="submit"> SignUp </Mbutton>
      </form>
    </main>
  </div>
</template>

<script setup>
import MInput from "~~/components/MInput.vue";
definePageMeta({
  layout: "website",
});
</script>

<style lang="scss" scoped></style>
