/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import "../../styles/_ChangeRoom.scss";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const ChangeRoom = ({ onCancel }) => {  
  const [rooms, setRooms] = useState([]);  
  const [newRoomNum, setNewRoomNum] = useState("");
  const [newRoomType, setNewRoomType] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/getAllRoom"
        );
        const result = response.data.result;
        const roomsArray = result.map((room) => room.roomNumber);
        setRooms(roomsArray);               
      } catch (error) {
        console.log("Error fetching data for rooms", error);
      }
    };
    fetchData();    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sid = localStorage.getItem("StudentID");
    try {
      const res = await axios.patch("http://localhost:4000/api/changeRoom", {
        sid, nRoomNum: newRoomNum, nRoomType: newRoomType
      })
      if (res.status === 200) {
        toast.success("Room changed successfully")       
        onCancel()
      }      
    } catch (error) {
      console.log(error)
    }
    console.log(sid)
    console.log(newRoomNum, newRoomType)
  }

  return (
    <motion.div
      className="changeRoom"
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <h1>Change Room</h1>
      <form onSubmit={handleSubmit}>
        <div className="rbox">         
       { /***********************Room Number Component****************/}
        <p>(* If you don't know the new room number, please select random)</p>
        <div className="roomNumber">
        <label htmlFor="prnum">New Room Number:</label>
        <select
          name="prnum"
          id="proomnum"
          value={newRoomNum}
          onChange={(e) => setNewRoomNum(e.target.value)}
          required
        >
          <option value="rndm">Random</option>
          {rooms.map((r, index) => (
            <option value={r} key={index}>
              {r}
            </option>
          ))}
        </select>
      </div>            
      {/***********************Room Type Component****************/}
        <div className="roomType">
        <label htmlFor="proom">New Room Type: </label>
        <select name="proom" id="proom" value={newRoomType} onChange={(e) => setNewRoomType(e.target.value)} required>
          <option value="rndm">Random</option>
          <option value="1">Single Room</option>
          <option value="2">Dual Room</option>
          <option value="3">Triple Sharing Room</option>
          <option value="4">Quad Sharing Room</option>
        </select>
      </div>
        <div className="chngMsg">
          <label htmlFor="chngMsg">Reason for room change(if any): </label>
          <br />
          <textarea name="chngMsg" cols="70" rows="10 "></textarea>
        </div>
        <div className="buttons">
          <button type="submit" >Request change</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
        </div>  
      </form>
    </motion.div>
  );
};

export default ChangeRoom;
