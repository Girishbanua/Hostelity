const express = require("express")
const router = require("./router/router")
const connectDB = require("./utilities/DB")
const dotenv = require("dotenv").config()

const app = express()
app.use(express.json())
app.use("/api", router)

const PORT = process.env.PORT || 5000

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})