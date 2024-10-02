const dotenv = require("dotenv")
const cors = require("cors")
const express = require("express")
const router = require("./router/router")
const connectDB = require("./utilities/DB")
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use("/api", router)

const PORT = process.env.PORT || 5000
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})