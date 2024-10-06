import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [usermail, setUsermail] = useState("");
  const [password, setPassword] = useState("");

  const URL = "http://localhost:4000/api/studentLogin";

  const handleLogin = async (e) => {
    e.preventDefault();
     
    try {
      const response = await axios.post(URL, {email: usermail, pass: password});
      if (response.data.message === "Login successful") {
        localStorage.setItem("studentToken", response.data.token);
        localStorage.setItem("studentID", response.data.userID);
        navigate("/");
        alert("Login successful");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log("Error while login\n", error.code, error.name);
    }
  };
  return (
    <>
      <div className="signupContainer">
        <div className="signupBox">
          <h1>User Login</h1>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="name">User Mail</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your registered email"
                required
                autoComplete="off"
                value={usermail}
                onChange={(e) => setUsermail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                id="pass"
                placeholder="Enter your password"
                required
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="formBtns">
              <a onClick={() => navigate("/loginas")}>Cancel</a>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default StudentLogin;
