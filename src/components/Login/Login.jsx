import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle, logout } from "/src/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user ? "Authed user: " + user.displayName : "No Auth");
  }, [user]);
  // const first = str.split(' ')[0]
  return (
    <div className={styles.authControls}>
      {!user && (
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          <span>Sign In with Google</span>
        </button>
      )}
      {user && (
        <button onClick={logout}>
          {" "}
          <span>Sign Out</span>
        </button>
      )}
    </div>
  );
};

export default Login;
