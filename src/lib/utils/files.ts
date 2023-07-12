import { addToast } from "$lib/stores/toast";

export const readFileAsBinaryString = (
  file: File | undefined,
  cb: (file_data: string) => void | Promise<void>,
  opts?: {
    fileType?: string;
  },
): void => {
  if (!file) {
    // No file selected
    return;
  }

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

    await cb(result);
  });

  reader.readAsBinaryString(file);
};
