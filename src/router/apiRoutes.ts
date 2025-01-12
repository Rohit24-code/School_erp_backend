import { Router } from 'express'
import apiController from '../controllers/apiController'
import authenication from '../middleware/authenication'
// import rateLimit from '../middleware/rateLimit'

const router = Router()

//this will apply on all apis if we want on single one we can use it as middlware
// router.use(rateLimit)

router.route('/self').get(apiController.self)
router.route('/register').post(apiController.register)
router.route('/health').get(apiController.health)
router.route('/confirmation/:token').put(apiController.confirmation)
router.route("/login").post(apiController.login)
router.route("/self-identitfication").get(authenication,apiController.selfIdentification)

export default router
