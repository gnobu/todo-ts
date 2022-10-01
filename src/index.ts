import express from "express"

import todosRoute from "./routes/todo.route"

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/todos', todosRoute)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})