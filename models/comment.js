import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post'
  },
  commenter_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
},
{
  timestamps: true
})

const Comment = mongoose.mondel('Comment', commentSchema)

export default Comment