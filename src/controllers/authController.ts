import { NextFunction, Request, RequestHandler, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'
import quicker from '../util/quicker'
import { LoginRequestBodyType, RegisterRequestBodyType, UserResponseBodyType } from '../types/userTypes'
import { validateJoiSchema, validateLoginBody, validateRegisterBody } from '../service/validationService'
import dataBaseService from '../service/userService'
import config from '../config/config'
import emailService from '../service/emailService'
import logger from '../util/logger'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import getUserEmails from '../constant/emails'

dayjs.extend(utc)

// The extends keyword means RegisterRequestBodyType is creating a new interface based on the existing Request interface, but with additional or overridden properties
interface IRegisterRequestBodyType extends Request {
    body: RegisterRequestBodyType
}

interface IAuthenticateRequest extends Request {
    authenticatedUser: UserResponseBodyType
}

interface ILoginRequestBodyType extends Request {
    body: LoginRequestBodyType
}

interface IConfirmRequestBodyType extends Request {
    params: {
        token: string
    }
    query: {
        code: string
    }
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
        const { phoneNumber, emailAddress, password, name, consent , address,
            role,
            adharCard,
            city,
            area,
            state,
            contactPerson,
            contactPersonEmail,
            birthday,
            anniversary,
            bankAccountNo,
            bankName,
            ifscCode,
            branch} = value
        const { countryCode, internationalNumber, isoCode } = quicker.parsePhoneNumber('+' + phoneNumber)

        if (!countryCode || !internationalNumber || !isoCode) {
            return httpError(next, new Error(responseMessage.INVALID_PHONE_NUMBER), req, 422)
        }

        // TimeZone
        const timeZone = quicker.countryTimeZone(isoCode)
        if (!timeZone || timeZone?.length === 0) {
            return httpError(next, new Error(responseMessage.INVALID_PHONE_NUMBER), req, 422)
        }

        // check if the user already exist

        const user = await dataBaseService.findUserByEmailAddress(emailAddress)
        if (user) {
            return httpError(next, new Error(responseMessage.ALREADY_EXISTS('user', emailAddress)), req, 422)
        }
        // password encryption

        const encryptedPassword = await quicker.hashPassword(password)

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
            timeZone: timeZone[0].name,
            password: encryptedPassword,
            name,
            consent,
            address,
            role,
            adharCard,
            city,
            area,
            state,
            contactPerson,
            contactPersonEmail,
            birthday,
            anniversary,
            bankAccountNo,
            bankName,
            ifscCode,
            branch
        }

        // Creating user
        const newUser = await dataBaseService.registerUser(payload)

        // Send email
        const confirmationUrl = `${config.FRONTEND_URL}/confirmation/${token}?code=${code}`
        const to = `${emailAddress}`
        const subject = `Confirm Your Account`
        const text = `Hey ${name}, Please confirm your account by clicking on the link given below\n\n${confirmationUrl}`
        const html = getUserEmails(name, 'verification', confirmationUrl)
        emailService.sendEmail(to, subject, text, html).catch((err) => {
            logger.error('EMAIL_SERVICE', {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                meta: err
            })
        })
        httpResponse(req, res, 201, responseMessage.USER_REGISTERED_SUCCESS, { _id: newUser._id })
    } catch (err) {
        httpError(next, err, req, 500)
    }
}

const confirmation: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { params, query } = req as IConfirmRequestBodyType

        const { token } = params
        const { code } = query

        // TODO

        // Fetch user by token And Code
        const user = await dataBaseService.findUserByConfimationTokenAndCode(token, code)
        if (!user) {
            return httpError(next, new Error(responseMessage.INVALID_ACCOUNT_CONFIRMATION_TOKEN_OR_CODE), req, 400)
        }

        // Check if Account already confirmed
        if (user?.accountConfirmation?.status) {
            return httpError(next, new Error(responseMessage.ACCOUNT_ALREADY_CONFIRMED), req, 400)
        }

        // Account Confirm

        user.accountConfirmation.status = true
        user.accountConfirmation.timestamp = dayjs().utc().toDate()
        await user.save()

        const to = `${user.emailAddress}`
        const subject = `Account Confirmed`
        const text = `Your Account has been confirmed , if you have any query please let us know`
        const html = getUserEmails(user.name, 'confirmation')
        emailService.sendEmail(to, subject, text, html).catch((err) => {
            logger.error('EMAIL_SERVICE', {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                meta: err
            })
        })
        httpResponse(req, res, 200, responseMessage.USER_AUTHENTICATION_SUCCESS, [])
    } catch (err) {
        httpError(next, err, req, 500)
    }
}


const login:RequestHandler = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        // TODO

        // validate and parse body
        const {body}=req as ILoginRequestBodyType

        const {value,error}=validateJoiSchema<LoginRequestBodyType>(validateLoginBody,body)
         
        if (error) {
            return httpError(next, error, req, 422)
        }

        const {emailAddress,password}=value
        // find user
        const user = await dataBaseService.findUserByEmailAddress(emailAddress,"+password")

        if (!user) {
            return httpError(next, new Error(responseMessage.NOT_FOUND("User")), req, 404)
        }
        // validate password
         const isValidate= await quicker.comparePassword(password,user.password)
         if(!isValidate){
            return httpError(next,new Error(responseMessage.INVALID_USERNAME_OR_PASSWORD),req,400)
         }
        // access token 
         const accessToken=quicker.generateToken({
            userId:user.id},
            config.ACCESS_TOKEN.ACCESS_TOKEN_SECRET as string,
            config.ACCESS_TOKEN.EXPIRY
         )

        // last login information
        user.lastLoginAt=dayjs().utc().toDate()
        await user.save()

        httpResponse(req, res, 200, responseMessage.SUCCESS, {
            accessToken,
            type:user.role
        })
    } catch (err) {
        httpError(next, err, req, 500)
    }
}

const selfIdentification: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
     const {authenticatedUser}=req as IAuthenticateRequest
    try {
        httpResponse(req, res, 200, responseMessage.SUCCESS, authenticatedUser)
    } catch (err) {
        httpError(next, err, req, 500)
    }
}

const getAllUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const {limit,offset,sortBy,sortOrder}=req.query
    const numericLimit = typeof limit === 'string' ? Number(limit) : 0; // Default to 0  
    const numericOffset = typeof offset === 'string' ? Number(offset) : 0;
    const stringSortBy= typeof sortBy === 'string' ? sortBy : undefined;
    const stringSortOrder =  (sortOrder === 'asc' || sortOrder === 'desc') ? sortOrder : 'asc';

   try {
       const {data,count} = await dataBaseService.findAllUser(numericOffset,numericLimit,stringSortBy,stringSortOrder)
       httpResponse(req, res, 200, responseMessage.SUCCESS, data,count)
   } catch (err) {
       httpError(next, err, req, 500)
   }
}

export default {
    self,
    health,
    register,
    confirmation,
    login,
    selfIdentification,
    getAllUser
}
