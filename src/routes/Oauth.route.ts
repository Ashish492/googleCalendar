import { handleGoogle, redirect } from '@controllers/Oauth2.controller'
import { Router } from 'express'
const router = Router()
router.route('/').get(handleGoogle)
router.route('/redirect').get(redirect)
export default router
