import express from 'express'
import auth from '../middleware/auth.js'
import { createComment } from '../controllers/comments.js'

const router = new express.Router()

router.post('/posts/:post_id/comment', auth, createComment)

export default router