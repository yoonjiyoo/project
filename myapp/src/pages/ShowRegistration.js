import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DaumPost from "../components/DaumPost";
import {db} from '../index.js'
import "firebase/firestore"; 
import 'firebase/storage';
import firebase from "firebase/app";

<div>
<script src="https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.6.5/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.6.5/firebase-firestore.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.6.5/firebase-storage.js"></script>
  
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script> 
  </div>
function ShowRegistration(props) {
    const [carNumber, setCarNumber] = useState();
    const [modelName, setModelName] = useState();
    const [dayOfWeek, setDayOfWeek] = useState();
    const [location, setLocation] = useState();
    const [rentalFee, setRentalFee] = useState();
    const [drivingFee, setDrivingFee] = useState();
    const navigate = useNavigate();

    const [post, setPost] = useState(false);

    
        db.collection('product').get().then((결과)=>{
            결과.forEach((doc)=>{
                var 템플릿 = `<div>
                    
                    <div>차량번호 : ${doc.data().차량번호}</div>
                    <div>모델명 : ${doc.data().모델명}</div>
                    <div>가능한 요일 : ${doc.data().요일}</div>
                    <div>주차 장소 : ${doc.data().주차장소}</div>
                    <div>대여료 : ${doc.data().대여료}</div>
                    <div>주행료 : ${doc.data().주행료}</div>
                    <div>등록날짜 : ${doc.data().날짜 && doc.data().날짜.toDate()}</div>
                    <div><img src=${doc.data().이미지} alt='이미지'/></div>
                  </div>`;
                  document.getElementById("container mt-3").insertAdjacentHTML("afterend",
                  템플릿);
                  })
        })
    
        
    

  return (
    <div>
      <h1>차량 등록 정보</h1>
      <div id="container mt-3"></div> 
    </div>
    
      
  );
}

export default ShowRegistration;