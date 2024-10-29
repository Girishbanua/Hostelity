const { MessAtndModel } = require("../models/messAtndModel");

const messAttend = async (req, res) => {
  try {
    console.log(req.body); // Log the request body to verify
    const { student, summary, guests } = req.body;
    const crntDate = new Date();
    const date = crntDate.toLocaleDateString();

    // Transform the student array to include time for each student
    const studentArray = student.map((stu) => ({
      name: stu.name,
      guest: stu.guest,
      time: stu.time, // Add the current time to each student object
    }));
    const guestsArray = guests.map((g) => ({
      name: g.name,
      guest: g.guest,
      time: g.time,
    }));
    // Insert the data into the database
    const result = await MessAtndModel.create({
      student: studentArray, // Use the transformed array
      summary,
      guests: guestsArray,
      messAttender: "messAdmin",
      date,
    });

    res.status(201).json({ result });
  } catch (error) {
    console.error("Error creating attendance:", error);
    res.status(500).json({ error: "Failed to create attendance" });
  }
};

module.exports = { messAttend };
