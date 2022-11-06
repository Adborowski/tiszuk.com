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
import { v4 as uuidv4 } from "uuid";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  deleteDoc,
  getDoc,
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

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    console.log(user ? "Authed user: " + user.displayName : "No Auth");
  }, [user]);

  const q = query(collection(db, "posts"));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      setPosts(posts);
      console.log(posts);
    });
  }, []);

  const getDayOfWeek = (timestamp) => {
    var a = new Date(timestamp);
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var dayOfWeek = days[a.getDay()];

    return dayOfWeek;
  };

  const deletePost = async (id) => {
    console.log(id);
    const q = query(collection(db, "posts"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    let docId = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      docId = doc.id;
    });
    deleteDoc(doc(db, "posts", docId));
  };

  const sortedPosts = posts.sort((a, b) => b.timestamp - a.timestamp);
  return (
    <div className={styles.Posts}>
      {sortedPosts.map((post) => {
        return (
          <div className={styles.post} key={post.content + uuidv4()}>
            <div className={styles.imageContent}>
              <img src={post.imgUrl}></img>
            </div>
            <div className={styles.textContent}>
              <section className={styles.postMetadata}>
                <div className={styles.author}>{post.name}</div>
                <div className={styles.date}>
                  {getDayOfWeek(post.timestamp)}
                  {", "}
                  <SimpleDateTime dateSeparator={"/"} timeSeparator={":"}>
                    {post.timestamp / 1000}
                  </SimpleDateTime>
                </div>
                {user.displayName == post.name && (
                  <div
                    onClick={() => {
                      deletePost(post.id);
                    }}
                    className={styles.btnDelete}
                  >
                    <span>Delete</span>
                  </div>
                )}
              </section>
              <div className={styles.content}> {post.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
