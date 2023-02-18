import "./App.css";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";

import AuthProvider from "./context/AuthContext";
import { ProtectedRoutes } from "./components";
import React from "react";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
