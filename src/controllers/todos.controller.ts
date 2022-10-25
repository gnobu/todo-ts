import path from "path"

import { Request, Response } from "express"
import asyncHandler from "express-async-handler"

import { TodoObj, Todos, IPersistence } from "../services/persistence.service"

class Todo {
    persistence: IPersistence
    constructor(persistence: IPersistence) {
        this.persistence = persistence
    }

    getTodos = asyncHandler(async (req: Request, res: Response) => {
        const filePath = path.join(__dirname, '..', '..', 'data.json')
        const data = await this.persistence.readData(filePath) as Todos
        if (!data) {
            res.status(400).json({ message: 'No Todos Found' })
            return
        }
        res.json(data)
    })

    createTodo = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const title = <string>req.body.title
        const filePath = path.join(__dirname, '..', '..', 'data.json')
        const todo = await this.persistence.addData(filePath, title) as TodoObj
        console.log("todo", todo)
        if (!todo) {
            res.status(400).json({ message: 'Could not create todo' })
            return
        }
        res.status(201).json(todo)
    })

    updateTodo = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const todo = <TodoObj>req.body
        const filePath = path.join(__dirname, '..', '..', 'data.json')
        const done = await this.persistence.updateData(filePath, todo)
        if (!done) {
            res.status(400).json({ message: 'Could not update todo' })
            return
        }
        res.json(done)
    })

    deleteTodo = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const id = <string>req.body.id
        const filePath = path.join(__dirname, '..', '..', 'data.json')
        const done = await this.persistence.deleteData(filePath, id)
        if (!done) {
            res.status(400).json({ message: 'Could not delete todo' })
            return
        }
        res.json(done)
    })
}

export default Todo