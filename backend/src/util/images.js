const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const url = require("url");
const express = require("express");
const router = express.Router();

// PROFILE IMAGE STORING STARTS
const s3 = new aws.S3({
  accessKeyId: "AKIAYVLMKQGT4OTW35CN",
  secretAccessKey: "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",
  Bucket: "ubereatsbucket",
});

// Single Upload

const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "ubereatsbucket",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("profileImage");

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

router.post("/upload", (req, res) => {
  console.log("In upload");
  profileImgUpload(req, res, (error) => {
    // console.log( 'requestOkokok', req.file );
    // console.log( 'error', error );
    if (error) {
      console.log("errors", error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected");
      } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location; // Save the file name into database into profile
        res.json({
          image: imageName,
          location: imageLocation,
        });
      }

      res.end({ message: "Success" });
    }
  });
});

module.exports = router;
