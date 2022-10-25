import express from "express"
import path from "path"

import rootRoute from "./routes/root.route"
import todosRoute from "./routes/todo.route"

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

// built-in middleware for serving static files (CSS).
app.use('/', express.static(path.join(__dirname,'..', 'public')))

app.use('/', rootRoute) // home route
app.use('/todos', todosRoute)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})