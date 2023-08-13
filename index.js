const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()

const app = express()

connectDB()
    .then(async connection =>{
        console.log(`MongoDB connected: ${connection.connection.host}`);
    })
    .catch(e => console.error(e))

app.get("/", (req, res) => {
    res.send("Resonse to API")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})