import { Request, Response } from 'express'
import { ThttpsResponse } from '../types/types'
import config from '../config/config'
import { EApplicationEnviroment } from '../constant/application'

export default (req: Request, _: Response, resStatusCode: number, resMessage: string, data?: unknown, count?: number) => {
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
    // eslint-disable-next-line no-console
    console.info('CONTROLLER_RESPONSE', {
        meta: response
    })

    //Delete for production
    if (config.ENV === EApplicationEnviroment.PRODUCTION) {
        delete response.request.ip
    }

    return response
}
