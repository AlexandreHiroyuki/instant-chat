import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { v4 as uuid } from 'uuid'

dotenv.config({
  path: '.env'
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
  [key: string]: {
    users: { [key: string]: string }
    messages: {
      nickname: string
      message: string
      timestamp: number
    }[]
  }
} = {}

app.get('/has-room', (req: Request, res: Response) => {
  console.log(req.query.code, rooms.hasOwnProperty(String(req.query.code)))
  res.send(rooms.hasOwnProperty(String(req.query.code)))
})

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: allowedOrigins
  },
  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 1 * 60 * 1000,
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: true
  }
})

io.on('connection', (socket) => {
  console.log('[on connection]', socket.id, socket.connected)
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
      console.log(
        '[on create]',
        nickname,
        rooms[roomCode].users,
        socketRoomCode
      )
    }
  })

  socket.on('join', (roomCode, user) => {
    while (rooms[roomCode] === undefined) {}
    if (rooms[roomCode].users.hasOwnProperty(user.nickname)) {
      // if (rooms[roomCode].users[user.nickname] === user.password) {
      //   socket.join(roomCode)
      //   socket.emit('joined', Object.keys(rooms[roomCode].users))
      //   rooms[roomCode].users[user.nickname] = user.password
      //   nickname = user.nickname
      //   socketRoomCode = roomCode
      //   socket.to(roomCode).emit('other-joined', user.nickname)
      // } else {
      //   socket.emit('invalid')
      // }
      socket.emit('invalid')
    } else {
      // if user does not exist
      socket.join(roomCode)
      socket.emit('joined', Object.keys(rooms[roomCode].users))

      rooms[roomCode].users[user.nickname] = user.password
      nickname = user.nickname
      socketRoomCode = roomCode

      socket.to(roomCode).emit('other-joined', user.nickname)
    }

    console.log('[on join]', nickname, rooms[roomCode].users, socketRoomCode)
  })

  socket.on('send-message', (message) => {
    console.log('[on send-message]', message, nickname, socketRoomCode)
    if (rooms.hasOwnProperty(socketRoomCode)) {
      let buildMessage = {
        nickname: nickname,
        message: message,
        timestamp: new Date().getTime()
      }
      rooms[socketRoomCode].messages.push(buildMessage)
      socket.to(socketRoomCode).emit('receive-message', buildMessage)
    }
  })

  socket.on('disconnect', () => {
    console.log('[on disconnect]', nickname, socketRoomCode)
    if (rooms.hasOwnProperty(socketRoomCode)) {
      delete rooms[socketRoomCode].users[nickname]
      if (
        Object.keys(rooms[socketRoomCode].users).length === 0 &&
        rooms[socketRoomCode].users.constructor === Object
      ) {
        delete rooms[socketRoomCode]
      }
      console.log(rooms)
      socket.to(socketRoomCode).emit('other-disconnected', nickname)
      socket.leave(socketRoomCode)
    }
  })
})

server.listen(port, () => {
  console.log(`Running at localhost:${port}`)
})
