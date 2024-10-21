import "../../styles/_UserDashboard.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StudentPaymentHistory from "./StudentPaymentHistory";
import ChangeRoom from "./ChangeRoom";
import RoomInfo from "./RoomInfo";
import Issue from "./Issue";
import { motion, AnimatePresence } from "framer-motion";
import ProfileSettings from "./ProfileSettings";

export default function UserDashboard() {
  const LOGD_STDNTS_URL = "http://localhost:4000/api/loggedStudents";
  const TOTL_STDNTS_URL = "http://localhost:4000/api/total_Students";
  const navigate = useNavigate();
  const [stdntname, setStdntname] = useState("");
  const [count, setCount] = useState(null);

  // Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(LOGD_STDNTS_URL);
        const stdnt_Name = res.data.lgdStdnts;
        const lastStudentName = stdnt_Name[stdnt_Name.length - 1].name;
        setStdntname(lastStudentName);

        const response = await axios.get(TOTL_STDNTS_URL);
        setCount(response.data.count);
      } catch (err) {
        console.log("Error fetching data", err);
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array ensures this runs only once

  // Home Page Visibility
  const [visible, setVisible] = useState("home");
  const handleVisibility = (compName) => {
    setVisible(compName);
  };
  const handleCancel = () => {
    setVisible("home");
  };
  
  const DashboardHome = () => {
    return (
      <>
        <AnimatePresence>
          {visible === "home" && ( 
            <motion.div
              className="dashboard_container"
              initial={{ opacity: 0 }} 
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.25 }}
            >
              <div className="dashboard_navbar">
                <div className="userMenu">
                  <img
                    src="/images/Dashboard/AvatarPlaceholder.png"
                    alt="user_icon"
                    onClick={() => handleVisibility("profileSettings")}
                  />
                  <p>
                    Welcome <span>{`${stdntname}`}</span>
                  </p>
                  <select name="user_Menu" id="">
                    <option value="logout" onClick={() => navigate("/")}>
                      Logout
                    </option>
                    <option value="settings" onClick={() => handleVisibility("profileSettings")}>Settings</option>
                  </select>
                </div>
              </div>
              <h1>{`Hello ${stdntname.split(" ")[0]}`}</h1>
              <div className="details">
                <div className="info">
                  <div className="info_txt">
                    <h2>{count}</h2>
                    <p>Registered Students</p>
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
                  <button onClick={() => handleVisibility("changeRoom")}>
                    Change
                  </button>
                </div>
                <div className="action_menu">
                  <div className="info_txt">
                    <h3>Raise an Issue</h3>
                  </div>
                  <img src="/images/Dashboard/report-issue.png" alt="" />
                  <button onClick={() => handleVisibility("issue")}>
                    Raise
                  </button>
                </div>
                <div className="action_menu">
                  <div className="info_txt">
                    <h3>Payments</h3>
                  </div>
                  <img src="/images/Dashboard/qr-menu.png" alt="" />
                  <button onClick={() => handleVisibility("payHistory")}>
                    View
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          {visible === "changeRoom" && <ChangeRoom onCancel={handleCancel} />}
          {visible === "roomInfo" && <RoomInfo onCancel={handleCancel} />}
          {visible === "issue" && <Issue onCancel={handleCancel} />}
          {visible === "payHistory" && (
            <StudentPaymentHistory onCancel={handleCancel} />
          )}
          {
            visible === "profileSettings" && (
              <ProfileSettings onCancel={handleCancel} />
            )
          }
        </AnimatePresence>
      </>
    );
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: -150 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, staggerChildren: 0.5 },
    },
    stay: {
      opacity: 1,
    },
  };

  const hasAnimatedRef = useRef(false); // Ref to track if animation has occurred

  const SideBar = () => {
    return (
      <motion.div
        className="sideBar"
        variants={sidebarVariants}
        initial={!hasAnimatedRef.current ? "hidden" : "stay"}
        animate={!hasAnimatedRef.current ? "visible" : "stay"}
        transition={{ staggerChildren: 0.5 }}
        onAnimationComplete={() => {
          hasAnimatedRef.current = true; // Set the ref to true after animation completes
        }}
      >
        <motion.div className="logo" variants={sidebarVariants}>
          <a href="/">
            <img src="/images/Home_Page/hostelity_logo.png" alt="logo" />
          </a>
        </motion.div>
        <motion.div
          className="title"
          onClick={() => handleVisibility("home")}
          variants={sidebarVariants}
        >
          <img src="/images/Dashboard/Icon.png" alt="dashboard_icon" />
          <h3>Dashboard</h3>
        </motion.div>
        <motion.div className="features" variants={sidebarVariants}>
          <motion.h2 variants={sidebarVariants}>Features</motion.h2>
          <motion.div className="feature" variants={sidebarVariants}>
            <img src="/images/Dashboard/Vector-2.png" alt="icon" />
            <p onClick={() => handleVisibility("roomInfo")}>Room Info</p>
          </motion.div>
          <motion.div className="feature" variants={sidebarVariants}>
            <img src="/images/Dashboard/Vector-1.png" alt="icon2" />
            <p onClick={() => navigate("/messMenu")}>Mess Menu</p>
          </motion.div>
          <motion.div className="feature" variants={sidebarVariants}>
            <img src="/images/Dashboard/Vector.png" alt="icon3" />
            <p>Log Activities</p>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="userDashboard">
      <SideBar />
      <DashboardHome />
    </div>
  );
}
