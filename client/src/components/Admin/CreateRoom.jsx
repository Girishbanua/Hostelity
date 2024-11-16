/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import "../../styles/_CreateRoom.scss";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const CreateRoom = ({onCancel}) => {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const URL = "http://localhost:4000/api/createRoom";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL, {
        roomNumber,
        roomType,
        roomStatus,
        roomPrice,
      });
      if (response.status === 201) {
        console.log("Room created successfully", response);
        setRoomNumber("");
        setRoomType("");
        setRoomStatus("");
        setRoomPrice("");
        toast.success("Room created successfully");
        onCancel();
      } else {
        toast.error("Room creation failed");
      }
    } catch (error) {
      toast.error(`Room creation failed: ${error.message}`);
      console.log("Error while creating room", error.message);
    }
  };
  return (
    <motion.div
      className="createRoom"
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.25 }}
    >
      <div>
        <h1>Create Rooms</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="roomNum">Room Number: </label>
            <input
              required
              type="text"
              value={roomNumber}
              name="roomNumber"
              id="roomNum"
              onChange={(e) => setRoomNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="roomType">Room Type: </label>
            <select
              name="roomType"
              value={roomType}
              id="roomType"
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="1">Single Room</option>
              <option value="2">Double Room</option>
              <option value="3">Triple Sharing Room</option>
              <option value="4">Quad Sharing Room</option>
            </select>
          </div>
          <div>
            <label htmlFor="roomStatus">Room Status: </label>
            <input
              required
              type="text"
              value={roomStatus}
              name="roomStatus"
              id="roomStatus"
              onChange={(e) => setRoomStatus(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="roomPrice">Room Price: </label>
            <input
              required
              type="text"
              value={roomPrice}
              name="roomPrice"
              id="roomPrice"
              onChange={(e) => setRoomPrice(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" value="Submit" />
            <button onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
      <div className="createImage">
        <img src="images/Create-pana.png" alt="image" />
      </div>
    </motion.div>
  );
};

export default CreateRoom;
