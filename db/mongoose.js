import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI

async function main() {
  await mongoose.connect(uri)
}

main().catch(function(error) {
  console.log('Mongoose Error:', error)
})

