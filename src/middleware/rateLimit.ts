import { NextFunction, Request, Response } from "express";

import { rateLimiterMongo } from "../config/rateLimiter";
import httpError from "../util/httpError";
import responseMessage from "../constant/responseMessage";
import config from "../config/config";
import { EApplicationEnviroment } from "../constant/application";

export default (req:Request,_:Response,next:NextFunction)=>{
    if(config.ENV===EApplicationEnviroment.DEVELOPMENT){
       return next()
    }

    if(rateLimiterMongo){
        rateLimiterMongo?.consume(req.ip as string,1).then(()=>{
            return next()
        }).catch(()=>{
            httpError(next,new Error(responseMessage.TOO_MANY_REQUESTS),req,429)
        })
    }
}