const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const StudentModel = require("./models/Student")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/hostelity");

//formatting the date
const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

app.post('/login', (req, res) => {
    //formatting the date before saving
    const formattedDate = formatDate(req.body.date);
    
    // replace the original date with the formatted date
    req.body.date = formattedDate;
    //check if the student already exists
    StudentModel.findOne({email: req.body.email})
    .then(student => {
        if(student) {
            res.json({message: "Already Registered"})            
        } else {
            StudentModel.create(req.body)
            .then(students => res.json(students))
            .catch(err => res.json(err))
        }
    })
})    
app.get('/students', (req, res) => {
    StudentModel.find()
    .then(students => res.json(students))
    .catch(err => res.json(err))
})

// API route to get count on number of students registered
app.get('/count', async(req, res) => {
    try {
        const count = await StudentModel.countDocuments();
        res.json({count});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})
app.listen(4000, () => console.log("Server started at 4000"))