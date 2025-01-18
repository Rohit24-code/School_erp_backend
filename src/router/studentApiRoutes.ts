import { Router } from 'express'
import studentController from '../controllers/studentController'
import authenication from '../middleware/authenication'


const studentRouter = Router()

studentRouter.route("/add-student").post(authenication,studentController.createStudent)
studentRouter.route("/update-student/:id").patch(authenication,studentController.updateStudent)
studentRouter.route("/get-students").get(authenication,studentController.getAllStudent)
studentRouter.route("/get-student/:id").get(authenication,studentController.getSingleStudentDetail)
studentRouter.route("/delete-student/:id").delete(authenication,studentController.deleteStudent)




export default studentRouter