import mongoose from 'mongoose'
import { FeesHeadType } from '../types/feesHeadTypes'

let feesHeadSchema = new mongoose.Schema<FeesHeadType>({
    feesHeading: {type:String,unique:true,required:true},
    groupName:{   type: mongoose.Schema.Types.ObjectId,
                ref: "group", 
                required:true,},
    accountName:{
           type: mongoose.Schema.Types.ObjectId,
                    ref: "account", 
                    required:true,
    },
    frequency:{type:String,required:true},
    selectMonth:{type:[Number],required:true},
})

let feesHeadModal = mongoose.model<FeesHeadType>('feesHead', feesHeadSchema)

export default feesHeadModal
