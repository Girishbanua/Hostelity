import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const AdminLogin = () => {

  const navigate = useNavigate();
  const [usermail, setUsermail] = useState("");
  const [password, setPassword] = useState("");

  const LOGIN_URL = "http://localhost:4000/api/admin";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, {
        email: usermail,
        pass: password,
      });
      console.log("response: ", response.data);

      if (response.status === 200) {
        navigate("/adminDashboard");
        toast.success("Login successful");        
      } else {
        alert("Invalid credentials");
        console.log("response", response);
      }
    } catch (error) {
      console.log("Error while login\n", error.code, error.name);
      toast.error(`Invalid Credentials!!`);
    }
  };

  return (
    <>
      <div className="signupContainer" style={{margin: "10vh 0"}}>
        <div className="signupBox">
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <section>
            <label htmlFor="name">User name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name or registered email"
                required
                autoComplete="off"   
                onChange={(e) => setUsermail(e.target.value)}             
              />
            </section>
            <section>
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                id="pass"
                placeholder="Enter your password"
                required
                autoComplete="off"    
                onChange={(e) => setPassword(e.target.value)}            
              />
            </section>
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
export default AdminLogin;
