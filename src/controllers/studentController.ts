import { NextFunction, Request, RequestHandler, Response } from 'express'
import httpResponse from '../util/httpResponse'
import httpError from '../util/httpError'
import responseMessage from '../constant/responseMessage'
import studentService from '../service/studentService'
import studentModal from '../modal/studentModal'

const createStudent: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let {
            name,
            address,
            dob,
            city,
            mobile,
            whatsappNo,
            gender,
            fatherName,
            fatherMobile,
            aadharCardNo,
            fatherEducationQualification,
            fatherOccupation,
            fatherDob,
            motherName,
            motherMobile,
            motherEducationQualification,
            motherOccupation,
            motherDob,
            fatherAadharCardNo,
            motherAadharCardNo
        } = req.body

        let payload = {
            name,
            address,
            dob,
            city,
            mobile,
            whatsappNo,
            gender,
            aadharCardNo,
            fatherName,
            fatherMobile,
            fatherEducationQualification,
            fatherOccupation,
            fatherDob,
            motherName,
            motherMobile,
            motherEducationQualification,
            motherOccupation,
            motherDob,
            fatherAadharCardNo,
            motherAadharCardNo
        }
        const user = await studentService.findUserByAadhar(aadharCardNo)
        if (user) {
            return httpError(next, new Error(responseMessage.ALREADY_EXISTS('student', aadharCardNo)), req, 422)
        }

        const newPerson =  new studentModal(payload);

        await newPerson.save()
        httpResponse(req, res, 200, responseMessage.UPLOADED_SUCCESSFULLY, [])
    } catch (err) {
        httpError(next, err, req, 500)
    }
}

const updateStudent: RequestHandler = async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
  const updates = req.body;

    try {
        let user = await studentService.findByIdAndUpdate(id,updates)
        if(!user){
            return httpError(next, new Error(responseMessage.NOT_FOUND("Student")), req, 404)
        }
        httpResponse(req, res, 200, responseMessage.UPDATED_SUCCESSFULLY, [])
    } catch (err) {
        httpError(next, err, req, 500)
    }
}

const deleteStudent: RequestHandler = async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
       let user= await studentService.findStudentById(id)
       if(!user){
        return httpError(next, new Error(responseMessage.NOT_FOUND("Student")), req, 404)
       }
       let deletedData=await studentService.findByIdAndDelete(id)

       

        httpResponse(req, res, 200, responseMessage.DELETED_SUCCESSFULLY, deletedData)
    } catch (err) {
        httpError(next, err, req, 500)
    }
}

const getSingleStudentDetail: RequestHandler =async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        let user= await studentService.findStudentById(id)
        if(!user){
            return httpError(next, new Error(responseMessage.NOT_FOUND("Student")), req, 404)
           }
        httpResponse(req, res, 200, responseMessage.SUCCESS, user)
    } catch (err) {
        httpError(next, err, req, 500)
    }
}

const getAllStudent: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const {limit,offset,sortBy,sortOrder}=req.query
    const numericLimit = typeof limit === 'string' ? Number(limit) : 0; // Default to 0  
    const numericOffset = typeof offset === 'string' ? Number(offset) : 0;
    const stringSortBy= typeof sortBy === 'string' ? sortBy : undefined;
    const stringSortOrder =  (sortOrder === 'asc' || sortOrder === 'desc') ? sortOrder : 'asc';

   try {
       const {data,count} = await studentService.findAllStudent(numericOffset,numericLimit,stringSortBy,stringSortOrder)
        httpResponse(req, res, 200, responseMessage.SUCCESS,data,count)
    } catch (err) {
        httpError(next, err, req, 500)
    }
}
export default {
    createStudent,
    updateStudent,
    deleteStudent,
    getSingleStudentDetail,
    getAllStudent
}
