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

const roomChngReqstSchema = new mongoose.Schema({
    rdt: String,
    rid: String,
    roomNum: String,
    nRoomType: String,
    msg: String,
    status: String,
})

const RoomModel = mongoose.model("room", roomSchema);
const RoomChngReqstModel = mongoose.model("roomChngReqst", roomChngReqstSchema);
module.exports = { RoomModel, RoomChngReqstModel }