import mongoose from '../mongodb.js'

const model = new mongoose.Schema({
  chatId: { type: String, required: true, unique: true },
  messages: { type: Array, default: [] },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
})

model.index({ chatId: 1 })

export const Chat = mongoose.model('Chat', model)
