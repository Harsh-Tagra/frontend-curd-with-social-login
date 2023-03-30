import AwsClient from "./config";
import fs from "fs";
const uploadfile = async (name: string, value: any) => {
  function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const base64: any = await getBase64(value);
  const folderName = "users_profile_picture";

  // Note the trailing slash in the key name to create a folder

  const Body = Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const S3 = new AwsClient.S3({});
  const filename = `${folderName}/${name}`;

  const uploadparmas = {
    Key: filename,
    Bucket: "harshtagra",
    Body,
  };
  const upload = await S3.upload(uploadparmas).promise();

  return upload.Location;
};

export default uploadfile;
