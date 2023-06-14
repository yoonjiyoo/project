import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes,Route, Switch, Redirect } from "react-router-dom";
import App from "./App"
import reportWebVitals from './reportWebVitals';

import firebase from "firebase/app";
import "firebase/firestore";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

const firebaseConfig = {
  apiKey: "AIzaSyAfZFr4MYXSVkbLcaCsjbR45cBWY8-ahVI",
  authDomain: "hahaha-2c25a.firebaseapp.com",
  projectId: "hahaha-2c25a",
  storageBucket: "hahaha-2c25a.appspot.com",
  messagingSenderId: "1075972265754",
  appId: "1:1075972265754:web:4e0c54e6b85ebd804efea3"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter >
        <App/>
  </BrowserRouter>
);

reportWebVitals();
