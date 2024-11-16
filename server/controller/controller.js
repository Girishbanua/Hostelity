const { StudentModel, stdntLoginModel } = require("../models/Student");
const { MessMenuModel } = require("../models/messMenu");
const { RoomModel, RoomChngReqstModel } = require("../models/roomsModel");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.json({ message: "Welcome to Hostelity" });
  } catch (err) {
    console.log(err);
  }
};

const messMenu = async (req, res) => {
  try {
    await MessMenuModel.find()
      .then((data) => {
        res.status(200).json(data);
        console.log(data);
      })
      .catch((err) => {
        res.json(err);
      });
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
      paddress,
      pname,
      rltn,
      cnumber,
      caddress,
      college,
      admission,
      department,
      semester,
      duration,
      pass,
      confirm,
      mess,
      date,
      seater,
      pdone,
      hpay,
      mpay,
      href,
      mref,
      roomnum,
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

    let room = await RoomModel.findOne({
      roomStatus: "vacant",
      roomType: seater,
    });
    console.log("room", room);

    if (!room) {
      res.status(400).json({ message: "No room available" });
      return;
    } else {
      roomnum = room.roomNumber;
      await RoomModel.findOneAndUpdate(
        { roomNumber: roomnum },
        {
          $push: {
            students: { name, phone },
          },
        },
        { new: true }       
      );
    }

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
      confirm,
      mess,
      date,
      seater,
      pdone,
      hpay,
      mpay,
      href,
      mref,
      paddress,
      pname,
      rltn,
      cnumber,
      caddress,
      roomnum,
    });

    res.status(201).json({ userCreated, message: "User created successfully" });
    console.log("userCreated", userCreated);
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
    const checkPrevLogin = await stdntLoginModel.findOne({ email: user.email });

    if (checkPrevLogin) {
      const loggedUser = await stdntLoginModel.findOneAndUpdate(
        { email: user.email },
        {
          $push: {
            logins: {
              loginDate,
              loginTime,
            },
          },
        }
      );
      res.status(200).json({
        loggedUser,
        message: "Login successful",
        token,
        userID: user._id.toString(),
      });
    } else {
      const loggedUser = await stdntLoginModel.create({
        name: user.name,
        email: user.email,
        token: token,
        id: user._id.toString(),
        logins: [
          {
            loginDate,
            loginTime,
          },
        ],
      });
      res.status(200).json({
        loggedUser,
        message: "Login successful",
        token,
        userID: user._id.toString(),
      });
    }
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

const loggedStudents = async (req, res) => {
  try {
    await stdntLoginModel
      .find()
      .then((lgdStdnts) => res.status(200).json({ lgdStdnts: lgdStdnts }))
      .catch((err) => res.json(err));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//to send user data- user logic
const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ msg: userData });
  } catch (err) {
    console.log("error from user", err);
  }
};

// update user
const userUpdate = async (req, res) => {
  try {
    let {
      name,
      email,
      phone,
      admission,
      college,
      department,
      semester,
      duration,
      paddress,
      pname,
      rltn,
      cnumber,
    } = req.body;
    if (
      (name =
        "" ||
        email == "" ||
        phone == "" ||
        admission == "" ||
        college == "" ||
        department == "" ||
        semester == "" ||
        duration == "" ||
        paddress == "" ||
        pname == "" ||
        rltn == "" ||
        cnumber == "")
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const updateData = { ...req.body };
    const result = await StudentModel.findOneAndUpdate({ email }, updateData, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ msg: "User not found" });
    }
    // Check if any fields were actually modified
    const isUpdated = Object.keys(updateData).some(
      (key) => result[key] !== updateData[key]
    );

    if (!isUpdated) {
      return res
        .status(304)
        .json({ message: "No changes were made, data is already up to date" });
    }
    res.status(200).json({ msg: "User updated successfully" });
  } catch (err) {
    console.log(err);
  }
};

const paymentUpdate = async (req, res) => {
  try {
    const { students } = req.body;

    const studentsToUpdate = await StudentModel.find({
      name: { $in: students },
    });

    const updatedStudents = await Promise.all(
      studentsToUpdate.map(async (student) => {
        let currentMpay = parseFloat(student.mpay) || 0; // Convert mpay to a number, or default to 0 if invalid
        let newMpay = (currentMpay - 50).toString(); // Subtract 50 and convert back to a string

        return await StudentModel.updateOne(
          { _id: student._id },
          { $set: { mpay: newMpay } }
        );
      })
    );

    res
      .status(200)
      .json({ msg: "Payment updated successfully", updatedStudents });
  } catch (err) {
    console.log("Error from paymentUpdate", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const changeRoom = async (req, res) => {
  try {
    const { sid, nRoomNum, nRoomType } = req.body;
    const result = await StudentModel.findOneAndUpdate(
      { _id: sid },
      { roomnum: nRoomNum, seater: nRoomType },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ msg: "User not found" });
    }
    res
      .status(200)
      .json({ msg: "Room changed successfully", nRoomNum, nRoomType });
  } catch (error) {
    console.log("Error Changing Room", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const requestChangeRoom = async (req, res) => {
  try {
    const { rdt, oid, rid, roomNum, nRoomType, msg, status, rtype } = req.body;
    const result2 = await StudentModel.find({ _id: oid });    
    const name = result2[0].name;
    const email = result2[0].email;    
    const result = await RoomChngReqstModel.create({
      rdt,
      oid,
      rid,
      roomNum,
      nRoomType,
      msg,
      status,
      rtype,
      name,
      email,
    });
    if (!result) {
      return res.status(404).json({ msg: "User not found" });
    }
    res
      .status(200)
      .json({ msg: "Request sent successfully", rdt, rid, roomNum, nRoomType });
  } catch (error) {
    console.log("Error Changing Room, request rejected", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
module.exports = {
  home,
  stdntSignup,
  stdntLogin,
  stdntDetails,
  totalStdnt,
  loggedStudents,
  user,
  messMenu,
  userUpdate,
  changeRoom,
  paymentUpdate,
  requestChangeRoom,
};
