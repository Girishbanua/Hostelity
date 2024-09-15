import FoodChart from "./components/FoodChart";
import Home from "./components/Home";
import { LoginSignup } from "./components/LoginSignup";
import Students from "./components/Students";
import UserDashboard from "./components/UserDashboard";
import { createBrowserRouter, RouterProvider} from "react-router-dom";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/user",
      element: <UserDashboard/>
    },
    {
      path: "/login",
      element: <LoginSignup />
    },
    {
      path: "/messMenu",
      element: <FoodChart />
    },
    {
      path: "/students",
      element: <Students />
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}