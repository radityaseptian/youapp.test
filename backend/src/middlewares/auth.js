import { User } from '../databases/models/index.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const verifyToken = async (token) => {
  try {
    if (!token) return false
    const { username } = await jwt.verify(token, process.env.KEY)

    const user = await User.findOne({ username })
    return user ? user : false
  } catch (error) {
    return false
  }
}

async function isTokenProvided(req, res, next) {
  try {
    const user = await verifyToken(req.headers['x-token'])
    if (!user) return res.sendStatus(403)

    req.user = user
    next()
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export { isTokenProvided, verifyToken }
