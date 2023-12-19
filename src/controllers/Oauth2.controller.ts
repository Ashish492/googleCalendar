import { oauth2Client } from '@services/calenderOAuth'
import { CalendarConfig } from '@types'
import { customRouteFunction, runService } from '@utils'
import config from 'config'
export const redirect = customRouteFunction((req, res) =>
  runService(async () => {
    const token = await oauth2Client.getToken(req.query.code)
    oauth2Client.setCredentials(token.tokens)
    res.json(token)
  })
)
export const handleGoogle = customRouteFunction((_req, res) =>
  runService(async () => {
    console.log(config.get<CalendarConfig>('calender').scopes)
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: config.get<CalendarConfig>('calender').scopes,
    })
    res.redirect(url)
  })
)
