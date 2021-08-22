import "dotenv/config";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import multer from "multer";

const config = {
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
};

const s3 = new aws.S3(config);

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});
const uploadImg = upload.single("img");

export default uploadImg;
