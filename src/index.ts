import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import { router } from './routes'

const app = express()
const PORT = process.env.PORT || 8000

app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(router)

app.listen(PORT, () => console.log('Server is running on port: ' + PORT))
