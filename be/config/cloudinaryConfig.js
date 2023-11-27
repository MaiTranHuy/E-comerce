import { v2 as cloudinaryV2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2, 
  allowedFormats: ['jpg', 'png'],
  params: {
    folder: process.env.CLOUDINARY_FOLDER
  }
});

const uploadCloud = multer({ storage });

export default uploadCloud;
