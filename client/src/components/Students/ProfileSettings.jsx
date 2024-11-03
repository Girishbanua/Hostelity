/* eslint-disable react/prop-types */
import { useState } from "react";
import "../../styles/_ProfileSettings.scss";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileSettings = ({ onCancel, stdntData }) => {  
  // console.log("stdnt data:",stdntData) 
  const [name, setName] = useState(stdntData[0].name)
  const [email, setEmail] = useState(stdntData[0].email)
  const [phone, setPhone] = useState(stdntData[0].phone)
  const [admission, setAdmission] = useState(stdntData[0].admission)
  const [college, setCollge] = useState(stdntData[0].college)
  const [department, setDepartment] = useState(stdntData[0].department)
  const [semester, setSem] = useState(stdntData[0].semester)
  const [duration, setDuration] = useState(stdntData[0].duration)
  const [address, setAddress] = useState(stdntData[0].paddress)
  const [guardian, setGuardian] = useState(stdntData[0].pname)
  const [relation, setRelation] = useState(stdntData[0].rltn)
  const [gphone, setGphone] = useState(stdntData[0].cnumber)  

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch("http://localhost:4000/api/updateUser",{
        name,
        email,
        phone,
        admission,
        college,
        department,
        semester,
        duration,
        address,
        guardian,
        relation,
        gphone
      } )            
      if (response.status === 200) {        
        toast.success("Profile updated successfully");        
        window.location.reload();
      }
 
    } catch (error) {
      console.log("Error while updating profile", error.response.status);    
      if (error.response.status === 304) {
        toast.warning("No changes made");
        onCancel();
      }  
      if (error.response.status > 304) {
        toast.error(error.response.data.message);
        return        
      }  
    }
  };

  return (         
    <motion.div
      className="profileSettings"
      initial={{ opacity: 0, y: -100 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <h1>Profile Settings</h1>
      <form onSubmit={handleUpdate}>
      
      <div className="profileContainer">
        <label>
          Name: <input id="name" name="name" placeholder="Enter updated name" type="text" value={name} onChange={(e)=>setName(e.target.value)} required/>
        </label>
        <label>
          Email: <input id="email" name="email" placeholder="Enter updated email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </label>
        <label>
          Phone: <input id="phone" name="phone" placeholder="Enter updated phone number" type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
        </label>
        <label>
          Roll No: <input id="admission" name="admission" placeholder="Enter admission number" type="text" value={admission} onChange={(e)=>setAdmission(e.target.value)} required/>
        </label>
        <label>
          College:
          <input id="college" name="college" placeholder="Enter updated college name" type="text" value={college} onChange={(e)=>setCollge(e.target.value)} required/>
        </label>
        <label>
          Department:
          <input id="department" name="department" placeholder="Enter department name" type="text" value={department} onChange={(e)=>setDepartment(e.target.value)} required/>
        </label>
        <label>
          Semester:
          <input id="semester" name="semester" placeholder="Enter latest semester" type="text" value={semester} onChange={(e)=>setSem(e.target.value)} required/>
        </label>
        <label>
          Duration:
          <input id="duration" name="duration" placeholder="Enter new duration" type="text" value={duration} onChange={(e)=>setDuration(e.target.value)} required/>
        </label>
        <label>
          Address:
          <input id="address" name="paddress" placeholder="Enter address" type="text" value={address} onChange={(e)=>setAddress(e.target.value)} required/>
        </label>
        <label>
          Guardian:
          <input id="guardian" name="pname" placeholder="Enter guardian name" type="text" value={guardian} onChange={(e)=>setGuardian(e.target.value)} required/>
        </label>
        <label>
          Relation:
          <input id="rltn" name="rltn" placeholder="Relation with the guardian" type="text" value={relation} onChange={(e)=>setRelation(e.target.value)} required/>
        </label>
        <label>
          Guardian Contact:
          <input id="gphone" name="cnumber" placeholder="Enter guardian contact" type="text" value={gphone} onChange={(e)=>setGphone(e.target.value)} required/>
        </label>
      </div>
      <div className="profilebuttons">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={console.log("clicked")} type="submit">Update</button>
      </div>
      </form>
    </motion.div>    
  ); 
};

export default ProfileSettings;
