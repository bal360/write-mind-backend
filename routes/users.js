import express from 'express'
import { signUp } from '../controllers/users.js'

const router = new express.Router()

router.post('/signup', signUp)

export default router