/* eslint-disable react/prop-types */
import "../../styles/_ProfileSettings.scss";
import { motion } from "framer-motion";

const ProfileSettings = ({ onCancel, stdntData }) => {  
  console.log("stdnt data:",stdntData)   
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
          Name: <input type="text" placeholder={stdntData[0].name} />
        </label>
        <label>
          Email: <input type="email" placeholder={stdntData[0].email} />
        </label>
        <label>
          Phone: <input type="text" placeholder={stdntData[0].phone} />
        </label>
        <label>
          Roll No: <input type="text" placeholder={stdntData[0].admission} />
        </label>
        <label>
          College:{" "}
          <input type="text" placeholder={stdntData[0].college} />
        </label>
        <label>
          Department:{" "}
          <input type="text" placeholder={stdntData[0].department} />
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
