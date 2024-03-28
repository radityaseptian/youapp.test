import mongoose from '../mongodb.js'

const model = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: [6, 'Username too short'] },
  password: { type: String, required: true },
  name: { type: String, default: null },
  bio: {
    type: String,
    minlength: [1, 'Bio too short'],
    maxlength: [100, 'Bio too long'],
    default: "Hi there, I'm using YouApp",
  },
  avatar: {
    type: String,
    default: 'https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png',
  },
  lastSeen: { type: Number, default: Date.now },
  chats: { type: Array, default: [] },
  blocks: { type: Array, default: [] },
})

model.index({ username: 1 })

export const User = mongoose.model('user', model)
