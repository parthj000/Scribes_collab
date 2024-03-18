import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dalll4udd",
  api_key: "283265795431351",
  api_secret: "SxzWhnHTmC2HFoHIIAGgYOsWUkk",
});

const cloudUpload = async (localFilePath) => {
  try {
    if (localFilePath) {
      const result = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });
      fs.unlinkSync(localFilePath);
      console.log("asynchro operation is complete");

      console.log("uploaded", result);
      console.log("=======================");
      console.log(result.url);
      return result.url;
    }
  } catch (err) {
    console.log(err);
    fs.unlinkSync(localFilePath);
  }
};
export { cloudUpload };
