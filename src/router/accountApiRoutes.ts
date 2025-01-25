import { Router } from "express";
import authenication from "../middleware/authenication";
import accountController from "../controllers/accountController";

export const  accountRouter=Router()

accountRouter.route("/create").post(authenication,accountController.createSection)
accountRouter.route("/update/:id").post(authenication,accountController.updateSection)
accountRouter.route("/get").get(authenication,accountController.getSection)
accountRouter.route("/delete").post(authenication,accountController.deleteSection)

