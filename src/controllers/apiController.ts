import { NextFunction, Request, RequestHandler, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'

const self: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        httpResponse(req, res, 200, responseMessage.SUCCESS, [])
    } catch (err) {
        httpError(next, err, req, 500)
    }
}

export default {
    self
}
