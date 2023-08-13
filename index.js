const express = require("express")
const dotenv = require("dotenv")
const cors=require('cors')
const morgan =require('morgan')
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

dotenv.config()

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

connectDB()
    .then(async connection =>{
        console.log(`MongoDB connected: ${connection.connection.host}`);
    })
    .catch(e => console.error(e))

app.get("/", (req, res) => {
    res.send("API running successfully")
})

app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})