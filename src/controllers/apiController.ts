import { NextFunction, Request, RequestHandler, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'
import quicker from '../util/quicker'
import { RegisterRequestBodyType, UserResponseBodyType } from '../types/userTypes'
import { validateJoiSchema, validateRegisterBody } from '../service/validationService'
import dataBaseService from '../service/dataBaseService'
import { userRole } from '../constant/userContant'
import config from '../config/config'
import emailService from '../service/emailService'
import logger from '../util/logger'

// The extends keyword means RegisterRequestBodyType is creating a new interface based on the existing Request interface, but with additional or overridden properties
interface IRegisterRequestBodyType extends Request {
    body: RegisterRequestBodyType
}

const self: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        httpResponse(req, res, 200, responseMessage.SUCCESS, [])
    } catch (err) {
        httpError(next, err, req, 500)
    }
}

const health: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        const healthData = {
            application: quicker.getApplicationHealth(),
            system: quicker.getSystemHealth(),
            timeStamp: Date.now()
        }
        httpResponse(req, res, 200, responseMessage.SUCCESS, healthData)
    } catch (err) {
        httpError(next, err, req, 500)
    }
}

const register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req as IRegisterRequestBodyType
        // Body Validation
        const { error, value } = validateJoiSchema<RegisterRequestBodyType>(validateRegisterBody, body)

        if (error) {
            return httpError(next, error, req, 422)
        }

        // Phone no parsing and validation
        let { phoneNumber, emailAddress, password, name, consent } = value
        const { countryCode, internationalNumber, isoCode } = quicker.parsePhoneNumber('+' + phoneNumber)

        if (!countryCode || !internationalNumber || !isoCode) {
            return httpError(next, new Error(responseMessage.INVALID_PHONE_NUMBER), req, 422)
        }

        // TimeZone
        const timeZone = quicker.countryTimeZone(isoCode)
        if (!timeZone || timeZone.length === 0) {
            return httpError(next, new Error(responseMessage.INVALID_PHONE_NUMBER), req, 422)
        }

        console.log(timeZone, 'test')

        // check if the user already exist

        const user = await dataBaseService.findUserByEmailAddress(emailAddress)
        if (user) {
            return httpError(next, new Error(responseMessage.ALREADY_EXISTS('user', emailAddress)), req, 422)
        }
        // password encryption

        const encryptedPassword = await quicker.hashPassword(password)

        console.log(encryptedPassword, 'encryptedPassword')

        // Account confirmation data
        const token = quicker.generateRandomId()
        const code = quicker.generateOtp(6)

        const payload: UserResponseBodyType = {
            phoneNumber: {
                countryCode,
                isoCode,
                internationalNumber
            },
            emailAddress,
            accountConfirmation: {
                status: false,
                token,
                code,
                // this is null bcs we want it went we confirm the email
                timestamp: null
            },
            // this will update when we request for password reset
            passwordReset: {
                token: null,
                expiry: null,
                lastResetAt: null
            },
            lastLoginAt: null,
            role: userRole.USER,
            timeZone: timeZone[0].name,
            password: encryptedPassword,
            name,
            consent
        }

        // Creating user
        const newUser = await dataBaseService.registerUser(payload)

        // Send email
        const confirmationUrl= `${config.FRONTEND_URL}/confirmation/${token}?code=${code}`
        const to= `${emailAddress}`
        const subject=`Confirm Your Account`
        const text=`Hey ${name}, Please confirm your account by clicking on the link given below\n\n${confirmationUrl}`

        emailService.sendEmail(to,subject,text).catch((err)=>{
            logger.error("EMAIL_SERVICE",{
                meta:err
            })
        })
        httpResponse(req, res, 201, responseMessage.SUCCESS, {_id:newUser._id})
    } catch (err) {
        httpError(next, err, req, 500)
    }
}

export default {
    self,
    health,
    register
}

