import React, { createContext, useEffect, useState } from "react";
import app from "../Components/Firebase/Firebase.init"
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);
const user1 = auth.currentUser

export const fireAuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const githubProvider = new GithubAuthProvider();

const UserContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userSingOut = () => {
    return signOut(auth);
  };

  const deleteUser = () => {
     return deleteUser(user1)
  }

  const profileUpdate = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };


  const googleLoginPopUp = () => {
    return signInWithPopup(auth, googleProvider)
  }
  const githubLoginPopUp = () => {
    return signInWithPopup(auth, githubProvider)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    googleLoginPopUp,
    githubLoginPopUp,
    profileUpdate,
    createUser,
    signUser,
    userSingOut,
    deleteUser
  };
  return (
    <fireAuthContext.Provider value={value}>
      {children}
    </fireAuthContext.Provider>
  );
};

export default UserContext;