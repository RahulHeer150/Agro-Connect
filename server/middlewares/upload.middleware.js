
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// // 🔹 Cloudinary storage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "agroconnect/products",
//     allowed_formats: ["jpg", "png", "jpeg", "mp4", "mov", "avi"],
//   },
// });
// // const path = require("path");
// // const fs = require("fs");

// // Ensure uploads folder exists
// const uploadDir = path.join(__dirname, "..", "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // 🔹 Storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir); // folder where files will be stored
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//     cb(null, uniqueName);
//   },
// });

// // 🔹 File filter (only images/videos allowed)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv/;
//   const extname = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase(),
//   );
//   const mimeType = allowedTypes.test(file.mimetype);

//   if (extname && mimeType) {
//     cb(null, true);
//   } else {
//     cb(new Error("❌ Only image or video files are allowed"));
//   }
// };

// // 🔹 Multer upload instance
// const upload = multer({
//   storage,
//   limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
//   fileFilter,
// });

// module.exports = upload;


const multer = require("multer");
const CloudinaryStorage = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary");

// configure cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// file filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv/;

  const extname = allowedTypes.test(
    require("path").extname(file.originalname).toLowerCase()
  );

  const mimeType = allowedTypes.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only image/video allowed"), false);
  }
};

// storage
const storage = CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "agroconnect/products",
    resource_type: "auto",
  },
});

// multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});

module.exports = upload;
// const multer = require("multer");
// const CloudinaryStorage = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// // 🔹 File filter (images + videos)

// console.log("Cloudinary config:", cloudinary.config());
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv/;

//   const extname = allowedTypes.test(
//     require("path").extname(file.originalname).toLowerCase()
//   );

//   const mimeType = allowedTypes.test(file.mimetype);

//   if (extname && mimeType) {
//     cb(null, true);
//   } else {
//     cb(new Error("❌ Only image or video files are allowed"), false);
//   }
// };

// // 🔹 Cloudinary storage config
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "agroconnect/products", // 📁 Cloudinary folder
//     resource_type: "auto", // 🔥 important for images + videos
//     allowed_formats: ["jpg", "png", "jpeg", "gif", "mp4", "mov", "avi", "mkv"],
//   },
// });

// // 🔹 Multer instance
// const upload = multer({
//   storage,
//   limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
//   fileFilter,
// });

// module.exports = upload;