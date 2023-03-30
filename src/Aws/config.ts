import AWS from "aws-sdk";
const accessKeyId: any = process.env.NEXT_PUBLIC_AccessKeyId;
const secretAccessKey: any = process.env.NEXT_PUBLIC_SecretAccessKey;
const region = "ap-south-1";

AWS.config.update({ region, credentials: { accessKeyId, secretAccessKey } });
export default AWS;
