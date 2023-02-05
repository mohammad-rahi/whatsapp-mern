import React, { useEffect } from "react";

import Home from "../pages";
import Loading from "./Loading";
import SignIn from "../pages/signin";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { user, authLoading } = useAuth();

  return (
    <>{authLoading ? <Loading /> : <>{user.uid ? <Home /> : <SignIn />}</>}</>
  );
};

export default ProtectedRoutes;
