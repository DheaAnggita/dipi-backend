const cloudinary = require('cloudinary').v2;
const multer = require('multer');
require('dotenv').config();
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', 
    allowed_formats: ['mp4'], 
    resource_type: 'video', 
  }
});

const multerUpload = multer({ storage: storage });
const uploadVideoMiddleware = (req, res, next) => {
  multerUpload.single('video')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log("Multer error:", err);
      return res.status(400).json({ error: err.message });
    } else if (err) {
      console.log("Other error:", err);
      return res.status(500).json({ error: err.message });
    }
    next();
  });
};


module.exports = { uploadVideoMiddleware };
