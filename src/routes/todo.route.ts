import express, { Request, Response } from "express"
const router = express.Router()

import Persistence from "../services/persistence.service"
import Todo from "../controllers/todos.controller"
const persistService = new Persistence()
const todo = new Todo(persistService)

router.route('/')
    .get(todo.getTodos)
    .post(todo.createTodo)
    .patch(todo.updateTodo)
    .delete(todo.deleteTodo)

export default router