import "../../styles/_UserDashboard.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import Announcement from "./Announcement";
import CreateAdmin from "./CreateAdmin";
import CreateRoom from "./CreateRoom";
import Requests from "./Requests";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [greet, setGreet] = useState("");
  // Home Page Visibility
  const [visible, setVisible] = useState("home");
  const handleVisibility = (compName) => {
    setVisible(compName);
  };
  const handleCancel = () => {
    setVisible("home");
  };
  useEffect(() => {
    const dt = new Date();
    console.log("date: ", dt);
    let time = dt.toTimeString();
    time = time.split(":")[0];
    console.log("time: ", time);
    time < "12"
      ? setGreet("Good Morning")
      : time < "17"
      ? setGreet("Good Afternoon")
      : setGreet("Good Evening");
  }, []);

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
                    Welcome <span>{`Admin`}</span>
                  </p>
                  <select name="user_Menu" id="">
                    <option value="logout" onClick={() => navigate("/")}>
                      Logout
                    </option>
                    <option
                      value="settings"
                      onClick={() => handleVisibility("profileSettings")}
                    >
                      Settings
                    </option>
                  </select>
                </div>
              </div>
              <h1>{`${greet} Admin`}</h1>
              <div
                className="details"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                <div className="action_menu">
                  <div className="info_txt">
                    <h3>Create Announcement</h3>
                  </div>
                  <img
                    src="/images/Dashboard/announcement.png"
                    alt="student requests"
                  />
                  <button onClick={() => handleVisibility("announcement")}>
                    Create
                  </button>
                </div>
                <div className="action_menu">
                  <div className="info_txt">
                    <h3>Create Admin</h3>
                  </div>
                  <img
                    src="/images/Dashboard/newadmin.png"
                    alt="create admin"
                  />
                  <button onClick={() => handleVisibility("createAdmin")}>
                    Create
                  </button>
                </div>
                <div className="action_menu">
                  <div className="info_txt">
                    <h3>Create Room</h3>
                  </div>
                  <img src="/images/Dashboard/newroom.png" alt="create room" />
                  <button onClick={() => handleVisibility("createRoom")}>
                    Create
                  </button>
                </div>
                <div className="action_menu">
                  <div className="info_txt">
                    <h3>Add Students</h3>
                  </div>
                  <img
                    src="/images/Dashboard/newstudent.png"
                    alt="new student"
                  />
                  <button onClick={() => navigate("/studentRegister")}>
                    Add
                  </button>
                </div>
                <div className="action_menu">
                  <div className="info_txt">
                    <h3>Add Staff</h3>
                  </div>
                  <img
                    src="/images/Dashboard/team.png"
                    alt="student requests"
                  />
                  <button onClick={() => handleVisibility("addStaff")}>
                    Create
                  </button>
                </div>
                <div className="action_menu">
                  <div className="info_txt">
                    <h3>Student requests</h3>
                  </div>
                  <img
                    src="/images/Dashboard/requests.png"
                    alt="student requests"
                  />
                  <button onClick={() => handleVisibility("requests")}>
                    View Requests
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          {visible === "announcement" && (
            <Announcement onCancel={handleCancel} />
          )}
          {visible === "createAdmin" && <CreateAdmin onCancel={handleCancel} />}
          {visible === "createRoom" && <CreateRoom onCancel={handleCancel} />}
          {/* {visible === "addStaff" && <AddStaff onCancel={handleCancel} />} */}
          {visible === "requests" && <Requests onCancel={handleCancel} />}
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
          <h3>Admin Dashboard</h3>
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
