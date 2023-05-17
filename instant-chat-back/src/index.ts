import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'

dotenv.config({
  path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod'
})

const port = process.env.PORT
const app: Express = express()

const allowedOrigins = [String(process.env.CLIENT_ORIGIN)]

const options: cors.CorsOptions = {
  origin: allowedOrigins
}

app.use(cors(options))
app.use(express.json())

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: allowedOrigins
  }
})

const rooms: { [key: string]: { users: string[]; messages: string[] } } = {}

io.on('connection', (socket) => {
  console.log(socket)
  let socketRoomCode: string

  socket.on('create', (user) => {
    const roomCode = String(Math.floor(Math.random() * 1000000))
    socket.join(roomCode)
    rooms[roomCode] = { users: [user], messages: [] }

    socketRoomCode = roomCode
    socket.to(roomCode).emit('created', roomCode)
  })
})

server.listen(port, () => {
  console.log(`Running at localhost:${port}`)
})
