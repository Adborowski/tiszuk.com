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
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    // if (user) navigate("/posts");
  }, [user, loading]);

  return (
    <div className={styles.authControls}>
      {!user && (
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Sign In with Google
        </button>
      )}
      {user && (
        <div className={styles.welcome}>Welcome, {user.displayName}</div>
      )}
      {loading && <div className={styles.welcome}>Please wait...</div>}
      {user && <button onClick={logout}>Sign Out</button>}
    </div>
  );
};

export default Login;
