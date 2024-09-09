const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String
});

const StudentModel = mongoose.model("Student", studentSchema);
module.exports = StudentModel