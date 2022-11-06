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

import "firebaseui/dist/firebaseui.css";

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

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log("user has logged in");
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const postsRef = collection(db, "posts");
const q = query(postsRef);

const Posts = () => {
  const login = () => {
    console.log("Trying to log in...");

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(result.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("SIGN IN DETECTED:");
    console.log(user);
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

  const submitForm = (e) => {
    e.preventDefault();
    const docRef = addDoc(collection(db, "posts"), {
      name: author,
      content: content,
      timestamp: Date.now(),
    }).then((response) => {
      console.log(console.log("Document written with ID: ", response.id));
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
      <div className={styles.Writer}>
        <form onSubmit={submitForm}>
          <input
            placeholder="Your Name"
            onChange={onAuthorChange}
            name="author"
          ></input>
          <input
            placeholder="Your Message"
            onChange={onContentChange}
            name="content"
          ></input>
          <button type="submit">Submit </button>
        </form>

        <div onClick={login} className={styles.btnLogin}>
          LOG IN
        </div>
        <div className={styles.userProfile}>
          <div className={styles.userInfo}>{user ? user.displayName : ""}</div>
          <div className={styles.userInfo}>{user ? user.email : ""}</div>
          <div className={styles.userInfo}>
            {user ? <img src={user.photoUrl} /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
