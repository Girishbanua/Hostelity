import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/_StudentSignUp.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StudentSignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [college, setCollege] = useState();
  const [admission, setAdmission] = useState();
  const [department, setDepartment] = useState();
  const [semester, setSemester] = useState("1");
  const [duration, setDuration] = useState("1");
  const [pass, setPass] = useState();
  const [confirm, setConfirm] = useState();
  const [date, setDate] = useState();
  const [seater, setSeater] = useState("4");
  const [pdone, setPdone] = useState("no");
  const [mess, setMess] = useState("off");
  const [hpay, setHpay] = useState("12000");
  const [mpay, setMpay] = useState("16000");
  const handleMessPay = (e) => {
    mess === "off" ? setMpay("0000") : setMpay(e.target.value);
  };

  const URL = "http://localhost:4000/api/studentSignup";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL, {
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
        seater,
        pdone,
        hpay,
        mpay,
      });
      console.log("response: ", response);
      if (
        response.data.message === "User created successfully" ||
        response.status === 201
      ) {
        toast.success("Registered successfully");
        document.getElementById("signupForm").reset();
        navigate("/loginas");
      } else {
        toast.error(`Please fill the data properly`);
      }
    } catch (err) {
      const error = err.response.data.message;
      console.log("Error while signup\n", error);
      toast.error(`${error}`);
      console.log("Error while signup\n", err.name, err.message);
    }
  };

  return (
    <>
      <div className="signupContainer">
        <div className="signupBox">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit} id="signupForm">
            <section className="personalInfo">
              <h2 className="heading">Personal Information</h2>
              {/*Name*/}
              <div className="p1">
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
              {/*Email*/}
              <div className="p2">
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
              <div className="">
                <label htmlFor="phnNumber">Contact Number</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  required
                  autoComplete="off"
                  id="phnNumber"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              {/*Permanent Address*/}
              <div className="">
                <label htmlFor="paddrs">Permanent Address</label>
                <textarea id="paddrs" cols="20" rows="5"></textarea>
              </div>              
            </section>
            <section>
            <h2>Academic Information</h2>
              {/*\College Name*/}
              <div className="">
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
              <div className="">
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
              <div className="">
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
              <div className="">
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
              <div className="">
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
            </section>
            <section>
              <h2>Parental Information</h2>
              <div>
                <label htmlFor="gname">Parent/Guardian Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your parent/guardian name"
                  required
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="rltnshp">Relationship with applicant</label>
                <input
                  type="text"
                  id="rltnshp"
                  placeholder="Enter relationship with applicant"
                  required
                  autoComplete="off"
                  // onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="rltnshp">Contact Number</label>
                <input
                  type="text"
                  id="rltnshp"
                  placeholder="Enter contact number of parent/guardian"
                  required
                  autoComplete="off"
                  // onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="addrs">Address</label>
                <textarea id="addrs" cols="20" rows="5"></textarea>
              </div>
            </section>
            <section className="hostelInfo">
              <h2>Hostel Information</h2>
              {/*Date of Joining*/}
              <div>
                <label htmlFor="dateOfJoin">Date of Joining</label>
                <input
                  type="date"
                  name="dateOfJoin"
                  id="dateOfJoin"
                  onChange={(e) => setDate(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>

              {/*Seater*/}
              <div>
                <label htmlFor="seater">Preferred Room Type</label>
                <select
                  name="seater"
                  id="seater"
                  onChange={(e) => setSeater(e.target.value)}
                  required
                >
                  <option value="1">Single</option>
                  <option value="2">Double</option>
                  <option value="3">Triple Sharing</option>
                  <option value="4">Quad Sharing</option>
                </select>
              </div>              
              <div className="paymentChoice">
                <label>Payment Done?</label>
                <label htmlFor="pyes">Yes</label>
                <input
                  type="radio"
                  name="pchoice"
                  id="pyes"
                  onClick={() => setPdone("yes")}
                />
                <label htmlFor="pno">No</label>
                <input
                  type="radio"
                  name="pchoice"
                  id="pno"
                  onClick={() => setPdone("no")}
                />                
              </div>
              {pdone === "no" && (                
                  <div className="account">
                    <p>Payment must be done before registration</p>
                    <label htmlFor="AccountNumber">Account Number</label>
                    <h1>55267763718</h1>
                    <h2>
                      <b>Hostel:</b> ₹12,000
                    </h2>
                    <h2>
                      <b>Mess:</b> ₹16,000 <small>(if required)</small>
                    </h2>
                    <div>
                      <button
                        onClick={() => {
                          setPdone("yes");
                        }}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
                {pdone === "yes" && (
                  <div className="messChoice">
                    <label>Do you want our Mess service?</label>
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
                )}
              {pdone === "yes" && (
                <div>
                  <label htmlFor="hPayment">Hostel Payment:</label>
                  <select
                    name="hpay"
                    id="hPayment"
                    onChange={(e) => setHpay(e.target.value)}
                  >
                    <option value="12000">₹12,000</option>
                    <option value="24000">₹24,000</option>
                    <option value="36000">₹36,000</option>
                  </select>
                </div>
              )}
              {mess === "on" && pdone === "yes" && (
                <div>
                  <label htmlFor="mPayment">Mess Payment:</label>
                  <select
                    name="mpay"
                    id="mPayment"
                    onChange={(e) => handleMessPay(e)}
                  >
                    <option value="16000">₹16,000</option>
                    <option value="24000">₹24,000</option>
                    <option value="32000">₹32,000</option>
                    <option value="48000">₹48,000</option>
                  </select>
                </div>
              )}
            </section>

            <section>
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
                  placeholder="Confirm your password"
                  required
                  autoComplete="off"
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
            </section>
            <section>
            <h2>Declaration</h2>
              <div>
                <input type="checkbox" name="" id="" />
                <p>
                  I hereby declare that all the information provided above is
                  correct to the best of my knowledge.
                </p>
              </div>
            </section>
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
