import 'dotenv/config'
import { Server } from 'socket.io'
import { verifyToken } from './middlewares/auth.js'
import { User } from './databases/models/index.js'

let io

function initSocket(server) {
  io = new Server(server, { cors: { optionsSuccessStatus: 200 } })

  io.on('connection', async (socket) => {
    try {
      const { username, chats } = await verifyToken(socket.handshake.headers['x-token'])

      socket.userId = username
      socket.join(chats)

      await User.updateOne({ username }, { $set: { lastSeen: Date.now() } })
      socket.to(chats).emit('user:online', username)

      socket.on('user:join', (rooms) => {
        socket.join(rooms)
      })

      socket.on('user:typing', (chatId) => {
        if (!socket.userId) return
        socket.to(chatId).emit('user:typing', { userId: socket.userId, chatId })
      })

      socket.on('disconnecting', async () => {
        if (!socket.userId) return
        socket.to(chats).emit('user:offline', username)
      })
    } catch (error) {
      socket.disconnect(true)
    }
  })
}

const getIo = () => io

export { initSocket, getIo }
