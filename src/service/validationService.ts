import joi from "joi";
import { LoginRequestBodyType, RegisterRequestBodyType } from "../types/userTypes";

export const validateRegisterBody=joi.object<RegisterRequestBodyType>({
    name:joi.string().min(2).max(72).trim().required(),
    emailAddress:joi.string().email().required(),
   phoneNumber:joi.string().min(4).max(20).required(),
   password:joi.string().min(8).max(24).required(),
   consent:joi.boolean().valid(true).required(),
   address:joi.string().optional(),
   adharCard:joi.string().optional(),
   city:joi.string().optional(),
   area:joi.string().optional(),
   state:joi.string().optional(),
   contactPerson:joi.string().optional(),
   contactPersonEmail:joi.string().optional(),
   birthday:joi.string().optional(),
   anniversary:joi.string().optional(),
   bankAccountNo:joi.number().optional(),
   bankName:joi.string().optional(),
   ifscCode:joi.string().optional(),
   branch:joi.string().optional(),
   role:joi.string().optional(),
})

export const validateLoginBody=joi.object<LoginRequestBodyType>({
  emailAddress:joi.string().email().required(),
  password:joi.string().min(8).max(24).required()
})

export const validateJoiSchema=<T>(schema:joi.Schema,value:unknown)=>{
  const result = schema.validate(value)

  return {
    value: result.value as T,
    error:result.error
  }
}