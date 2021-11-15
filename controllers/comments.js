import Comment from '../models/comment.js'


export async function createComment(req, res) {
  try {
    const comment = new Comment(req.body)
    await comment.save()
    res.status(201).send(comment)
  } catch (error) {
    res.status(400).send({error: error.message})
  }
}