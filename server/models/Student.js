const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  paddress: String,
  college: String,
  admission: String,
  department: String,
  semester: String,
  duration: String,
  pname: String,
  rltn: String,
  cnumber: String,
  caddress: String,
  pass: String,
  confirm: String,
  mess: String,
  date: String,
  seater: String,
  pdone: String,
  hpay: String,
  mpay: String,
  href: String,
  mref: String,
  roomnum: String,
});
const stdntLoginSchema = new mongoose.Schema({
  name: String,
  email: String,
  logins: [
    {
      loginDate: String,
      loginTime: String,
    },
  ],
});
//JWT
studentSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userID: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SEC_KEY,
      {
        expiresIn: "1d",
      }
    );
  } catch (err) {
    console.log("Error while generating token", err);
    return null;
  }
};

const StudentModel = mongoose.model("Student", studentSchema);
const stdntLoginModel = mongoose.model("stdntLogin", stdntLoginSchema);
module.exports = { StudentModel, stdntLoginModel };
