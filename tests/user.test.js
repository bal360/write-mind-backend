import { jest } from '@jest/globals';
import mongoose from 'mongoose'
import request from 'supertest'
import app from '../src/app.js'
import User from '../src/models/user.js'

beforeEach(async () => {
  await User.deleteMany()
})
// const userOneId = new mongoose.Types.ObjectId()
// const userOne = {
//   firstName: 'Blake',
//   lastName: 'Long',
//   email:  'blake@email.com',
//   password: 'test123'
// }

test('Should create new user', async () => {
  const response = await request(app)
    .post('/user/signup')
    .send({
      firstName: 'Blake',
      lastName: 'Long',
      email:  'blake@email.com',
      password: 'test123'
    })
    .expect(201)

    // check that user is in db
    const user = await User.findById(response.body.result._id)
    expect(user).not.toBeNull()

    // check for matching properties
    expect(response.body).toMatchObject({
      result: {
        name: 'Blake Long',
        email:  'blake@email.com'
      } 
    })
    // confirm password is not stored in plain text
    expect(user.password).not.toBe('test123')
})