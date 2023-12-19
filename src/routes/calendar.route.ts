import { getCalender, getEvent, insertEvent } from '@controllers'
import { giveAccess, insertCalender } from '@controllers/GoogleCalenderController'
import { bodyValidator } from '@middlewares'
import { CalenderSchema } from 'dto'
import { Router } from 'express'
const router = Router()
// router.route('/:id').get(getCalenderById)
router.route('/').post(bodyValidator(CalenderSchema), insertCalender)
router.get('/event/:id', getEvent)
router.post('/event', insertEvent)
router.route('/list').get(getCalender)
router.route('/acl').post(giveAccess)
export default router
