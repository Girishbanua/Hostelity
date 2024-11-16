/* eslint-disable react/prop-types */

import { useState } from "react";
import "../../styles/_CreateAdmin.scss";
import axios from "axios";
import { toast } from "react-toastify";

const CreateAdmin = ({onCancel}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paddress, setPaddress] = useState("");  
  const [jobType, setJobType] = useState("Superintendent");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const URL = "http://localhost:4000/api/createAdmin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL, {
        name,
        email,
        phone,
        paddress,
        designation: jobType,
        pass,
        confirm,
      });
      console.log("response: ", response);
      if(response.status === 201){
        toast.success("Admin created successfully");
      }
    } catch (error) {
      toast.error("Error while creating admin", error);
    }    
    onCancel();
  }
  return (
    <div>
      <div className="adminSignupContainer">
        <div className="adminSignupBox">
          <h1>Sign Up</h1>
          <form id="signupForm" autoComplete="off" onSubmit={handleSubmit} >
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your Name"
                required   
                onChange={(e) => setName(e.target.value)}                                        
              />
            </div>
            <div>
              <label htmlFor="mail">Email</label>
              <input
                type="email"
                id="mail"
                name="email"
                placeholder="Enter your email address"
                required   
                onChange={(e) => setEmail(e.target.value)}                             
              />
            </div>
            {/*Phone Number*/}
            <div>
              <label htmlFor="phnNumber">Phone Number</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                required
                name="phone"
                autoComplete="off"   
                onChange={(e) => setPhone(e.target.value)}                             
              />
            </div>
            
            {/*Total Duration maximum 3 years*/}
            <div>
              <label htmlFor="jobType">Select Job Type: </label>
              <select
                name="designation"
                id="jobType"  
                onChange={(e) => setJobType(e.target.value)}                              
              >
                <option>Superintendent</option>
                <option>Assistant Superintendent</option>
                <option>Clerk</option>
              </select>
            </div>
            {/*permanent Address */}
            <div>
                <label htmlFor="paddrs">Permanent Address</label>
                <textarea name="paddress" id="paddrs" placeholder="Enter your permanent address" required onChange={(e) => setPaddress(e.target.value)}></textarea>
            </div>
            {/*Password*/}
            <div>
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                id="pass"
                placeholder="Enter a strong password"
                required    
                onChange={(e) => setPass(e.target.value)}                            
              />
            </div>
            {/*Confirm Password*/}
            <div>
              <label htmlFor="confirmPass">Confirm Password</label>
              <input
                type="password"
                id="confirmPass"
                placeholder="Enter a strong password"
                required   
                onChange={(e) => setConfirm(e.target.value)}                             
              />
            </div>
                        
            <div className="adminformBtns">
              <a onClick={onCancel}>Cancel</a>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateAdmin