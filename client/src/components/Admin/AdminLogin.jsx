import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="signupContainer">
        <div className="signupBox">
          <h1>Admin Login</h1>
          <form>
            <div>
            <label htmlFor="name">User name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name or registered email"
                required
                autoComplete="off"                
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
export default AdminLogin;
