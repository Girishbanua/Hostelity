/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("StudentToken"));
  const [stdntID, setStdntID] = useState(localStorage.getItem("StudentID"));
  const [user, setUser] = useState("");

  const date = new Date();
  let formattedDate = date.toLocaleDateString();
  const [month, day, year] = formattedDate.split("/").map(Number);
  formattedDate = `${day}/${month}/${year}`;  

  let isLoggedIn = !!token;
  console.log("isLoggedIn", isLoggedIn);
  const storeTokenInLS = (token, stdntID) => {
    localStorage.setItem("StudentToken", token);
    localStorage.setItem("StudentID", stdntID);
    console.log("id: ", stdntID);
  };

  //logout functionality
  const logoutUser = async () => {
    setToken("");
    setStdntID("");
    localStorage.removeItem("StudentToken");
    localStorage.removeItem("StudentID");
    toast.success("Logged out successfully");
  };

  // JWT authentication

  useEffect(() => {
    const userAuthentication = async () => {
      try {
        const response = await axios.post("http://localhost:4000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ storeTokenInLS, logoutUser, token, isLoggedIn, user, stdntID, date, formattedDate }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  const contextValue = useContext(AuthContext);
  if (!contextValue) {
    throw new Error("UseAuth must be used within an AuthContextProvider");
  }
  return contextValue;
};
