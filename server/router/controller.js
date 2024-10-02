const StudentModel = require("../models/Student");

const home = async () => {
  try {
    res.json({ message: "Welcome to Hostelity" });
  } catch (err) {
    console.log(err);
  }
};

const stdntSignup = async (req, res) => {

  //formatting the date
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  try {

    //formatting the date before saving
    const formattedDate = formatDate(req.body.date);

    // replace the original date with the formatted date
    req.body.date = formattedDate;

    //check if the student already exists
    await StudentModel.findOne({ email: req.body.email }).then((student) => {

      if (student) {
        res.json({ message: "Already Registered" });
        alert("This email has already been registered");
      } 
      else {
        StudentModel.create(req.body)
          .then((students) => res.json(students))
          .catch((err) => res.json(err));
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const stdntDetails = async (req, res) => {
  try {
    StudentModel.find()
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
}

module.exports = { home, stdntSignup, stdntDetails, totalStdnt };
