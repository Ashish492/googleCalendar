import { CalendarConfig } from '@types'
import config from 'config'
import { google } from 'googleapis'
// import path from 'path'
import * as key from '../../config/credential1.json'
const calendarConfig: CalendarConfig = config.get('calender')
// const jwtClient = new google.auth.JWT(
//   calendarConfig.client_email,
//   undefined,
//   calendarConfig.private_key,
//   calendarConfig.scopes
// )
// const oauth2 = new google.auth.OAuth2()
// const jwtClient = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_PRIVATE_KEY)
// const calendarConfigPath = path.resolve(__dirname, '../', config.get('calendarConfig'))
export const auth = new google.auth.GoogleAuth({
  credentials: key,
  scopes: calendarConfig.scopes,
})
const calendar = google.calendar({
  version: 'v3',
  auth,
})
// exports.getCalender = async () => {
//   const gt = new google.auth.GoogleAuth({ scopes: ['https://www.googleapis.com/auth/calendar'] })
//   const authClient = await gt.getClient()
//   google.options({ auth: authClient })
// }
export default calendar
