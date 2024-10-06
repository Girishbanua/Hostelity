const {StudentModel, stdntLoginModel} = require("../models/Student");
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
    let formattedDate = formatDate(date);
    // replace the original date with the formatted date
    date = formattedDate;

    //check if the student already exists
    let userExists = await StudentModel.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "Already Registered" });
      return;
    }
    //hashing the password
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(pass, salt);

    let userCreated = await StudentModel.create({
      name,
      email,
      phone,
      college,
      admission,
      department,
      semester,
      duration,
      pass: hash,
      confirm: hash,
      mess,
      date,
      pdone,
      hpay,
      mpay,
    });

    res.status(201).json(userCreated);
    console.log("userCreated");
  } catch (err) {
    console.log(err);
  }
};

const stdntLogin = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await StudentModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = await user.generateToken();
    //formatting the date
    let date = new Date();
    let dateString = date.toLocaleDateString();        
    const loginDate = dateString;    
    const loginTime = date.toLocaleTimeString();
    const loggedUser = await stdntLoginModel.create({
      name: user.name,
      email: user.email,
      token: token,      
      loginDate: loginDate,
      loginTime: loginTime,
    });
    res.status(200).json({loggedUser,message: "Login successful", token, userID: user._id.toString() });
    console.log("Login successful");
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
module.exports = { home, stdntSignup, stdntLogin, stdntDetails, totalStdnt };
