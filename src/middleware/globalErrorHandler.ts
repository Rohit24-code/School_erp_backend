/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { ThttpsError } from '../types/types'

export default (err: ThttpsError, _: Request, res: Response, _nextFunction: NextFunction) => {
    res.status(err.statusCode).json(err)
}
