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

// *** add in .JSON method to delete password AND picture from being passed back to user ***

const User = mongoose.model('User', userSchema)

export default User
