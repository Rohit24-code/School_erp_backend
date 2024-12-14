import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import router from './router/apiRoutes'
import globalErrorHandler from './middleware/globalErrorHandler'
import responseMessage from './constant/responseMessage'
import httpError from './util/httpError'

const app: Application = express()

//Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

// Routes

app.use('/api/v1', router)

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
