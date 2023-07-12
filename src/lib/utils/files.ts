import { addToast } from "$lib/stores/toast";

export const readFileAsBinaryString = (
  file: File,
  cb: (file_data: string, file: File) => void | Promise<void>,
  opts?: {
    fileType?: string;
  },
): void => {
  if (
    opts?.fileType &&
    !file.type.startsWith(`${opts.fileType}/`)
  ) {
    addToast({
      type: "error",
      message: "Incorrect file type.",
    });

    return;
  }

  const reader = new FileReader();

  reader.addEventListener("load", async (event) => {
    const { result } = event.target ?? {};
    if (typeof result !== "string") {
      addToast({
        type: "error",
        message: "Error reading file.",
      });

      return;
    }

    await cb(result, file);
  });

  reader.readAsBinaryString(file);
};
