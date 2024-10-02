const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/hostelity";

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database Connected");
    } catch (error) {
        console.log("Error connecting to database", error);
        process.exit(1);
    }
};
module.exports = connectDB