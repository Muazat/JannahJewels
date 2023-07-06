<template>
  <h1 class="mt-4 text-center text-2xl font-bold text-primary">
    Reset Password
  </h1>
  <div class="mt-3 flex justify-center font-semibold text-primary">
    <main class="rounded border border-primary bg-tertiary md:p-6">
      <form class="login-form" action="" method="POST">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <!-- <input type="hidden" name="" value="" /> -->
        <Mbutton>Submit</Mbutton>
      </form>
      <br />
      <p class="centered hidden">
        Instructions for resetting your password will be sent to the email you
        provide.
      </p>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "website",
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/form.css";
</style>
