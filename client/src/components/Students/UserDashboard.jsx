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
  // const LOGD_STDNTS_URL = "http://localhost:4000/api/loggedStudents";
  const REGSTRD_STDNTS_URL = "http://localhost:4000/api/registered_Students";
  const navigate = useNavigate();
  const [stdntname, setStdntname] = useState("");
  const [hpay, setHpay] = useState("0.00");
  const [mpay, setMpay] = useState("0.00");
  const [stdntData, setStdntData] = useState();
  const [pdate, setPdate] = useState("");
  const [totalHExpInNDays, setTotalHExpInNDays] = useState("");
  const [totalMExpInNDays, setTotalMExpInNDays] = useState("");
  const [nDays, setNdays] = useState(0);
  const [roomNum, setRoomNum] = useState("");
  const [roomType, setRoomType] = useState("");
  
  //************* Logged student's Data Fetching*********************
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios.get(LOGD_STDNTS_URL);
        // const stdnt_Name = res.data.lgdStdnts;
        // const lastStudentName = stdnt_Name[stdnt_Name.length - 1].name;
        const stId = localStorage.getItem("StudentID");
        const res = await axios.get(REGSTRD_STDNTS_URL);
        const StudentData = res.data.filter((student) => student._id === stId);
        console.log("res data:", StudentData);
        setStdntname(StudentData[0].name);
        setHpay(StudentData[0].hpay);
        setMpay(StudentData[0].mpay);
        setPdate(StudentData[0].date);
        setRoomNum(StudentData[0].roomnum);
        setRoomType(StudentData[0].seater);
        setStdntData(StudentData);
      } catch (err) {
        console.log("Error fetching data", err);
      }
    };
    fetchData();
  }, []);

  //***************Expense Calculation***************************
  useEffect(() => {
    if (stdntData && stdntData.length > 0) {
      const hExpnsPday = () => {
        let crntDt = new Date();
        let DoJ = stdntData[0].date;
        let [day, month, year] = DoJ.split("/").map(Number);
        let DoJDate = new Date(year, month - 1, day);

        let diff = crntDt - DoJDate;
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));

        let pDayExpns = 100;
        setTotalHExpInNDays(hpay - pDayExpns * days);
        Number(mpay) === 0
          ? setTotalMExpInNDays(0)
          : setTotalMExpInNDays(mpay - pDayExpns * days);
        setNdays(days);
      };
      hExpnsPday();
    }
  }, [stdntData, hpay, totalHExpInNDays, totalMExpInNDays, mpay]);

  const lpay = String(Number(hpay) + Number(mpay));

  //fetching data from the mess attendance
  

  //*******function for adding a comma inbetween the number*****
  const addComma = (num) => {
    if (num.length > 3) {
      if (num.length > 4) {
        if (num.length > 5) num = num.slice(0, 3) + "," + num.slice(3);
        else num = num.slice(0, 2) + "," + num.slice(2);
      } else num = num.slice(0, 1) + "," + num.slice(1);
    }
    return num;
  };

  //********* */ Home Page Visibility/*********** */
  const [visible, setVisible] = useState("home");
  const handleVisibility = (compName) => {
    setVisible(compName);
  };
  const handleCancel = () => {
    setVisible("home");
  };
  const messOn = mpay > 0 ? true : false;
  
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
                    <option
                      value="settings"
                      onClick={() => handleVisibility("profileSettings")}
                    >
                      Settings
                    </option>
                  </select>
                </div>
              </div>
              <h1>{`Hello ${stdntname.split(" ")[0]}`}</h1>
              <div className="details">
                <div className="info hdue">
                  <h3>Hostel Balance</h3>
                  <h2>₹{addComma(String(totalHExpInNDays))}</h2>
                </div>
                {messOn && (
                  <div className="info mdue">
                    <h3>Mess Balance</h3>
                    <h2>₹{addComma(String(totalMExpInNDays))}</h2>
                  </div>
                )}

                <div className="action_menu menu1">
                  <div className="info_txt">
                    <h3>Switch Room</h3>
                  </div>
                  <img src="/images/Dashboard/change.png" alt="change_icon" />
                  <button onClick={() => handleVisibility("changeRoom")}>
                    Change
                  </button>
                </div>
                <div className="action_menu menu2">
                  <div className="info_txt">
                    <h3>Raise an Issue</h3>
                  </div>
                  <img src="/images/Dashboard/report-issue.png" alt="" />
                  <button onClick={() => handleVisibility("issue")}>
                    Raise
                  </button>
                </div>
                <div className="action_menu menu3">
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
          {visible === "changeRoom" && (
            <ChangeRoom onCancel={handleCancel} roomNum={roomNum} />
          )}
          {visible === "roomInfo" && (
            <RoomInfo
              onCancel={handleCancel}
              roomNum={roomNum}
              roomType={roomType}
            />
          )}
          {visible === "issue" && (
            <Issue onCancel={handleCancel} roomNum={roomNum} />
          )}
          {visible === "payHistory" && (
            <StudentPaymentHistory
              onCancel={handleCancel}
              name={stdntname}
              lpay={addComma(lpay)}
              pdate={pdate}
              messOn={messOn}
              balance={addComma(String(totalHExpInNDays + totalMExpInNDays))}
              days={nDays}
              mrem={mpay / 100 - nDays * 2}
              H
            />
          )}
          {visible === "profileSettings" && (
            <ProfileSettings onCancel={handleCancel} stdntData={stdntData} />
          )}
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
