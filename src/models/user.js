import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  picture: {
    type: Buffer
  }
},
{
  timestamps: true
})

// removes password from user object before any calls to .send()
userSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  return userObject
}

const User = mongoose.model('User', userSchema)

export default User
