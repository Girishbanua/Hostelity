/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "../../styles/_UserDashboard.scss";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import StudentPaymentHistory from "./StudentPaymentHistory";
import ChangeRoom from "./ChangeRoom";
import UserContext from "../../context/UserContext";
import UserContextProvider from "../../context/UserContextProvider";

export default function UserDashboard() {
  const LOGD_STDNTS_URL = "http://localhost:4000/api/loggedStudents";
  const TOTL_STDNTS_URL = "http://localhost:4000/api/total_Students";
  const navigate = useNavigate();
  const [stdntname, setStdntname] = useState("");
  const [count, setCount] = useState(null);
  //Data Fetching
  useEffect(() => {
    axios
      .get(LOGD_STDNTS_URL)
      .then((res) => {
        const stdnt_Name = res.data.lgdStdnts;
        console.log(stdnt_Name[stdnt_Name.length - 1].name);
        setStdntname(stdnt_Name[stdnt_Name.length - 1].name);
      })
      .catch((err) => console.log("Error fetching name", err));
    console.log(stdntname);
    axios
      .get(TOTL_STDNTS_URL)
      .then((response) => setCount(response.data.count))
      .catch((error) => console.log("Error fetching count", error));
  }, [count]);
  //SideBar Animations
  const tl = gsap.timeline();
  useGSAP(() => {
    tl.from(
      [
        ".sideBar",
        ".sideBar .logo",
        ".sideBar .title",
        ".sideBar .title h3",
        ".sideBar .title p",
        ".sideBar .features h2",
        ".sideBar .features .feature img",
        ".sideBar .features .feature p",
      ],
      {
        opacity: 0,
        x: -100,
        duration: 1,
        ease: "power1.inOut",
        stagger: 0.2,
      }
    );
    gsap.from(".dashboard_navbar", {
      opacity: 0,
      x: 100,
      delay: 0.3,
      duration: 1,
      ease: "power1.inOut",
    });
    gsap.from([".dashboard_container h1", ".info", ".action_menu"], {
      opacity: 0,
      scale: 0.2,
      delay: 0.3,
      duration: 1,
      ease: "power1.inOut",
      stagger: 0.2,
    });
  });
  //*************** ContextAPI variables ****************  
  //Home Page
  const DashboardHome = () => {
    const { visible, handleVisibility } = useContext(UserContext);
    return (
      visible && (
        <div className="dashboard_container">
          <div className="dashboard_navbar">
            <div className="userMenu">
              <img
                src="/images/Dashboard/AvatarPlaceholder.png"
                alt="user_icon"
              />
              <p>
                Welcome <span>{`${stdntname}`}</span>
              </p>
              <select name="user_Menu" id="">
                <option value="logout">Logout</option>
                <option value="settings">Settings</option>
              </select>
            </div>
          </div>
          <h1>{`Hello ${stdntname.split(" ")[0]}`}</h1>
          <div className="details">
            <div className="info">
              <div className="info_txt">
                <h2>{count}</h2>
                <p>Registerd Students</p>
              </div>
              <img src="/images/Dashboard/people.png" alt="" />
            </div>
            <div className="info">
              <div className="info_txt">
                <h2>15</h2>
                <p>Total Rooms</p>
              </div>
              <img src="/images/Dashboard/bed.png" alt="" />
            </div>
            <div className="info">
              <div className="info_txt">
                <h2>7</h2>
                <p>Booked Rooms</p>
              </div>
              <img src="/images/Dashboard/book.png" alt="" />
            </div>
            <div className="action_menu">
              <div className="info_txt">
                <h3>Switch Room</h3>
              </div>
              <img src="/images/Dashboard/change.png" alt="change_icon" />
              <button onClick={() => handleVisibility()}>Change</button>
            </div>
            <div className="action_menu">
              <div className="info_txt">
                <h3>Raise an Issue</h3>
              </div>
              <img src="/images/Dashboard/report-issue.png" alt="" />
              <button onClick={() => navigate("/studentIssue")}>Raise</button>
            </div>
            <div className="action_menu">
              <div className="info_txt">
                <h3>Payments</h3>
              </div>
              <img src="/images/Dashboard/qr-menu.png" alt="" />
              <button onClick={() => navigate("/studentPayHistory")}>
                View
              </button>
            </div>
          </div>
        </div>
      )
    );
  };
  const SideBar = () => {
    return (
      <div className="sideBar">
        <div className="logo">
          <a href="/">
            <img src="/images/Home_Page/hostelity_logo.png" alt="logo" />
          </a>
        </div>
        <div className="title">
          <img src="/images/Dashboard/Icon.png" alt="dashboard_icon" />
          <h3 onClick={() => navigate("/user")}>Dashboard</h3>
        </div>
        <div className="features">
          <h2>Features</h2>
          <div className="feature">
            <img src="/images/Dashboard/Vector-2.png" alt="icon" />
            <p onClick={() => navigate("/roomInfo")}>Room Info</p>
          </div>
          <div className="feature">
            <img src="/images/Dashboard/Vector-1.png" alt="icon2" />
            <p onClick={() => navigate("/messMenu")}>Mess Menu</p>
          </div>
          <div className="feature">
            <img src="/images/Dashboard/Vector.png" alt="icon3" />
            <p>Log Activities</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="userDashboard">
        <SideBar />
        <UserContextProvider>
          <DashboardHome />
          <ChangeRoom />
        </UserContextProvider>
        {/* {!visible && <StudentPaymentHistory />} */}
      </div>
    </>
  );
}
