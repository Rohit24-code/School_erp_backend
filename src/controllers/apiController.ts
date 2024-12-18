import {  NextFunction, Request, RequestHandler, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'
import quicker from '../util/quicker'


const self: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        httpResponse(req, res, 200, responseMessage.SUCCESS, [])
    } catch (err) {
        httpError(next, err, req, 500)
    }
}


const health: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        const healthData={
         application: quicker.getApplicationHealth(),
         system: quicker.getSystemHealth(),
         timeStamp: Date.now()
        }
        httpResponse(req, res, 200, responseMessage.SUCCESS, healthData)
    } catch (err) {
        httpError(next, err, req, 500)
    }
}


export default {
    self,
    health
}
