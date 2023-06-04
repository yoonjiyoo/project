import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
