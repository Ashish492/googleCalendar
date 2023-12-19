import {} from '@types'
import { customRouteFunction, runService } from '@utils'
import calendar from '@services/calender'
import { calendar_v3 } from 'googleapis'
import { OauthCalender, OauthDrive, oauth2Client } from '@services/calenderOAuth'
import { CalenderInsertDto } from 'dto'
export const getEvent = customRouteFunction<unknown, { id: string }>((req, res) => {
  console.log(req.params, 'params')
  return runService(async () => {
    const events = await OauthCalender.events.list({
      auth: oauth2Client,
      calendarId: req.params.id ?? 'primary',
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    })
    console.error(events)
    res.json({ events: events.data })
  })
})
export const getCalender = customRouteFunction((_req, res) => {
  return runService(async () => {
    // const calendarList = await OauthCalender.calendarList.list({ auth: oauth2Client })
    const calendarList = await OauthDrive.files.list({
      auth: oauth2Client,
    })
    res.json(calendarList.data)
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
      calendarId: req.body.calendarId ?? 'primary',
      auth: oauth2Client,
      ...req.body,
    })
    res.json(event.data)
  })
)
export const insertCalender = customRouteFunction<CalenderInsertDto>((req, res) =>
  runService(async () => {
    console.log(req.body)
    const response = await OauthCalender.calendars.insert({
      auth: oauth2Client,
      requestBody: req.body,
    })
    res.json(response.data)
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
