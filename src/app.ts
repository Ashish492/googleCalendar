import express, { Application, ErrorRequestHandler } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { ZodError } from 'zod'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import routes from 'routes'
import path from 'path'
import config from 'config'
const app: Application = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.set('calenderConfig', path.resolve(__dirname, '../', config.get('calendarConfig')))
// app.use(initializePassport())
const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  console.log(err, 'err')
  if (err instanceof ZodError) {
    res.status(400)
    return res.json(err.issues)
  }
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send('Invalid token')
  }
  res.status(err?.statusCode ?? err?.code ?? 500)
  return res.json({
    success: false,
    message: err.message ?? 'failed',
  })
}
routes(app)
app.use(errorHandler)
export default app
