import { userRole } from "../constant/userContant"

export interface AllUserResponseBodyType{
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
    addharCardNo:string
    lastLoginAt:Date|null
    consent:boolean
}