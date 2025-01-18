import { Router } from "express";
import authenication from "../middleware/authenication";
import sectionController from "../controllers/sectionController";

export const  sectionRouter=Router()

sectionRouter.route("/create").post(authenication,sectionController.createSection)
sectionRouter.route("/update/:id").post(authenication,sectionController.updateSection)
sectionRouter.route("/get").get(authenication,sectionController.getSection)
sectionRouter.route("/delete").post(authenication,sectionController.deleteSection)

