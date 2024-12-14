import { Request, RequestHandler, Response } from 'express'

const self: RequestHandler = (_: Request, res: Response) => {
    try {
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
}

export default {
    self
}
