const mongoose = require("mongoose");

const messAtndSchema = new mongoose.Schema({
  student: [
    {
      name: String,
      guest: String,
      time: String,
    }
  ],
  date: String,
});

const MessAtndModel = mongoose.model("messAtnd", messAtndSchema);
module.exports = { MessAtndModel };
