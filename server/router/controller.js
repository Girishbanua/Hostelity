const StudentModel = require("../models/Student");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.json({ message: "Welcome to Hostelity" });
  } catch (err) {
    console.log(err);
  }
};

const stdntSignup = async (req, res) => {
  try {
    let {
      name,
      email,
      phone,
      college,
      admission,
      department,
      semester,
      duration,
      pass,
      confirm,
      mess,
      date,
      pdone,
      hpay,
      mpay,
    } = req.body;

    //formatting the date
    let formatDate = (dateString) => {
      let [year, month, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    };
    //formatting the date before saving
    let formattedDate = formatDate(req.body.date);

    // replace the original date with the formatted date
    date = formattedDate;

    //check if the student already exists
    let userExists = await StudentModel.findOne({ email });

    if (userExists) {
      alert("This email has already been registered");
      res.json.status(400).json({ message: "Already Registered" });
      return;
    }
    //hashing the password
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(pass, salt);

     await StudentModel.create({
      name,
      email,
      phone,
      college,
      admission,
      department,
      semester,
      duration,
      pass: hash,
      confirm,
      mess,
      date,
      pdone,
      hpay,
      mpay,
    });

    console.log("userCreated");    

    res.status(201).json({ message: "user created" });
  } catch (err) {
    console.log(err);
  }
};

const stdntDetails = async (req, res) => {
  try {
    await StudentModel.find()
      .then((students) => res.json(students))
      .catch((err) => res.json(err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const totalStdnt = async (req, res) => {
  try {
    const count = await StudentModel.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { home, stdntSignup, stdntDetails, totalStdnt };
