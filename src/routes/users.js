import express from 'express'
import multer from 'multer'
import auth from '../middleware/auth.js'
import { getUser, signUp, signIn, uploadProfilePicture } from '../controllers/users.js'

const upload = multer({ 
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, callback) {
    const regex = /\.(jpg|jpeg|png)$/i
    if (!file.originalname.match(regex)) {
      return callback(new Error('Must be a jpg, jpeg, or png file'))
    }
    callback(undefined, true)
  } 
})

const router = new express.Router()

router.get('/me', auth, getUser)

router.post('/signup', signUp)

router.post('/signin', signIn)

router.post('/me/picture', auth, upload.single('picture'), uploadProfilePicture)

export default router