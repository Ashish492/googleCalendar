import {} from '@controllers/Oauth2.controller'
import { calendarRoute, oAuthRoute } from '@routes'
import { Application, NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
export default function routes(app: Application) {
  app.use('/greet', (_req, res: Response) => {
    res.send('hello from server')
  })
  app.use('/calender', calendarRoute)
  app.use('/google', oAuthRoute)
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound())
  })
}
