import { NextFunction, Request, Response } from 'express'
import responseMessage from '../constant/responseMessage'
import quicker from '../util/quicker'
import config from '../config/config'
import dataBaseService from '../service/dataBaseService'
import { JwtPayload } from 'jsonwebtoken'
import { UserResponseBodyType } from '../types/userTypes'
import httpError from '../util/httpError'

interface IAuthenticateRequest extends Request {
    authenticatedUser: UserResponseBodyType
}

interface IJwtPayload extends JwtPayload {
    userId: string
}

export default async (request: Request, _res: Response, next: NextFunction) => {
    let req = request as IAuthenticateRequest

    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (token) {
            const { userId } = quicker.verifyToken(token as string, config.ACCESS_TOKEN.ACCESS_TOKEN_SECRET as string) as IJwtPayload

            const user = await dataBaseService.findUserById(userId)

            if (user) {
                req.authenticatedUser = user
                return next()
            }
        }
        httpError(next, responseMessage.USER_UNAUTHORIZED, req, 401)
    } catch (error) {
        httpError(next, error, request, 500)
    }
}
