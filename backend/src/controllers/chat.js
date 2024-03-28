import { Chat, User } from '../databases/models/index.js'
import { getIo } from '../socket.js'

async function getMessages(req, res) {
  try {
    const { chats } = req.user

    const messages = await Chat.find({ chatId: { $in: chats } })

    res.json({ success: true, data: messages })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

async function sendMessage(req, res) {
  try {
    const { username, message, image } = req.body

    const user = req.user

    if (user.username === username) {
      return res.status(404).json({ success: false, message: "Can't send messages to self" })
    }

    const target = await User.findOne({ username })

    if (!target) {
      return res.status(404).json({ success: false, message: 'User not exist' })
    }

    if (target.chats.includes(user.username) || user.blocks.includes(username)) {
      return res.status(404).json({ success: false, message: 'User is Blocked' })
    }

    if (!message && !image) {
      return res
        .status(400)
        .json({ success: false, message: 'Field message or image cannot be empty!' })
    }

    let chatId =
      user.chats.find((chat) => chat.split('-').some((id) => id === username)) ||
      target.chats.find((chat) => chat.split('-').some((id) => id === user.username))

    const now = Date.now()
    const payload = { username: user.username, message, image, sendAt: now }

    const io = getIo()

    if (!chatId) {
      chatId = `${user.username}-${username}`

      await User.updateMany(
        { username: { $in: [username, user.username] } },
        { $addToSet: { chats: chatId } }
      )

      await new Chat({ chatId, messages: payload }).save()
    } else {
      await Chat.updateOne({ chatId }, { $push: { messages: payload }, updatedAt: now })
    }

    io.to(chatId).emit('chat:message', { [chatId]: payload })

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export { sendMessage, getMessages }
