import { userRole } from "../constant/userContant"

export interface RegisterRequestBodyType{
    name:string,
    emailAddress:string,
    phoneNumber:string,
    password:string,
    consent:boolean
}

export interface LoginRequestBodyType{
    emailAddress:string,
    password:string
}

export interface UserResponseBodyType{
    name:string
    emailAddress:string
    phoneNumber:{
        isoCode:string
        countryCode:string
        internationalNumber:string
    }
    timeZone:string
    password:string
    role:userRole
    accountConfirmation:{
        status:boolean
        token:string
        code:string
        timestamp: Date | null
    }
    passwordReset:{
        token:string | null
        expiry:number |null
        lastResetAt:Date | null
    }
    lastLoginAt:Date|null
    consent:boolean
}