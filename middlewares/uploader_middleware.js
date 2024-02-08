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
    allowed_formats: ['jpg', 'jpeg', 'png'], 
    transformation: [{ width: 500, height: 500, crop: 'limit' }] 
  }
});

const multerUpload = multer({ storage: storage });

const uploadMiddleware = (req, res, next) => {
  multerUpload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: 'Something went wrong' });
    }
    next();
  });
};

module.exports = {uploadMiddleware};
