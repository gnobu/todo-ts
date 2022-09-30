import express, { Request, Response } from "express"
const router = express.Router()

router.route('/')
    .get((req: Request, res: Response) => {
        res.send('GET ALL TODOS')
    })
    .post((req: Request, res: Response) => {
        res.send('POST ONE TODO')
    })
    .patch((req: Request, res: Response) => {
        res.send('EDIT ONE TODO')
    })
    .delete((req: Request, res: Response) => {
        res.send('DELETE ONE TODO')
    })

export default router