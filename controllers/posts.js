import Post from '../models/post.js'

// == GET ALL ==
export async function getAllPosts(req, res) {
  try {
    const allPosts = await Post.find()
    res.send(allPosts)
  } catch (error) {
    res.status(404).send({error: error.message})
  }
}

// == CREATE POST ==
export async function createPost(req, res) {
  const post = new Post({ ...req.body, author_id: req.user._id})
  try {
    await post.save()
    res.status(201).send(post)
  } catch (error) {
    res.status(400).send({error: error.message})
  }
}