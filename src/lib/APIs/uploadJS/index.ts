import { UPLOADJS_API_KEY } from "$env/static/private";
import { err, suc } from "$lib/utils";
import { Configuration, UploadManager } from "upload-js-full";

const accountId = "W142i4V";

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
      accountId,
      data: Buffer.from(image_data, "binary"),
      mime: image_type,
      path,
    });

    console.log(upload);
    return suc(upload);
  } catch (error) {
    console.log(error);
    return err(error);
  }
};

// const BASE_URL = "https://api.upload.io";
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
//     const { data } = await axios.post<IUploadJS.SuccessReponse>(
//       `${BASE_URL}/v2/accounts/${accountId}/uploads/binary?${searchParams}`,
//       Buffer.from(image_data, "binary"),
//       {
//         headers: {
//           Authorization: `Bearer ${UPLOADJS_API_KEY}`,
//           "Content-Type": image_type,
//         },
//       },
//     );

//     console.log(data);

//     return suc(data);
//   } catch (error) {
//     const { data } = error?.response ?? {};
//     console.error(data ?? error);
//     return err(data);
//   }
// };

export const UploadJS = {
  managedUpload,
  //   basicUpload,
};
