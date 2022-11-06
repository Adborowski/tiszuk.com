import styles from "./Posts.module.css";
import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";

import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
} from "firebase/auth";

const Writer = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyC3A9C3kunccnIazu2gc2QseIFcKDTnfNY",
    authDomain: "tiszuk-63654.firebaseapp.com",
    projectId: "tiszuk-63654",
    storageBucket: "tiszuk-63654.appspot.com",
    messagingSenderId: "745691682947",
    appId: "1:745691682947:web:7cd612382a726573c763b6",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    // console.log(user);
  }, [user]);

  const submitForm = (e) => {
    e.preventDefault();
    const docRef = addDoc(collection(db, "posts"), {
      id: uuidv4(),
      name: user.displayName,
      content: content,
      imgUrl: user.photoURL,
      timestamp: Date.now(),
    }).then((response) => {
      console.log("Document written with ID: ", response.id);
    });
  };

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  const onAuthorChange = (e) => {
    setAuthor(e.target.value);
  };
  return (
    <div className={styles.Writer}>
      <form onSubmit={submitForm}>
        <textarea
          className={styles.message}
          placeholder="Your Message"
          onChange={onContentChange}
          name="content"
        ></textarea>
        <button type="submit">Submit </button>
      </form>
    </div>
  );
};

export default Writer;
