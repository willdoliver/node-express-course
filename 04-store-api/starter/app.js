require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// database config
const connectDB = require('./db/connect')

// Enable json parse in body
app.use(express.json())
const productsRouter = require('./routes/products')

// Routes
app.get('/', (req,res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>')
})

// Product Routes
app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
