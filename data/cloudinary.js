import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: "dalll4udd",
  api_key: "283265795431351",
  api_secret: "SxzWhnHTmC2HFoHIIAGgYOsWUkk",
});

let cloudUpload = (req) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: "foo",
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
  });
};

// let result = await cloudUpload(req);
// console.log(result);

// const cloudUpload = async (req) => {
//   {
//     try {
//       let response = await cloudinary.uploader.upload(function (error, result) {
//         console.log(error, result);

//         return result;
//       });

//       streamifier.createReadStream(req.file.buffer).pipe(response);
//       console.log(
//         response,
//         "-00000000090-9-=========================-----------"
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };
export { cloudUpload };
