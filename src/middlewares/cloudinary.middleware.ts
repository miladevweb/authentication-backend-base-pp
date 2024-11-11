import multer from 'multer'
import cloudinary from '../utils/CloudinaryConfig'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      format: 'jpeg',
      public_id: file.originalname, // name
      folder: 'next-auth-cloudinary' + '/' + req.body.name,
    }
  },
})

const upload = multer({ storage })
export { upload }
