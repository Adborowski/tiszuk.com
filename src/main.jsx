import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./firebase.js";
import Twitszuk from "./routes/Twitszuk";
import styles from "/src/App.module.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className={styles.main}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/twitszuk" element={<Twitszuk />} />
        </Routes>
      </Router>
    </div>
  </React.StrictMode>
);
