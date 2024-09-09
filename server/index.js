const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const StudentModel = require("./models/Student")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/hostelity");

app.post('/login', (req, res) => {
    StudentModel.create(req.body)
    .then(students => res.json(students))
    .catch(err => res.json(err))
})

app.listen(4000, () => console.log("Server started at 4000"))