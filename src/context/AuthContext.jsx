import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { auth } from "../config/firebase";
import axios from "../axios";
import { useContext } from "react";

const AuthContext = React.createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (authUser) => {
        if (authUser && authUser.uid) {
          setUser(authUser);
          setAuthLoading(false);
        }
      },
      (err) => {
        console.error(err.message);
        setAuthLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    if (user && user.uid) {
      axios
        .get(`/users/sync/${user.uid}`)
        .then((res) => {
          if (!res.data._id) {
            axios
              .post("/users/new", {
                displayName: user.displayName,
                email: user.email,
                uid: user.uid,
                photoURL: user.photoURL,
              })
              .then((res) => console.log(res))
              .catch((err) => console.error(err));
          }
        })
        .catch((err) => {
          console.error(err);
        });

      axios
        .get("/users/sync")
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => console.error(err));
    } else {
      setAuthLoading(false);
    }
  }, [user]);

  const signin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(errorCode, errorMessage, email, credential);
    }
  };

  const signout = async () => {
    try {
      await signOut(auth);

      setUser({});
      setUsers([]);
    } catch (error) {
      console.error(error);

      setUser({});
      setUsers([]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        signin,
        signout,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default AuthProvider;
