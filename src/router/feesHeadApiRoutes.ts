import { Router } from "express";
import authenication from "../middleware/authenication";
import feesHeadController from "../controllers/feesHeadController";

export const  feesHeadRouter=Router()

feesHeadRouter.route("/create").post(authenication,feesHeadController.createFeesHead)
feesHeadRouter.route("/update/:id").post(authenication,feesHeadController.updateFeesHead)
feesHeadRouter.route("/get").get(authenication,feesHeadController.getFeesHead)
feesHeadRouter.route("/delete").post(authenication,feesHeadController.deleteFeesHead)

