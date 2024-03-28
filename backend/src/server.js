import express from 'express'
import cors from 'cors'
import router from './routers/index.js'
import { createServer } from 'http'
import { initSocket } from './socket.js'
import 'dotenv/config'

const port = process.env.PORT || 3001

const app = express()
const server = createServer(app)
initSocket(server)

app.use(cors({ optionsSuccessStatus: 200 }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)

server.listen(port, () => console.log('Running in port ' + port))
