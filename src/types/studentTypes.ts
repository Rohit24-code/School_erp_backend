import { userRole } from "../constant/userContant"

export type RegisterStudentBodyType={
 name:string
 address:string
 dob:string
 city:string
 mobile:string
 whatsappNo?:string
 gender:string
 fatherName:string
 fatherMobile?:string
 fatherEducationQualification?:string
 fatherOccupation?:string
 fatherDob?:string
 motherName:string
 motherMobile?:string
 motherEducationQualification?:string
 motherOccupation?:string
 motherDob?:string
 aadharCardNo:Number
 fatherAadharCardNo:Number
 motherAadharCardNo:Number
 role:userRole
}

