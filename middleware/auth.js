import jwt from 'jsonwebtoken'
import User from '../models/user.js'

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // slightly unnecessary step here - as long as there's a valid token then 
    // user must either be sighned up or signed in and have a valid id
    // BUT we can easily update this to accompany multiple token storage to 
    // allow for user to be signed in across multiple devices
    const currentUser = await User.findById(decoded._id)

    if (!currentUser) {
      throw new Error()
    }

    req.userId = decoded?._id
    next()
  } catch (error) {
    res.status(401).send({ error: error.message })
  }
}

export default auth