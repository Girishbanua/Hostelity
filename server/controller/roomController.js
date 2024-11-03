const {RoomModel} = require("../models/roomsModel");

const createRoom = async (req, res) => {
    try {
        console.log(req.body)
        const {roomNumber, roomType, roomStatus, roomPrice, students} = req.body;
        const result = await RoomModel.create({roomNumber, roomType, roomStatus, roomPrice, students});
        res.status(201).json({result});
    } catch (error) {
        console.log("Error while creating room",error);
    }
}
const getAllRooms = async (req, res) => {
    try {
        const result = await RoomModel.find();
        res.status(200).json({result});
    } catch (error) {
        console.log("Error while getting all rooms",error);
    }
}

const updateRoom = async (req, res) => {
    try {
        const { roomNumber, roomType, roomStatus, roomPrice, students } = req.body;
        const result = await RoomModel.findOneAndUpdate(
            { roomNumber },
            { roomType, roomStatus, roomPrice, students },
            { new: true } // Returns the updated document
        );
        
        if (!result) {
            return res.status(404).json({ message: "Room not found" });
        }        
        res.status(200).json({ result });
    } catch (error) {
        console.log("Error while updating room", error);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = {createRoom, getAllRooms, updateRoom}