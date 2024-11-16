import { useNavigate } from "react-router-dom";

const StaffLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/staffDashboard");
  }
  return (
    <>
      <div className="signupContainer" style={{margin: "10vh 0"}}>
        <div className="signupBox">
          <h1>Staff Login</h1>
          <form onSubmit={handleSubmit}>
            <section>
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
            </section>
            <section>
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
export default StaffLogin;
