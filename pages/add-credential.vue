<template>
  <div>
    <PageTitle>Add Credential</PageTitle>
    <form @submit.prevent="addCredential">
      <div class="md:ml-9">
        <div class="mb-2 mt-4 font-semibold">Title</div>
        <TextInput required v-model="credentialForm.fileName" />
        <div class="mb-2 mt-4 font-semibold">Attachments</div>
        <div class="mb-0 w-4/5 md:w-2/3">
          <FileInput required v-model="credentialForm.file" />
        </div>
      </div>
      <div class="w-4/5 md:w-2/3">
        <AddButton
          class="float-right mb-10 bg-green-500 p-2 font-semibold text-white"
          >ADD CREDENTIAL
        </AddButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const credentialForm = reactive({
  fileName: "",
  file: null as FileList | null,
});

async function addCredential() {
  try {
    const file_ext = credentialForm.file
      ? credentialForm.file[0].name.split(".").at(-1)?.trim()
      : null;
    const { data: savedData, error } = await useSupabaseClient<Database>()
      .from("Credentials")
      .insert({
        title: credentialForm.fileName,
        has_attachment: credentialForm.file ? true : false,
        file_ext,
      })
      .select("*");

    if (error) {
      console.log(error);
    }

    if (savedData) {
      console.log(savedData, credentialForm.file);
      if (credentialForm.file) {
        const { data, error } = await useSupabaseClient<Database>()
          .storage.from("files")
          .upload(
            `${useSupabaseUser().value?.id}/credentials/${
              savedData[0].id
            }.${credentialForm.file[0].name.split(".").at(-1)?.trim()}`,
            credentialForm.file[0]
          );
        if (error) {
          console.log(error);
        }
        if (data) {
          console.log(data);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style lang="scss" scoped></style>
