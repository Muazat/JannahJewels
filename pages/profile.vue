<template>
  <div>
    <PageTitle>Profile</PageTitle>
    <form @submit.prevent="editProfile">
      <div class="md:ml-9">
        <div class="mb-2 mt-4 font-semibold">Name</div>
        <TextInput v-model="name" required></TextInput>
      </div>
      <div class="md:ml-9">
        <div class="mb-2 mt-4 font-semibold">Email</div>
        <TextInput v-model="email" type="email" required></TextInput>
      </div>
      <div class="md:ml-9">
        <div class="mb-2 mt-4 font-semibold">Change Password</div>
        <TextInput
          class="mb-2"
          placeholder="New password"
          v-model="newPass"
          type="password"
          required
        ></TextInput>
        <TextInput
          class="mb-2"
          placeholder="Confirm password"
          v-model="confirmPass"
          type="password"
          required
        ></TextInput>
        <!-- <TextInput placeholder= {{text}} v-model="text"></TextInput> -->
      </div>
      <div class="w-4/5 md:w-2/3">
        <AddButton
          class="float-right mb-10 bg-green-500 p-2 font-semibold text-white"
        >
          EDIT PROFILE
        </AddButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const name = ref(useSupabaseUser().value.user_metadata.username);
const email = ref(useSupabaseUser().value.email);
const newPass = ref("");
const confirmPass = ref("");

const editProfile = async () => {
  //check if new password and confirm password match
  if (!newPass.value || newPass.value != confirmPass.value) {
    useSetAppAlert(true, "Passwords do not match", "error");
    return;
  }
  useSetAppLoader(true, "Editing profile...");

  const { data, error } = await useSupabaseAuthClient().auth.updateUser({
    email: email.value,
    password: newPass.value,
    data: {
      username: name.value,
    },
  });
  if (error) {
    console.log(error);
  } else {
    console.log(data);
    useSetAppLoader(false);
    useSetAppAlert(true, "Profile edited successfully", "success");
  }
};
</script>

<style lang="scss" scoped></style>
