import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import postRouter from './routes/posts.js'
import userRouter from './routes/users.js'
import commentRouter from './routes/comments.js'
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: 'test.env' })
} else {
  dotenv.config()
}
import('./db/mongoose.js')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ extended: false }))
app.use('/posts', postRouter)
app.use('/user', userRouter)
app.use(commentRouter)

export default app