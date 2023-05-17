const express = require('express')
const app = express()

const tasksRouter = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const port = 3000

// To receive Json through APIs
app.use(express.json())
// Reference static files
app.use(express.static('./public'))


// Routes
app.use('/api/v1/tasks', tasksRouter)

app.use(notFound)

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
