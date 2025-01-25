import mongoose from "mongoose";

const accountSchema= new mongoose.Schema({
    accountName:{
        type:String,
        required:true,
        unique:true
    },
    printName:{
        type:String,
        required:true
    },
    group:{   type: mongoose.Schema.Types.ObjectId,
                    ref: "group", 
                    required:true,},
})

const accountModal=new mongoose.Model("account",accountSchema);
export default accountModal;