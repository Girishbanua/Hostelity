import FoodChart from "./components/FoodChart";
import Home from "./components/Home";
import LoginAs from "./components/LoginAs";
import Students from "./components/Students/Students";
import StudentLogin from "./components/Students/StudentLogin";
import StudentSignUp from "./components/Students/StudentSignUp";
import UserDashboard from "./components/Students/UserDashboard";
import StaffLogin from "./components/MessStaff/StaffLogin";
import StaffRegister from "./components/MessStaff/StaffRegister";
import MessStaffDetails from "./components/MessStaff/MessStaffDetails";
import AdminLogin from "./components/Admin/AdminLogin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminRegister from "./components/Admin/AdminRegister";
import Issue from "./components/Students/Issue";
import RoomInfo from "./components/Students/RoomInfo";
import StaffDashboard from "./components/MessStaff/StaffDashboard";
import MessAttendance from "./components/MessStaff/MessAttendance";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/user",
      element: <UserDashboard />,
    },
    {
      path: "/loginas",
      element: <LoginAs />,
    },
    {
      path: "/studentRegister",
      element: <StudentSignUp />,
    },
    {
      path: "/studentLogin",
      element: <StudentLogin />,
    },
    {
      path: "/staffLogin",
      element: <StaffLogin />,
    },
    {
      path: "/staffRegister",
      element: <StaffRegister />,
    },
    {
      path: "/staffDetails",
      element: <MessStaffDetails />,
    },
    {
      path: "/staffDashboard",
      element: <StaffDashboard />,
    },
    {
      path: "/messAttendance",
      element: <MessAttendance />,
    },
    {
      path: "/adminlogin",
      element: <AdminLogin />,
    },
    {
      path: "/adminregister",
      element: <AdminRegister />,
    },
    {
      path: "/messMenu",
      element: <FoodChart />,
    },
    {
      path: "/students",
      element: <Students />,
    },
    {
      path: "/studentIssue",
      element: <Issue />,
    },
    {
      path: "/roomInfo",
      element: <RoomInfo />,
    },  
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
