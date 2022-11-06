import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import "./firebase.js";
import Login from "../src/components/Login/Login";
import Twitszuk from "./routes/Twitszuk";
import Posts from "/src/components/Posts/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className={"main"}>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
