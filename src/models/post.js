import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    type: [String],
    default: []
  },
  likes: {
    type: [String],
    default: []
  },
  author_name: {
    type: String,
    required: true
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  } 
},
{
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export default Post