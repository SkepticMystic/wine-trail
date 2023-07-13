import { UPLOADJS_API_KEY } from "$env/static/private";
import { err, suc } from "$lib/utils";
import axios from "axios";
import { Configuration, UploadManager } from "upload-js-full";

const BASE_URL = "https://api.upload.io";
const ACCOUNT_ID = "W142i4V";
const AUTH_HEADER = {
  Authorization: `Bearer ${UPLOADJS_API_KEY}`,
};

const uploadManager = new UploadManager(
  new Configuration({
    apiKey: UPLOADJS_API_KEY,
    // See https://github.com/nodejs/node/issues/46221
    fetchApi: (input: RequestInfo | URL, init?: RequestInit | undefined) =>
      fetch(input, {
        ...init,
        //@ts-expect-error
        duplex: "half",
      }),
  }),
);

const managedUpload = async ({ image_data, image_type, path }: {
  image_data: string;
  image_type: string;
  path: {
    folderPath: string;
    fileName: string;
  };
}) => {
  try {
    const upload = await uploadManager.upload({
      accountId: ACCOUNT_ID,
      data: Buffer.from(image_data, "binary"),
      mime: image_type,
      path,
    });

    console.log("managedUpload", upload);
    return suc(upload);
  } catch (error) {
    console.log(error);
    return err(error);
  }
};

// const basicUpload = async ({ image_data, image_type, path }: {
//   image_data: string;
//   image_type: string;
//   path: {
//     folderPath: string;
//     fileName: string;
//   };
// }) => {
//   const searchParams = new URLSearchParams(path);

//   try {
//     const { data } = await axios.post<FileDetails>(
//       `${BASE_URL}/v2/accounts/${ACCOUNT_ID}/uploads/binary?${searchParams}`,
//       Buffer.from(image_data, "binary"),
//       {
//         headers: {
//           ...AUTH_HEADER,
//           "Content-Type": image_type,
//         },
//       },
//     );

//     console.log("basicUpload", data);

//     return suc(data);
//   } catch (error) {
//     const { data } = error?.response ?? {};
//     console.error(data ?? error);
//     return err(data);
//   }
// };

const deleteFile = async ({ path }: {
  path: {
    filePath: string;
  };
}) => {
  const searchParams = new URLSearchParams(path);

  try {
    const { data, status } = await axios.delete<undefined>(
      `${BASE_URL}/v2/accounts/${ACCOUNT_ID}/files?${searchParams}`,
      { headers: AUTH_HEADER },
    );

    console.log("deleteFile", { status, data });

    return suc(data);
  } catch (error) {
    const { data } = error?.response ?? {};
    console.error(data ?? error);
    return err(data);
  }
};

export const UploadJS = {
  managedUpload,
  //   basicUpload,
  deleteFile,
};
