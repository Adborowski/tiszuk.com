import Posts from "../components/Posts/Posts";
import Writer from "../components/Posts/Writer";
import styles from "../App.module.css";
import Login from "../components/Login/Login";

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

const Twitszuk = () => {
  return (
    <div className={styles.Twitszuk}>
      <Posts />
      <Writer />
    </div>
  );
};

export default Twitszuk;
