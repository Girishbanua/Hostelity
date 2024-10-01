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
import ChangeRoom from "./components/Students/ChangeRoom";
import Issue from "./components/Students/Issue";

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
      path: "/changeRoom",
      element: <ChangeRoom />,
    },
    {
      path: "/studentIssue",
      element: <Issue />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
