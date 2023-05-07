import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'

interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
}

interface ClientToServerEvents {
  hello: () => void
}

interface InterServerEvents {
  ping: () => void
}

interface SocketData {
  name: string
  age: number
}

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

io.on('connection', (socket) => {
  console.log(socket)
})

server.listen(port, () => {
  console.log(`Running at localhost:${port}`)
})
