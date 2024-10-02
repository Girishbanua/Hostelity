import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import "../../styles/_StudentSignUp.scss";
import Modal from "../Modal";

export default function StudentSignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [college, setCollege] = useState();
  const [admission, setAdmission] = useState();
  const [department, setDepartment] = useState();
  const [semester, setSemester] = useState(1);
  const [duration, setDuration] = useState(1);
  const [pass, setPass] = useState();
  const [confirm, setConfirm] = useState();
  const [mess, setMess] = useState();
  const [date, setDate] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/studentSignup", {
        name,
        email,
        phone,
        college,
        admission,
        department,
        semester,
        duration,
        pass,
        confirm,
        mess,
        date,
      })
      .then((res) => {
        console.log(res);        
      })
      .catch((err) => console.log(err));
    document.getElementById("signupForm").reset();
  };
  return (
    <>
    <Modal onSubmit={null} message="Registered Successfully" onClose={null} />
      <div className="signupContainer">
        <div className="signupBox">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit} id="signupForm" method="POST">
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your Name"
                required
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="mail">Email</label>
              <input
                type="email"
                id="mail"
                placeholder="Enter your email address"
                required
                autoComplete="off"
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
                autoComplete="off"
                id="phnNumber"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/*\College Name*/}
            <div>
              <label htmlFor="clgName">College Name</label>
              <input
                type="text"
                placeholder="Enter your college name"
                required
                autoComplete="off"
                id="clgName"
                onChange={(e) => setCollege(e.target.value)}
              />
            </div>
            {/*Admission Number*/}
            <div>
              <label htmlFor="admsnNumber">Admission Number</label>
              <input
                type="text"
                placeholder="Enter your admission number"
                required
                autoComplete="off"
                id="admsnNumber"
                onChange={(e) => setAdmission(e.target.value)}
              />
            </div>
            {/*Department Name*/}
            <div>
              <label htmlFor="deptName">Department Name</label>
              <input
                type="text"
                placeholder="Enter your admission number"
                required
                autoComplete="off"
                id="deptName"
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>

            {/*Semester- choose between 1 to 6 considering three years courses also*/}
            <div>
              <label htmlFor="semester">Semester</label>
              <select
                name="semester"
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <option value="1">1st semester</option>
                <option value="2">2nd semester</option>
                <option value="3">3rd semester</option>
                <option value="4">4th semester</option>
                <option value="5">5th semester</option>
                <option value="6">6th semester</option>
              </select>
            </div>
            {/*Total Duration maximum 3 years*/}
            <div>
              <label htmlFor="totalDuration">Total Duration</label>
              <select
                name="duration"
                id="totalDuration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
              </select>
            </div>

            {/*Password*/}
            <div>
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                id="pass"
                placeholder="Enter a strong password"
                required
                autoComplete="off"
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
                autoComplete="off"
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="dateOfJoin">Date of Joining</label>
              <input
                type="date"
                name="dateOfJoin"
                id="dateOfJoin"
                onChange={(e) => setDate(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="paymentChoice">
              <label htmlFor="">Payment Done?</label>
              <label htmlFor="pyes">Yes</label>
              <input type="radio" name="pchoice" id="pyes" />
              <label htmlFor="pno">No</label>
              <input type="radio" name="pchoice" id="pno" />
              <div className="messChoice">
                <label htmlFor="messChoice">
                  Do you want our Mess service?
                </label>

                <label htmlFor="yes">Yes</label>
                <input
                  type="radio"
                  name="choice"
                  id="yes"
                  onClick={() => setMess("on")}
                />

                <label htmlFor="no">No</label>
                <input
                  type="radio"
                  name="choice"
                  id="no"
                  onClick={() => setMess("off")}
                />
              </div>
            </div>            

            <div>
              <label htmlFor="hPayment">Hostel Payment:</label>
              <select name="payment" id="hpay">
                <option value="12000">₹12,000</option>
                <option value="24000">₹24,000</option>
                <option value="36000">₹36,000</option>
              </select>
            </div>
            <div>
              <label htmlFor="mPayment">Mess Payment:</label>
             <input type="text" placeholder="Enter amount paid" />
            </div>
            <div className="formBtns">
              <a onClick={() => navigate("/loginas")}>Cancel</a>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
