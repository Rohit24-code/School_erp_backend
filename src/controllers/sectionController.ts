import { NextFunction, Request, Response } from "express";
import httpResponse from "../util/httpResponse";
import httpError from "../util/httpError";
import responseMessage from "../constant/responseMessage";
import sectionModal from "../modal/sectionModal";
import sectionService from "../service/sectionService";

export default {
    createSection:async(req:Request,res:Response,next:NextFunction)=>{
          
        try {
            const {className,description,section}= req.body
            let payload = {className,description,section}
              let newSection = new sectionModal(payload)
            let data = await newSection.save()
            httpResponse(req, res, 200, responseMessage.UPLOADED_SUCCESSFULLY,data)
        } catch (error) {
             httpError(next, error, req, 500)
        }
    },
    getSection:async (req:Request,res:Response,next:NextFunction)=>{
        const {limit,offset,sortBy,sortOrder}=req.query
        const numericLimit = typeof limit === 'string' ? Number(limit) : 0; // Default to 0  
        const numericOffset = typeof offset === 'string' ? Number(offset) : 0;
        const stringSortBy= typeof sortBy === 'string' ? sortBy : undefined;
        const stringSortOrder =  (sortOrder === 'asc' || sortOrder === 'desc') ? sortOrder : 'asc';
    
        
        try {
              const {data,count} = await sectionService.findAllSection(numericOffset,numericLimit,stringSortBy,stringSortOrder)
            httpResponse(req, res, 200, responseMessage.UPLOADED_SUCCESSFULLY, data , count)
        } catch (error) {
             httpError(next, error, req, 500)
        }
    },
   deleteSection : async(req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      try {
         let user= await sectionService.findSectionById(id)
         if(!user){
          return httpError(next, new Error(responseMessage.NOT_FOUND("Student")), req, 404)
         }
         let deletedData=await sectionService.findByIdAndDelete(id)
  
         
  
          httpResponse(req, res, 200, responseMessage.DELETED_SUCCESSFULLY, deletedData)
      } catch (err) {
          httpError(next, err, req, 500)
      }
  },
    updateSection:async(req:Request,res:Response,next:NextFunction)=>{
        let {id} = req.params
        let {className,section,description} = req.body

        try {
            let data= sectionService.findById(id)
            if(!data){
                 return httpError(next, new Error(responseMessage.ALREADY_EXISTS("Section",id)), req, 400) 
            }
            let newData = await sectionService.findByIdAndUpdate(id,{className,section,description})
            httpResponse(req, res, 200, responseMessage.UPLOADED_SUCCESSFULLY, newData)
        } catch (error) {
             httpError(next, error, req, 500)
        }
    }
}