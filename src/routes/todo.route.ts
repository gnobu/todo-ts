import express from "express"
const router = express.Router()

import Todo from "../controllers/todos.controller"
import Persistence from "../services/persistence.service"
const persistence = new Persistence()
const todo = new Todo(persistence)

router.route('/')
    .get(todo.getTodos)
    .post(todo.createTodo)
    .patch(todo.updateTodo)
    .delete(todo.deleteTodo)

export default router