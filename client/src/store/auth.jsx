/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("StudentToken"));
  const [stdntID, setStdntID] = useState(localStorage.getItem("StudentID"));
  const [user, setUser] = useState("");

  let isLoggedIn = !!token;
  console.log("isLoggedIn", isLoggedIn);
  const storeTokenInLS = (token, stdntID) => {
    localStorage.setItem("StudentToken", token);
    localStorage.setItem("StudentID", stdntID);
    console.log("id: ", stdntID);
  };
  
  //logout functionality
  const logoutUser = () => {
    setToken("");
    setStdntID("");
    localStorage.removeItem("studentToken")
    localStorage.removeItem("studentID")
  }

  // JWT authentication

  useEffect(() => {
    const userAuthentication = async () => {
      try{        
        const response = await axios.post("http://localhost:4000/api/user",{
          headers: {Authorization: `Bearer ${token}`},
        })
  
        if(response.ok){
          const data = await response.json();
          setUser(data)
        }
  
      } catch (err){
        console.log(err);
      }
    }
    userAuthentication();
  },[])

  return (
    <AuthContext.Provider value={{ storeTokenInLS, logoutUser, token, isLoggedIn, user, stdntID }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  const contextValue = useContext(AuthContext);
  if(!contextValue) {
    throw new Error("UseAuth must be used within an AuthContextProvider");
  }
  return contextValue;
};