import express from 'express'
import { getAllPosts } from '../controllers/posts.js'

const router = new express.Router()

router.get('/', getAllPosts)

export default router