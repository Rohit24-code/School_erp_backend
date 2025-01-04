import { Router } from 'express'
import apiController from '../controllers/apiController'
// import rateLimit from '../middleware/rateLimit'

const router = Router()

//this will apply on all apis if we want on single one we can use it as middlware
// router.use(rateLimit)

router.route('/self').get(apiController.self)
router.route('/register').post(apiController.register)
router.route('/health').get(apiController.health)
router.route('/confirmation/:token').put(apiController.confirmation)

export default router
