import "../../styles/_UserDashboard.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:4000/count")
      .then((response) => setCount(response.data.count))
      .catch((error) => console.log("Error fetching count", error));
  }, []);

  return (
    <>
      <div className="dashboard_container">
        <div className="dashboard_navbar">
          <div className="userMenu">
            <img
              src="/images/Dashboard/AvatarPlaceholder.png"
              alt="user_icon"
            />
            <p>
              Welcome <span>User</span>
            </p>
            <select name="user_Menu" id=""></select>
          </div>
        </div>
        <h1>Hello, User!</h1>
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
              <h3>Change Room</h3>
            </div>
            <img src="/images/Dashboard/change.png" alt="change_icon" />
            <button onClick={() => navigate("/changeRoom")}>Change</button>
          </div>
          <div className="action_menu">
            <div className="info_txt">
              <h3>Raise an Issue</h3>
            </div>
            <img src="/images/Dashboard/report-issue.png" alt="" />
            <button onClick={() => navigate("/studentIssue")} >Raise</button>
          </div>
          <div className="action_menu">
            <div className="info_txt">
              <h3>Mess Menu</h3>
            </div>
            <img src="/images/Dashboard/qr-menu.png" alt="" />
            <button onClick={() => navigate("/messMenu")} >View</button>
          </div>
        </div>
      </div>
      <div className="sideBar">
        <div className="logo">
          <a href="/">
            <img src="/images/Home_Page/hostelity_logo.png" alt="logo" />
          </a>
        </div>
        <div className="title">
          <img src="/images/Dashboard/Icon.png" alt="dashboard_icon" />
          <h3>Dashboard</h3>
        </div>
        <div className="features">
          <h2>Features</h2>
          <div className="feature">
            <img src="/images/Dashboard/Vector-2.png" alt="icon" />
            <p>Book Hostel</p>
          </div>
          <div className="feature">
            <img src="/images/Dashboard/Vector-1.png" alt="icon2" />
            <p>Room Info</p>
          </div>
          <div className="feature">
            <img src="/images/Dashboard/Vector.png" alt="icon3" />
            <p>Log Activities</p>
          </div>
        </div>
      </div>
    </>
  );
}