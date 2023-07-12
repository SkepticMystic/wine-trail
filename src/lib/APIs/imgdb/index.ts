// import { IMGDB_API_KEY } from "$env/static/private";
// import { err, suc } from "$lib/utils";
// import axios from "axios";
// import type { IImgDB } from "./interfaces";

// const BASE_URL = "https://api.imgbb.com";

// // NOTE: Problem with imgdb is I can't seem to change the file name from the original
// const upload = async (image: string, name: string) => {
//   const form = new FormData();

//   form.append("name", name);
//   form.append("image", image.split(",")[1]);

//   try {
//     const { data } = await axios.post<IImgDB.SuccessReponse>(
//       `${BASE_URL}/1/upload?key=${IMGDB_API_KEY}&name=${name}`,
//       form,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       },
//     );
//     console.log(data);

//     if (data.success) {
//       return suc(data.data);
//     } else {
//       return err(data);
//     }
//   } catch (error) {
//     const { data } = error?.response ?? {};
//     console.error(data ?? error);
//     return err(data);
//   }
// };

// export const ImgDB = {
//   upload,
// };
