import mongoose from "mongoose";
import { UserResponseBodyType } from "../types/userTypes";
import { userRole } from "../constant/userContant";

const userSchema = new mongoose.Schema<UserResponseBodyType>({
   name:{
    type:String,
    minlength:2,
    maxlength:72,
    required: true
   },
   emailAddress:{
    type:String,
    required:true,
    unique:true
   },
   phoneNumber:{
    // in mongo whenever we make object it make _id as default we are doing this false to not make this
    _id:false,
    isoCode:{
        type:String,
        required:true
    },
    countryCode:{
        type:String,
        required:true
    },
    internationalNumber:{
        type:String,
        required:true
    }
   },
   timeZone:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true,
    // which fetching data we will not have password in the data 
    select:false
   },
   role:{
    type:String,
    default:userRole.USER,
    enum:userRole,
    required:true
   },
   accountConfirmation:{
    _id:false,
    status:{
        type:Boolean,
        default:true,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:null
    }
   },
   passwordReset:{
    _id:false,
    token:{
        type:String,
        default:null
    },
    expiry:{
        type:Number,
        default:null
    },
    lastResetAt:{
        type:Date,
        default:null
    },
   },
   lastLoginAt:{
    type:Date,
    default:null
   },
   consent:{
    type:Boolean,
    required:true
   }
},{timestamps:true})

export default mongoose.model("user",userSchema)