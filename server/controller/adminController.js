const { AdminModel } = require("../models/adminModel");
const {RoomChngReqstModel} = require("../models/roomsModel");
const {StudentModel} = require("../models/Student");

const createAdmin = async (req, res) => {
  try {
    const { name, email, phone, designation, paddress, pass, confirm } =
      req.body;
      //formatting the date
    let dt = new Date();
    let dateString = dt.toLocaleDateString();
    const loginDate = dateString;
    const loginTime = dt.toLocaleTimeString();
    
    const admin = await AdminModel.create({
      name,
      email,
      phone,
      designation,
      paddress,
      pass,
      confirm,
      date: loginDate,
      logins: [
        {
          loginDate: loginDate,
          loginTime: loginTime,
        },
      ],
      lastLogin: loginDate,
    });
    console.log("New Admin created: ");
    res.status(201).json({ admin });
  } catch (error) {
    console.log("Error from createAdmin", error);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email } = req.body;
    //formatting the date
    let dt = new Date();
    let dateString = dt.toLocaleDateString();
    const loginDate = dateString;
    const loginTime = dt.toLocaleTimeString();
    
    const user = await AdminModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const checkPrevLogin = await AdminModel.findOne({ email: user.email });

    if (checkPrevLogin) {
      const loggedUser = await AdminModel.findOneAndUpdate(
        { email: user.email },
        {
          $push: {
            logins: {
              loginDate,
              loginTime,
            },
          },
        },
        {
          lastLogin: loginDate
        }
      );
      res.status(200).json({
        loggedUser,
        message: "Login successful",                
      });
    } 
    console.log("Login Successful");  
  } catch (error) {
    console.log("Error from adminLogin", error);
  }
};

const getRequests = async(req, res) => {
  try {
    const result = await RoomChngReqstModel.find();    
    res.status(200).json({ result });
  } catch (error) {
    console.log("Error from getRequests", error);
  }
}

module.exports = { adminLogin, createAdmin, getRequests };
