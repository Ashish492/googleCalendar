import {} from '@types'
import { customRouteFunction, logger, runService } from '@utils'
import calendar from '@services/calender'
import { calendar_v3 } from 'googleapis'
import { OauthCalender, oauth2Client } from '@services/calenderOAuth'
export const getEvent = customRouteFunction((_req, res) => {
  return runService(async () => {
    const events = await calendar.events.list({
      calendarId: 'ec8gmvf3ndpra041bkq2agonao@group.calendar.google.com',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    })
    res.json({ events: events.data.items })
  })
})
export const getCalender = customRouteFunction((_req, res) => {
  return runService(async () => {
    console.log('inside function')
    const calendarList = await OauthCalender.calendarList.list({ auth: oauth2Client })
    logger.info(calendarList, 'cl')
    res.json({ item: calendarList.data.items })
  })
})
export const getCalenderById = customRouteFunction((_req, res) => {
  return runService(async () => {
    const calender = await calendar.calendars.get({
      calendarId: 'o7ahrks3hc9cq82e3gnkno8rdk@group.calendar.google.com',
    })
    res.json({ data: calender.data })
  })
})
export const insertEvent = customRouteFunction<calendar_v3.Params$Resource$Events$Insert>((req, res) =>
  runService(async () => {
    const event = await OauthCalender.events.insert({
      calendarId: 'primary',
      auth: oauth2Client,
      ...req.body,
    })
    res.json(event)
  })
)
export const insertCalender = customRouteFunction<calendar_v3.Params$Resource$Calendars$Insert>((req, res) =>
  runService(async () => {
    const event = await OauthCalender.calendars.insert({
      auth: oauth2Client,
      requestBody: {
        summary: 'testing calender-new123',
        description: 'new tested calender',
        timeZone: 'Asia/Kathmandu', // Replace with your desired time zone
      },
    })
    res.json(event)
  })
)
export const giveAccess = customRouteFunction<calendar_v3.Params$Resource$Calendars$Insert>((req, res) =>
  runService(async () => {
    const event = await calendar.acl.insert({
      calendarId: 'o7ahrks3hc9cq82e3gnkno8rdk@group.calendar.google.com',
      requestBody: {
        scope: {
          type: 'user',
          value: 'aleenshrestha492@gmail.com',
        },
        role: 'owner',
      },
    })
    res.json(event)
  })
)
