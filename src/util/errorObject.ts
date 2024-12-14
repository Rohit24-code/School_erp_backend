import { Request } from 'express'
import responseMessage from '../constant/responseMessage'
import { ThttpsError } from '../types/types'
import config from '../config/config'
import { EApplicationEnviroment } from '../constant/application'

export default (err: unknown, req: Request, errorStatusCode: number = 500): ThttpsError => {
    const errorObj: ThttpsError = {
        success: false,
        statusCode: errorStatusCode,
        message: err instanceof Error ? err.message : responseMessage?.SOMETHING_WENT_WRONG || 'An unexpected error occurred',
        request: {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl
        },
        data: null,
        trace: err instanceof Error ? { err: err.stack } : null
    }

    //production condition
    if (config.ENV === EApplicationEnviroment.PRODUCTION) {
        delete errorObj.request.ip
        delete errorObj.trace
    }

    // eslint-disable-next-line no-console
    console.dir(
        {
            meta: {
                errorObj
            }
        },
        { depth: null }
    )

    return errorObj
}
