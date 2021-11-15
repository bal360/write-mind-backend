import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import('./db/mongoose.js')
import postRouter from './routes/posts.js'
import userRouter from './routes/users.js'
import commentRouter from './routes/comments.js'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ extended: false }))
app.use('/posts', postRouter)
app.use('/user', userRouter)
app.use(commentRouter)

app.listen(port, function(err) {
  console.log(`Listening on port ${port}...`)
})