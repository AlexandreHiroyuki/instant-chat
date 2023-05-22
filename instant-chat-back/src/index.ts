import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { v4 as uuid } from 'uuid'

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

const rooms: {
  [key: string]: { users: { [key: string]: string }; messages: string[] }
} = {}

app.get('/has-room', (req: Request, res: Response) => {
  console.log(req.query.code, rooms.hasOwnProperty(String(req.query.code)))
  res.send(rooms.hasOwnProperty(String(req.query.code)))
})

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: allowedOrigins
  }
})

io.on('connection', (socket) => {
  console.log('on connection', socket.id, socket.connected)
  let socketRoomCode: string
  let nickname: string

  socket.on('create', (user) => {
    if (user.nickname) {
      const roomCode: string = uuid()
      socket.join(roomCode)
      rooms[roomCode] = {
        users: {
          [String(user.nickname)]: String(user.password ? user.password : '')
        },
        messages: []
      }

      nickname = user.nickname
      socketRoomCode = roomCode
      socket.emit('created', roomCode)
      console.log(nickname, socketRoomCode)
    }
  })

  socket.on('join', (roomCode, user) => {
    if (rooms[roomCode].users.hasOwnProperty(user.nickname)) {
      if (rooms[roomCode].users[user.nickname] === user.password) {
        // if user does not exist
        socket.join(roomCode)
        rooms[roomCode].users[user.nickname] = user.password

        nickname = user.nickname
        socketRoomCode = roomCode
        socket.to(roomCode).emit('joined', user.nickname)
      }
    }
  })
})

server.listen(port, () => {
  console.log(`Running at localhost:${port}`)
})
