import { Router } from 'express'
import authController from '../controllers/authController'
import authenication from '../middleware/authenication'
// import rateLimit from '../middleware/rateLimit'

const router = Router()

//this will apply on all apis if we want on single one we can use it as middlware
// router.use(rateLimit)

router.route('/self').get(authController.self)
router.route('/register').post(authController.register)
router.route('/health').get(authController.health)
router.route('/confirmation/:token').put(authController.confirmation)
router.route("/login").post(authController.login)
router.route("/self-identitfication").get(authenication,authController.selfIdentification)
router.route("/all-users").get(authenication,authController.getAllUser)

export default router
