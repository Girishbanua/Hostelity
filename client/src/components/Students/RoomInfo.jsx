/* eslint-disable react/prop-types */
import "../../styles/_RoomInfo.scss";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";

const RoomInfo = ({ onCancel, roomNum, roomType }) => {  
  
  const [students, setStudents] = useState([]);
  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/getAllRoom");
        const result = response.data.result
        const fileredResult = result.filter((room) => room.roomNumber === roomNum)[0].students
        console.log("result: ", fileredResult);         //returns an array
        setStudents(fileredResult);
      } catch (error) {
        console.log("Error fetching data for rooms", error);
      }
    }
    fetchData();
  },[roomNum])
  return (
    <motion.div className="roomInfo" initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{duration: 0.5, delay: 0.25}}>
      <h1>Room {roomNum}</h1>
      <div>
        <h3>Room Type: </h3>
        <p>{
          roomType === "1" ? "Single Room" : roomType === "2" ? "Dual Room" : roomType === "3" ? "Triple Sharing Room" : roomType === "4" ? "Quad Sharing Room" : "Random"
          }</p>
      </div>
      <div>
        <h3>Boarders: </h3>
        <table>
          <thead>
            <tr>
              <th>Sl.No.</th>
              <th>Name</th>              
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>         
            {
              students.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>                  
                  <td>{student.phone}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={onCancel}>return</button>
      </div>
    </motion.div>
  );
};

export default RoomInfo;
