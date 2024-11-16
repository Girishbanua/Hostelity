const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    designation: String,
    paddress: String,
    pass: String,
    confirm: String,
    date: String,
    logins: [
        {
          loginDate: String,
          loginTime: String,
        },
      ],
    lastLogin: String
})

const AdminModel = mongoose.model("admin", adminSchema);
module.exports = { AdminModel }