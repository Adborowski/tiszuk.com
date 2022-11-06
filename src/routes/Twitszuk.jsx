import { useEffect } from "react";
import Posts from "../components/Posts/Posts";
import Writer from "../components/Posts/Writer";
import styles from "../App.module.css";
import Login from "../components/Login/Login";
import Nav from "../components/Nav/Nav";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "/src/firebase";

const Twitszuk = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className={styles.Twitszuk}>
      {user && <Nav />}
      <Login />
      <h1>Twitszuk</h1>
      <div className={styles.postConsole}>
        {user && <Writer />}
        {user && <Posts />}
      </div>
    </div>
  );
};

export default Twitszuk;
