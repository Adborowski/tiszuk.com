import styles from "./Posts.module.css";
import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import SimpleDateTime from "react-simple-timestamp-to-date";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "/src/components/Login/Login";

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

const firebaseConfig = {
  apiKey: "AIzaSyC3A9C3kunccnIazu2gc2QseIFcKDTnfNY",
  authDomain: "tiszuk-63654.firebaseapp.com",
  projectId: "tiszuk-63654",
  storageBucket: "tiszuk-63654.appspot.com",
  messagingSenderId: "745691682947",
  appId: "1:745691682947:web:7cd612382a726573c763b6",
};

const firebase = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const postsRef = collection(db, "posts");
const q = query(postsRef);

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    console.log(user ? "Authed user: " + user.displayName : "No Auth");
  }, [user]);

  const fetchPosts = async () => {
    await getDocs(collection(db, "posts")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(newData);
      setPosts(newData);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.Posts}>
      {posts.map((post) => {
        return (
          <div className={styles.post} key={post.content}>
            <div className={styles.date}>
              <SimpleDateTime>{post.timestamp / 1000}</SimpleDateTime>
            </div>
            <div className={styles.author}>{post.name}</div>
            {post.content}
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
