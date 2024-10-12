/* eslint-disable react/prop-types */
import { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const handleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <UserContext.Provider value={{ visible, setVisible, handleVisibility }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider
