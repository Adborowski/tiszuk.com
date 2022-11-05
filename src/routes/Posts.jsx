import styles from "./Posts.module.css";
import { initializeApp } from "firebase/app";
import { useState } from "react";
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

const postsRef = collection(db, "posts");

const q = query(postsRef);
const querySnapshot = await getDocs(q);
let posts = [];
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  posts.push(doc.data());
});

console.log(posts);

const Posts = () => {
  //
  const submitForm = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "posts"), {
      name: author,
      content: content,
    });
    console.log("Document written with ID: ", docRef.id);
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
      </div>
    </div>
  );
};

export default Posts;
