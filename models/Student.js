const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    college: String,
    admission: String,
    department: String,
    semester: String,
    duration: String,    
    pass: String,
    confirm: String,
    mess: String,
    date: String
});

const StudentModel = mongoose.model("Student", studentSchema);
module.exports = StudentModel