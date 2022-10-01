"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const todos_controller_1 = __importDefault(require("../controllers/todos.controller"));
const persistence_service_1 = __importDefault(require("../services/persistence.service"));
const persistence = new persistence_service_1.default();
const todo = new todos_controller_1.default(persistence);
router.route('/')
    .get(todo.getTodos)
    .post(todo.createTodo)
    .patch(todo.updateTodo)
    .delete(todo.deleteTodo);
exports.default = router;
