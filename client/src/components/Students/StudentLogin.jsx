import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UseAuth } from "../../store/auth";

const StudentLogin = () => {
  const { storeTokenInLS } = UseAuth();
  const navigate = useNavigate();
  const [usermail, setUsermail] = useState("");
  const [password, setPassword] = useState("");

  const LOGIN_URL = "http://localhost:4000/api/studentLogin";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, {
        email: usermail,
        pass: password,
      });
      console.log("response: ", response.data);

      if (response.status === 200) {
        navigate("/user");
        toast.success("Login successful");
        await storeTokenInLS(response.data.token, response.data.userID);
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log("Error while login\n", error.code, error.name);
      toast.error(`Invalid Credentials!!`);
    }
  };
  return (
    <>
      <div className="signupContainer" style={{ margin: "10vh 0" }}>
        <div className="signupBox">
          <h1>User Login</h1>
          <form onSubmit={handleLogin}>
            <section>
              <div>
                <label htmlFor="name">User Mail</label>
                <input
                  type="email"
                  id="name"
                  name="email"
                  placeholder="Enter your registered email"
                  required
                  autoComplete="off"
                  value={usermail}
                  onChange={(e) => setUsermail(e.target.value)}
                />
              </div>
            </section>
            <section>
              <div>
                <label htmlFor="pass">Password</label>
                <input
                  type="password"
                  id="pass"
                  name="pass"
                  placeholder="Enter your password"
                  required
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
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
export default StudentLogin;
