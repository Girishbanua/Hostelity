import "../styles/_LoginAs.scss";
import { useNavigate } from "react-router-dom";

export default function LoginAs() {
  const navigate = useNavigate();
  return (
    <>
      <div className="LoginasContainer">
        <h1>Login as</h1>
        <section>
          <div className="loginAsUser">
            <section className="laImg"><img src="/images/loginasImages/user.png" alt="user icon" loading="lazy" /></section>
            <p>User</p>
            <div>
              <button className="lalbtn" onClick={() => navigate("/studentLogin")}>Login</button>
              <button onClick={() => navigate("/studentRegister")}>Register</button>
            </div>
          </div>
          <div className="loginAsStaff">
            <section className="laImg"><img src="/images/loginasImages/group.png" alt="staff icon" loading="lazy" /></section>
            <p>Staff</p>
            <div>
              <button className="lalbtn" onClick={() => navigate("/staffLogin")}>Login</button>
              <button onClick={() => navigate("/staffRegister")}>Register</button>
            </div>
          </div>
          <div className="loginAsAdmin">
            <section className="laImg"><img src="/images/loginasImages/setting.png" alt="admin icon" loading="lazy" /></section>
            <p>Admin</p>
            <div>
              <button className="lalbtn" onClick={() => navigate("/adminlogin")}>Login</button>
              <button onClick={() => navigate("/adminregister")}>Register</button>
            </div>
          </div>
        </section>
        <a onClick={() => navigate("/")}>Cancel</a>
      </div>
    </>
  );
}
