import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AuthProvider from "./context/AuthContext";
import { ProtectedRoutes } from "./components";
import React from "react";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
