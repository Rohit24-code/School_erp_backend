import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import router from './router/authApiRoutes'
import globalErrorHandler from './middleware/globalErrorHandler'
import responseMessage from './constant/responseMessage'
import httpError from './util/httpError'
import helmet from 'helmet'
import cors from 'cors'
import studentRouter from './router/studentApiRoutes'

const app: Application = express()

//Middleware
app.use(helmet())
app.use(cors({
    methods:['GET','POST','PUT','DELETE','OPTIONS','HEAD'],
    // Frontend domin which is neccesary
    origin:["https://client.com"],
    // this is to allow ur app for cookies
    credentials:true
}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

// Routes
app.use('/api/v1', router)
app.use('/api/v1/student', studentRouter)

// 404 Error handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('Route'))
    } catch (error) {
        httpError(next, error, req, 404)
    }
})

// this for global error handler as we return the object and call next function
app.use(globalErrorHandler)

export default app
