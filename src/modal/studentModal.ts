import mongoose from 'mongoose'
import { RegisterStudentBodyType } from '../types/studentTypes'
import { userRole } from '../constant/userContant'

const studentSchema = new mongoose.Schema<RegisterStudentBodyType>(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        dob: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        whatsappNo: {
            type: Number,
            default: null
        },
        gender: {
            type: String,
            required: true
        },
        fatherName: {
            type: String,
            required: true
        },
        fatherMobile: {
            type: Number,
            default: null
        },
        fatherEducationQualification: {
            type: String,
            default: ''
        },
        fatherOccupation: {
            type: String,
            default: ''
        },
        fatherDob: {
            type: String,
            default: ''
        },
        motherName: {
            type: String,
            required: true
        },
        motherMobile: {
            type: Number,
            required: true
        },
        motherEducationQualification: {
            type: String,
            default: ''
        },
        motherOccupation: {
            type: String,
            default: ''
        },
        motherDob: {
            type: String,
            default: ''
        },
        fatherAadharCardNo: {
            type: Number,
            default: null,
            minlength: 12,
            maxlength: 12
        },
        motherAadharCardNo: {
            type: Number,
            default: null,
            minlength: 12,
            maxlength: 12
        },
        role: {
            type: String,
            default: userRole.STUDENT
        },
        aadharCardNo: {
            type: Number,
            required:true,
            minlength: 12,
            maxlength: 12
        },
    },
    { timestamps: true }
)

const studentModal = mongoose.model('student', studentSchema)

export default studentModal
