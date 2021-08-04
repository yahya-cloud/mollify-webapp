import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'
import { Server } from 'socket.io'
import { socketEvents } from './socket/socket.js'
import dotenv from 'dotenv'
import http from 'http'
import morgan from 'morgan'
import authRoutes from './routes/auth.js'
import patientRoutes from './routes/patient.js'
import doctorRoutes from './routes/doctor.js'
import commonRoutes from './routes/common.js'
import conversationRoutes from './routes/conversation.js'
import messageRoutes from './routes/message.js'

const app = express()
const PORT = process.env.PORT || 5000
const server = http.Server(app)

const io = new Server(server, {
  cors: { origin: 'https://mollify-webapp.herokuapp.com' },
})
socketEvents(io)
dotenv.config()

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

if (process.env.NODE_ENV) {
  app.use(morgan('dev'))
}

//routes
app.use('/api/auth', authRoutes)
app.use('/api/patient', patientRoutes)
app.use('/api/doctor', doctorRoutes)
app.use('/api/conversation', conversationRoutes)
app.use('/api/message', messageRoutes)
app.use('/api', commonRoutes)

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('Api is running')
  })
}

//CONNECTION URL FROM MONGOOSE
const CONNECTION_URL = process.env.CONNECTION_URL

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    server.listen(PORT, () => console.log('server running on port ' + PORT))
  )
  .catch((err) => console.log(err))

mongoose.set('useFindAndModify', false)
