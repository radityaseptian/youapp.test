import { Router } from 'express'
import * as user from '../controllers/user.js'
import * as chat from '../controllers/chat.js'
import { isTokenProvided } from '../middlewares/auth.js'

const router = Router()

router.post('/login', user.login)
router.post('/register', user.register)

router.get('/getProfile', isTokenProvided, user.getProfile)
router.put('/updateProfile', isTokenProvided, user.updateProfile)
router.get('/search', isTokenProvided, user.searchUser)
router.put('/block', isTokenProvided, user.updateBlockUnblock)

router.get('/viewMessages', isTokenProvided, chat.getMessages)
router.post('/sendMessage', isTokenProvided, chat.sendMessage)

export default router
