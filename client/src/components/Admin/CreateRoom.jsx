import axios from "axios";
import { useState } from "react";

const CreateRoom = () => {
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
        alert("Room created successfully");
      }
    } catch (error) {
      console.log("Error while creating room", error);
    }
  };
  return (
    <div className="createRoom">
      <h1>Create Rooms</h1>
      <form>
        <div>
          <label htmlFor="roomNum">Room Number: </label>
          <input
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
            type="text"
            value={roomPrice}
            name="roomPrice"
            id="roomPrice"
            onChange={(e) => setRoomPrice(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" value="Submit" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default CreateRoom;
