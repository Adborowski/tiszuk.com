import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./firebase.js";
import Twitszuk from "./routes/Twitszuk";
import Restiwal from "./components/Restiwal/Restiwal.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/twitszuk" element={<Twitszuk />} />
        <Route path="/restiwal" element={<Restiwal />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
