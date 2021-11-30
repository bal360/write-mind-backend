import Post from '../models/post.js'
import Comment from '../models/comment.js'

// == GET ALL ==
export async function getAllPosts(req, res) {
  try {
    const allPosts = await Post.find()
    res.send(allPosts)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
}

// == GET ALL FOR SIGNEDIN USER ==
export async function getAllPostsForUser(req, res) {
  try {
    const allUserPosts = await Post.find({ author_id: req.userId })  
    res.send(allUserPosts)
  } catch (error) {
    res.status(404).send({ error: error.message })
  }
} 

// == GET POST ==
export async function getPost(req, res) {
  try {
    const post = await Post.findOne({ _id: req.params.id })
    if (!post) {
      return res.status(404).send({ error: 'No post exists with that id' })
    }
    const comments = await Comment.find({ post_id: req.params.id })
    res.send({ post, comments })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

// == CREATE POST ==
export async function createPost(req, res) {
  const post = new Post({ ...req.body, author_id: req.userId })
  try {
    await post.save()
    res.status(201).send(post)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

// == UPDATE POST ==
export async function updatePost(req, res) {
  try {
    const post = await Post.findOneAndUpdate({ _id: req.params.id, author_id: req.userId }, req.body, { new: true })
    if (!post) {
      return res.status(404).send({ error: 'Request cannot be processed' })
    }
    // // CREATE COMMENT IF INCLUDED
    // if (req.body.comment) {
    //   await Comment.create({ comment: req.comment, post_id: post._id, commenter_id: req.userId})
    // }
    res.send(post)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

// == DELETE POST ==
export async function deletePost(req, res) {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, author_id: req.userId })
    if (!post) {
      return res.status(404).send({ error: 'Request cannot be processed' })
    }
    await Comment.deleteMany({ post_id: req.params.id })
    res.send(post)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}