import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [congratulation, setCongratulation] = useState(false);

  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const value = {
    loading,
    user,
    googleLogIn,
    logOut,
    reload,
    setReload,
    congratulation,
    setCongratulation,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
