import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import React from "react";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./store/auth.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </React.StrictMode>
  </AuthContextProvider>
);
