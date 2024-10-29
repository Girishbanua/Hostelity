const mongoose = require("mongoose");
const { boolean } = require("zod");

const messMenuSchema = new mongoose.Schema(
  {
    day: String,
    lunch: {
      veg: String,
      food: String,
      image1: String,
      image2: String,
      image3: String,
      image4: String,
    },
    dinner: {
      veg: String,
      food: String,
      image1: String,
      image2: String,
      image3: String,
      image4: String,
    },
  },
);

const MessMenuModel = mongoose.model("messMenu", messMenuSchema);
module.exports = { MessMenuModel };
