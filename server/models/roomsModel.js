const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomNumber: String,
    roomType: String,
    roomStatus: String,
    roomPrice: String,
    students: [
        {
            name: String,
            phone: String,                                    
        }
    ]
});

const RoomModel = mongoose.model("room", roomSchema);
module.exports = { RoomModel }