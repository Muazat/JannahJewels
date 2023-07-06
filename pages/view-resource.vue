<template>
  <div>
    <PageTitle>View Resource</PageTitle>
    <div class="mt-16 flex text-black md:justify-center">
      <div class="rounded border border-black bg-tertiary md:w-4/5 md:p-6">
        <div class="inline-flex">
          <div class="mr-4">
            <!-- <NuxtLink to="edit-note">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2v6a2 2 0 0 0 2 2h4.92c-.596.22-1.144.554-1.558.97l-6.05 6.092a2.815 2.815 0 0 0-.728 1.279l-.525 2.03A2.082 2.082 0 0 0 10.3 22H5.5A1.5 1.5 0 0 1 4 20.5v-17A1.5 1.5 0 0 1 5.5 2H12Z"
                  fill="#212121" />
                <path
                  d="M13.5 2.5V8a.5.5 0 0 0 .5.5h5.5l-6-6ZM12.196 17.572l5.902-5.902a2.285 2.285 0 1 1 3.233 3.232l-5.903 5.902a2.684 2.684 0 0 1-1.247.707l-1.831.457a1.087 1.087 0 0 1-1.318-1.318l.457-1.83c.118-.473.362-.904.707-1.248Z"
                  fill="#212121" />
              </svg>
            </NuxtLink> -->
          </div>

          <div class="mr-2" @click="increaseFontClickHandler">
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.625 5.78a1 1 0 0 1-1.25-1.56l2.5-2a1 1 0 0 1 1.25 0l2.5 2a1 1 0 0 1-1.25 1.56L18.5 4.28l-1.875 1.5Zm-3.706-1.174a1 1 0 0 0-1.838 0l-6 14a1 1 0 0 0 1.838.788L8.803 15h6.395l1.883 4.394a1 1 0 0 0 1.838-.788l-6-14ZM12 7.54l2.34 5.46H9.66L12 7.54Z"
                fill="#212121"
              />
            </svg>
          </div>
          <!-- decresse font -->
          <div class="mr-4" @click="decreaseFontClickHandler">
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.625 2.22a1 1 0 1 0-1.25 1.56l2.5 2a1 1 0 0 0 1.25 0l2.5-2a1 1 0 0 0-1.25-1.56L18.5 3.72l-1.875-1.5ZM12 4a1 1 0 0 1 .92.606l5.999 14a1 1 0 0 1-1.838.788L15.198 15H8.802L6.92 19.394a1 1 0 0 1-1.838-.788l6-14A1 1 0 0 1 12 4Zm0 3.539-2.34 5.46h4.68L12 7.54Z"
                fill="#212121"
              />
            </svg>
          </div>
          <div class="mr-2" @click="boldClickHandler">
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 5.75C6 4.784 6.784 4 7.75 4h4.749c2.823 0 4.751 2.34 4.751 4.75 0 .931-.288 1.852-.803 2.632C17.369 12.239 18 13.47 18 15c0 3.133-2.677 5-5 5H7.75A1.75 1.75 0 0 1 6 18.25V5.75Zm3.5 7.75v3H13c.312 0 .71-.138 1.024-.421.288-.26.476-.615.476-1.079 0-.888-.745-1.5-1.5-1.5H9.5Zm0-3.5h3c.715 0 1.25-.592 1.25-1.25 0-.657-.536-1.25-1.251-1.25H9.5V10Z"
                fill="#212121"
              />
            </svg>
          </div>
        </div>
        <div
          class="float-right rounded bg-black px-2 font-extrabold text-tertiary hover:text-red-300"
        >
          <NuxtLink to="class">X</NuxtLink>
        </div>
        <h1 class="text-lg font-semibold">
          {{ useMainStore().getLoadedNote.title }}
        </h1>
        <div
          class="mt-2 rounded border border-primary bg-white p-1 text-justify font-medium leading-6 md:p-8 md:leading-10"
        >
          <p ref="text">
            {{ useMainStore().getLoadedNote.description }}
          </p>
        </div>
      </div>
    </div>
    <div>
      <div class="my-3 flex flex-col font-bold">
        <div>Attachments</div>
        <div class="flex">
          <button
            @click="
              useDownloadFile(
                useMainStore().getLoadedNote,
                'resources',
                'lecturers-record',
                useMainStore().getLoadedNote.user_id
              )
            "
            title="Download File"
            :disabled="
              !useMainStore().getLoadedNote.has_attachment &&
              !useMainStore().getLoadedNote.file_ext
            "
            :class="[
              useMainStore().getLoadedNote.has_attachment &&
              useMainStore().getLoadedNote.file_ext
                ? 'cursor-pointer text-blue-500 hover:text-blue-300'
                : '!pointer-events-none text-gray-300',
            ]"
          >
            Download Attachment
            <Icon name="mdi:file-download" class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
    <FrameWrapper :fileURL="fileURL" />
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "~~/store";

const text = ref<HTMLDivElement>(null);
var font = false;
// making text bold
function boldClickHandler() {
  if (font == false) {
    text.value.style.fontWeight = "bold";
    font = true;
  } else {
    text.value.style.fontWeight = "normal";
    font = false;
  }
}

//call useGetAssetLink to get file link
const { data: fileURL } = useAsyncData(async () => {
  return await useGetAssetLink(
    useMainStore().getLoadedNote,
    "resources",
    "lecturers-record",
    useMainStore().getLoadedNote.user_id
  );
});

// increasing font size
var fontsize = 14;
var fontincrement = 2;
var lineHeight = 40;
function increaseFontClickHandler() {
  if (fontsize != 24) {
    text.value.style.fontSize = fontincrement + fontsize + "px";
    text.value.style.lineHeight = lineHeight + 1 + "px";
    lineHeight = lineHeight + 1;
    fontsize = fontsize + fontincrement;
  }
}

function decreaseFontClickHandler() {
  if (fontsize >= 14) {
    text.value.style.fontSize = fontsize - fontincrement + "px";
    text.value.style.lineHeight = lineHeight - 1 + "px";
    lineHeight = lineHeight - 1;
    fontsize = fontsize - fontincrement;
  }
}
</script>
