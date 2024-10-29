const mongoose = require("mongoose");

const messAtndSchema = new mongoose.Schema({
  student: [
    {
      name: String,
      guest: String,
      time: String,
    }
  ],
  summary: {
    present: String,
    absent: String,    
    guest: String,
  },
  guests: [
    {
      name: String,
      guest: String,
      time: String,
  }],
  messAttender: String,
  date: String,
});

const MessAtndModel = mongoose.model("messAtnd", messAtndSchema);
module.exports = { MessAtndModel };
