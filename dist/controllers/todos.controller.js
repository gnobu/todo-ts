"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
class Todo {
    constructor(persistence) {
        this.getTodos = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const filePath = path_1.default.join(__dirname, '..', '..', 'data.json');
            const data = yield this.persistence.readData(filePath);
            if (!data) {
                res.status(400).json({ message: 'No Todos Found' });
                return;
            }
            res.json(data);
        }));
        this.createTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const title = req.body.title;
            const filePath = path_1.default.join(__dirname, '..', '..', 'data.json');
            const todo = yield this.persistence.addData(filePath, title);
            console.log("todo", todo);
            if (!todo) {
                res.status(400).json({ message: 'Could not create todo' });
                return;
            }
            res.status(201).json(todo);
        }));
        this.updateTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const todo = req.body;
            const filePath = path_1.default.join(__dirname, '..', '..', 'data.json');
            const done = yield this.persistence.updateData(filePath, todo);
            if (!done) {
                res.status(400).json({ message: 'Could not update todo' });
                return;
            }
            res.json(done);
        }));
        this.deleteTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const filePath = path_1.default.join(__dirname, '..', '..', 'data.json');
            const done = yield this.persistence.deleteData(filePath, id);
            if (!done) {
                res.status(400).json({ message: 'Could not delete todo' });
                return;
            }
            res.json(done);
        }));
        this.persistence = persistence;
    }
}
exports.default = Todo;
