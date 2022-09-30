import fs from 'fs'
import * as fsPromise from 'fs/promises'

import { v4 as uuid } from 'uuid'

export interface TodoObj {
    id: string,
    title: string,
    completed: boolean
}

export interface fileDataInterface {
    todos: TodoObj[]
}

export type Todos = TodoObj[]

export interface persistenceInterface {
    readData(path: string): Promise<Todos>
    addData(path: string, newData: string): Promise<TodoObj>
    updateData(path: string, newData: TodoObj): Promise<TodoObj | undefined>
    deleteData(path: string, todoId: string): Promise<string | undefined>
}

class Persistence implements persistenceInterface {

    async readData(path: string): Promise<Todos> {
        const data = await fsPromise.readFile(path, { encoding: 'utf-8' })
        const fileData: fileDataInterface = JSON.parse(data)
        return fileData.todos
    }

    async addData(path: string, title: string): Promise<TodoObj> {
        const fileData = await this.readData(path) as Todos
        // update
        const newData: TodoObj = {
            id: uuid(),
            title,
            completed: false
        }
        const updatedData = [...fileData, newData]
        // write back
        await fsPromise.writeFile(path, JSON.stringify({ todos: updatedData }, null, 2))
        // return created object
        return newData
    }

    async updateData(path: string, newData: TodoObj) {
        const fileData = await this.readData(path)
        // update
        const found = fileData?.find(todo => todo.id === newData.id)
        if (!found){
            return
        }
        const updatedData = fileData?.map(todo => {
            if (todo.id === newData.id) {
                return newData
            }
            return todo
        })
        // write back
        await fsPromise.writeFile(path, JSON.stringify({ todos: updatedData }, null, 2))
        // return added object
        return newData
    }

    async deleteData(path: string, todoId: string) {
        const fileData = await this.readData(path)
        // update
        const found = fileData?.find(todo => todo.id === todoId)
        if (!found){
            return
        }
        const updatedData = fileData?.filter(todo => todo.id !== todoId)
        // write back
        await fsPromise.writeFile(path, JSON.stringify({ todos: updatedData }, null, 2))
        // final return
        return todoId
    }
}



export default Persistence