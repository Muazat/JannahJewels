export const useAppLoader = ref<Boolean>(false);
export const useAppLoaderText = ref<String>("Loading...");
export const useSetAppLoader = (
  status: Boolean,
  text: String = "Loading..."
) => {
  useAppLoader.value = status;
  useAppLoaderText.value = text;
};

export const useAppAlert = ref<Boolean>(false);
export const useAppAlertText = ref<String>("This is an alert");
export const useAppAlertType = ref<String>("success");
export const useSetAppAlert = (
  status: Boolean,
  text: String = "This is an alert",
  type: String = "success"
) => {
  useAppAlert.value = status;
  useAppAlertText.value = text;
  useAppAlertType.value = type;
};

export const useSaveData = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const useDownloadFile = async (
  resource: { id: number; file_ext: string },
  folder: String,
  bucket: string = "files",
  folderId = useSupabaseUser().value?.id
) => {
  if (resource.id && resource.file_ext) {
    useSetAppLoader(true, "Downloading File");
    const { data, error } = await useSupabaseClient()
      .storage.from(bucket)
      .download(`${folderId}/${folder}/${resource.id}.${resource.file_ext}`);
    useSetAppLoader(false);
    if (error) {
      useSetAppAlert(true, error.message, "error");
    }
    if (data) {
      useSaveData(data, `${resource.id}.${resource.file_ext}`);
    }
  }
};
export const useGetAssetLink = async (
  resource: { id: number; file_ext: string },
  folder: String,
  bucket: string = "files",
  folderId = useSupabaseUser().value?.id
) => {
  if (
    resource.id &&
    resource.file_ext &&
    ["jpg", "png", "gif", "bmp", "pdf"].includes(resource.file_ext)
  ) {
    const { data, error } = await useSupabaseClient()
      .storage.from(bucket)
      .createSignedUrl(
        `${folderId}/${folder}/${resource.id}.${resource.file_ext}`,
        3600
      );
    if (error) {
      useSetAppAlert(true, error.message, "error");
    }
    if (data) {
      return data.signedUrl;
    }
  } else {
    console.log("file can not be shown in iframe", resource.file_ext);
  }
};

export const useCopyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  useSetAppAlert(true, "Copied to clipboard", "success");
};
