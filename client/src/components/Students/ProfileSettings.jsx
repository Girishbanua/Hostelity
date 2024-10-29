/* eslint-disable react/prop-types */
import "../../styles/_ProfileSettings.scss";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";

const ProfileSettings = ({ onCancel }) => {
  const [stdntData, setStdntData] = useState([]);
  useEffect( () => {
    const fetchData = async () =>{
      const res = await axios.get("http://localhost:4000/api/registered_Students")
      const stdnt = localStorage.getItem("StudentID")
      setStdntData(res.data.find((student) => student._id === stdnt))      
    } 
    fetchData()
  },[])
  return (
    <motion.div
      className="profileSettings"
      initial={{ opacity: 0, y: -100 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <h1>Profile Settings</h1>
      <div className="profileContainer">
        <label>
          Name: <input type="text" placeholder={stdntData.name} />
        </label>
        <label>
          Email: <input type="email" placeholder={stdntData.email} />
        </label>
        <label>
          Phone: <input type="text" placeholder={stdntData.phone} />
        </label>
        <label>
          Roll No: <input type="text" placeholder={stdntData.admission} />
        </label>
        <label>
          College:{" "}
          <input type="text" placeholder={stdntData.college} />
        </label>
        <label>
          Department:{" "}
          <input type="text" placeholder={stdntData.department} />
        </label>
      </div>
      <div className="profilebuttons">
        <button>Update</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </motion.div>
  );
};

export default ProfileSettings;
