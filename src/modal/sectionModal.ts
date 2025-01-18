import mongoose from 'mongoose'

let sectionSchema = new mongoose.Schema({
    className: {type:String,unique:true,required:true},
    description: {type:String},
    section: {type:String,}
})

let sectionModal = mongoose.model('section', sectionSchema)

export default sectionModal
