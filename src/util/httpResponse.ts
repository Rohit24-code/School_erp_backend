import { Request, Response } from 'express'
import { ThttpsResponse } from '../types/types'
import config from '../config/config'
import { EApplicationEnviroment } from '../constant/application'
import logger from './logger'

export default (req: Request, res: Response, resStatusCode: number, resMessage: string, data?: unknown, count?: number) => {
    const response: ThttpsResponse = {
        success: true,
        statusCode: resStatusCode,
        message: resMessage,
        data,
        ...(count && { count }),
        request: {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl
        }
    }

    //LOG

    logger.info('CONTROLLER_RESPONSE', {
        meta: response
    })

    //Delete for production
    if (config.ENV === EApplicationEnviroment.PRODUCTION) {
        delete response.request.ip
    }

   res.status(resStatusCode).json(response)
}
