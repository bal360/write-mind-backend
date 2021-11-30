import express from 'express'
import auth from '../middleware/auth.js'
import { 
  getAllPosts, 
  getAllPostsForUser, 
  getPost, 
  createPost, 
  updatePost,
  deletePost 
} from '../controllers/posts.js'

const router = new express.Router()

router.get('/', getAllPosts)

router.get('/me/all', auth, getAllPostsForUser)

router.get('/:id', getPost)

router.post('/', auth, createPost)

router.patch('/:id', auth, updatePost)

router.delete('/:id', auth, deletePost)

export default router