const { MessAtndModel } = require("../models/messAtndModel");

const messAttend = async (req, res) => {
  try {
    console.log(req.body); // Log the request body to verify
    const { student } = req.body;
    const crntDate = new Date();
    const time = crntDate.toLocaleTimeString();
    const date = crntDate.toLocaleDateString();

    // Transform the student array to include time for each student
    const studentArray = student.map((stu) => ({
      name: stu.name,
      guest: stu.guest,
      time,  // Add the current time to each student object
    }));

    // Insert the data into the database
    const result = await MessAtndModel.create({
      student: studentArray, // Use the transformed array
      date,
    });

    res.status(201).json({ result });
  } catch (error) {
    console.error("Error creating attendance:", error);
    res.status(500).json({ error: "Failed to create attendance" });
  }
};

module.exports = { messAttend };
