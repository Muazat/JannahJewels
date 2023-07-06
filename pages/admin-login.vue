<template>
  <div class="my-8 mx-16">
    <h1 class="mt-4 text-center text-xl font-bold text-primary">
      Intructor login
    </h1>
    <div class="mt-3 flex justify-center font-semibold text-primary">
      <main class="rounded border border-primary bg-tertiary md:p-6">
        <form class="login-form m-16" action="" method="POST" novalidate>
          <div class="form-control">
            <label for="email">Email</label>
            <MInput type="email" name="email" id="email" />
          </div>
          <div class="form-control">
            <label for="password">Password</label>
            <MInput type="password" name="password" id="password" />
          </div>
          <input type="hidden" name="" value="" />
          <Mbutton class="btn" type="submit">Login</Mbutton>
        </form>
        <div class="reset">
          <NuxtLink class="mb-2" to="/admin-register"
            >Don't have an account? Register</NuxtLink
          >
        </div>
        <div class="reset">
          <NuxtLink class="mb-2" to="/reset-password">Reset Password</NuxtLink>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import MInput from "~~/components/MInput.vue";
definePageMeta({
  layout: "website",
});
</script>

<style lang="scss" scoped></style>
