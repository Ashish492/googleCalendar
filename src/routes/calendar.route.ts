import { getCalender, getEvent, insertEvent } from '@controllers'
import { giveAccess, insertCalender } from '@controllers/GoogleCalenderController'
import { Router } from 'express'
const router = Router()
// router.route('/:id').get(getCalenderById)
router.route('/event').get(getEvent).post(insertEvent)
router.route('/list').get(getCalender)
router.route('/').post(insertCalender)
router.route('/acl').post(giveAccess)
export default router
