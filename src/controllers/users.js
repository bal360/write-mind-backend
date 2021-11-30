import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sharp from 'sharp'
import User from '../models/user.js'

// == SIGNUP (CREATE USER) ==
export async function signUp(req, res) {
  const { firstName, lastName, email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).send({ message: 'Email already in use'})
    }

    const hashedPassword = await bcrypt.hash(password, 8)
    const newUser = await User.create({ 
      name: `${firstName} ${lastName}`, 
      email, 
      password: hashedPassword 
    })
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '3hr' })
    
    res.status(201).send({ result: newUser, token })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

// == SIGNIN ==
export async function signIn(req, res) {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).send({ error: 'Email not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '3hr' })
    res.send({ result: user, token })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

// == GET USER (PERSONAL PROFILE) ==
export async function getUser(req, res) {
  res.send(req.user)
}

// == POST (upload picture) ==
export async function uploadProfilePicture(req, res) {
  try {
    const buffer = await sharp(req.file.buffer)
      .png()
      .resize(300)
      .rotate()
      .toBuffer()
    req.user.picture = buffer
    await req.user.save()
    res.send()
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
}