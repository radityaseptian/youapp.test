import { User } from '../databases/models/index.js'
import jwt from 'jsonwebtoken'
import { hash, compare } from 'bcrypt'
import 'dotenv/config'

async function login(req, res) {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(404).json({ success: false, message: 'invalid username.' })
    }

    const validate = await compare(password, user.password ?? '')
    if (!validate) return res.status(400).json({ success: false, message: 'Password not match!' })

    const token = jwt.sign({ username }, process.env.KEY, { expiresIn: '3d' })

    res.json({ success: true, token })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

async function register(req, res) {
  const { username, name, password } = req.body
  try {
    if (password.length < 8) {
      return res.json({ success: false, message: 'Password too short' })
    }

    const user = await User.findOne({ username })
    if (user) return res.json({ success: false, message: 'Username already used!' })

    const newPassword = await hash(password, 10)
    await new User({ username, name, password: newPassword }).save()

    res.json({ success: true, message: 'Successfuly create user' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

async function getProfile(req, res) {
  try {
    const user = req.user.toObject()
    delete user.chats
    delete user.blocks
    delete user.password
    res.json({ success: true, data: user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

async function searchUser(req, res) {
  try {
    const { query } = req.query

    if (!query || query?.length <= 3) {
      return res
        .status(400)
        .json({ success: false, message: 'Query params bust be string and length more than 3' })
    }

    const user = req.user

    const users = await User.find(
      { username: { $regex: query, $options: 'i' } },
      { password: 0, blocks: 0, chats: 0 },
      { limit: 10 }
    )

    res.json({ success: true, data: users })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

async function updateBlockUnblock(req, res) {
  try {
    const { username, block } = req.body

    if (typeof block !== 'boolean') {
      return res.status(400).json({ success: false, message: 'Field block must be boolean' })
    }

    const user = req.user
    const update = block ? { $addToSet: { blocks: username } } : { $pull: { blocks: username } }

    const result = await User.findOneAndUpdate({ username: user.username }, update, {
      new: true,
      projection: { blocks: 1 },
    })

    res.json({ success: true, data: result })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

async function updateProfile(req, res) {
  const { name, avatar, bio } = req.body
  try {
    const user = req.user

    const newUser = await User.findOneAndUpdate(
      { username: user.username },
      { $set: { name, avatar, bio } },
      { new: true, projection: { password: 0, blocks: 0, chats: 0 } }
    )

    res.json({ success: true, data: newUser })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export { login, register, getProfile, searchUser, updateBlockUnblock, updateProfile }
