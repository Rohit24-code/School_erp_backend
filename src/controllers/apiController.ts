import { Request,Response } from "express"


   const  self: RequestHandler :(_:Request,res:Response)=>{
      try {
       return res.sendStatus(200)
      } catch (error) {
        return res.sendStatus(500)
      }
    }

    export default {
        self
    }