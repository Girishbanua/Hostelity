import "../styles/_LoginAs.scss";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

export default function LoginAs() {
  const navigate = useNavigate();
  
  useGSAP(() => {
    gsap.from(".LoginasContainer h1", {
      opacity: 0,
      y: -100,
      duration: 1,
      ease: "power1.inOut",
    })
    gsap.from(".loginCard", {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "power1.inOut",
      stagger: 0.3,
    })
  })

  return (
    <>
      <div className="LoginasContainer">
        <h1>Login as</h1>
        <section>
          <div className="loginCard">
            <section className="laImg"><img src="/images/loginasImages/user.png" alt="user icon" loading="lazy" /></section>
            <p>User</p>
            <div>
              <button className="lalbtn" onClick={() => navigate("/studentLogin")}>Login</button>
              <button onClick={() => navigate("/studentRegister")}>Register</button>
            </div>
          </div>
          <div className="loginCard">
            <section className="laImg"><img src="/images/loginasImages/group.png" alt="staff icon" loading="lazy" /></section>
            <p>Staff</p>
            <div>
              <button className="lalbtn" onClick={() => navigate("/staffLogin")}>Login</button>
              <button onClick={() => navigate("/staffRegister")}>Register</button>
            </div>
          </div>
          <div className="loginCard">
            <section className="laImg"><img src="/images/loginasImages/setting.png" alt="admin icon" loading="lazy" /></section>
            <p>Admin</p>
            <div>
              <button className="lalbtn" onClick={() => navigate("/adminlogin")}>Login</button>              
            </div>
          </div>
        </section>        
          <button className="cancel" onClick={() => navigate("/")}>Cancel</button>        
      </div>
    </>
  );
}
