const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database Connected");
    } catch (error) {
        console.log("Error connecting to database \n", error);
        process.exit(0);
    }
};
module.exports = connectDB