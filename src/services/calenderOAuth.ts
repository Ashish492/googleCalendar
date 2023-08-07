import { google } from 'googleapis'
import config from 'config'
import { OAuthConfig } from '@types'
import { writeFile } from 'fs/promises'
import path from 'path'
const oAuthConfig = config.get<OAuthConfig>('OAuth2')
// const calendarConfig = config.get<CalendarConfig>('calender')
export const oauth2Client = new google.auth.OAuth2(
  oAuthConfig.clientId,
  oAuthConfig.clientSecret,
  oAuthConfig.redirectUrl
)
export const OauthCalender = google.calendar({
  version: 'v3',
  auth: oAuthConfig.api_key,
})
oauth2Client.setCredentials({
  refresh_token: oAuthConfig.token.refresh_token,
  access_token: oAuthConfig.token.access_token,
})
oauth2Client.on('tokens', async (token) => {
  const configs = config.util.toObject()
  if (token.access_token) {
    configs.OAuth2.token.access_token = token.access_token
    await writeFile(path.resolve(__dirname, '../../', config.get('configFile')), JSON.stringify(configs))
  }
  if (token.refresh_token) {
    configs.OAuth2.token.refresh_token = token.refresh_token
    await writeFile(path.resolve(__dirname, '../../', config.get('configFile')), JSON.stringify(configs))
  }
  console.log('token updated')
})
