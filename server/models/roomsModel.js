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
    ],
    occupants: {type: Number, default: 0, min: 0, max: 4},
});

const roomChngReqstSchema = new mongoose.Schema({
    rdt: String,
    oid: String,
    rid: String,
    roomNum: String,
    nRoomType: String,
    msg: String,
    status: String,
    rtype: String,
    name: String,
    email: String,
})

const RoomModel = mongoose.model("room", roomSchema);
const RoomChngReqstModel = mongoose.model("roomChngReqst", roomChngReqstSchema);
module.exports = { RoomModel, RoomChngReqstModel }