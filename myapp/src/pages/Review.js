import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
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
function Review(props) {
    const { carNumber } = useParams();
    //console.log("ㅊㅁㄱ",props.cars.carNumber);
    //const cars = props.contract.methods.getAllCars().call();
    //const 차량 = props.cars?.find((x) =>  x.carNumber == carNumber);
    //const [carNumber, setCarNumber] = useState();
    const [review, setReview] = useState();
    const [modelName, setModelName] = useState();
    const [dayOfWeek, setDayOfWeek] = useState();
    const [location, setLocation] = useState();
    const [rentalFee, setRentalFee] = useState();
    const [drivingFee, setDrivingFee] = useState();
    const navigate = useNavigate();

    const [post, setPost] = useState(false);

    
        // db.collection('product').get().then((결과)=>{
        //     결과.forEach((doc)=>{
        //         var 템플릿 = `<div>
                    
        //             <div>차량번호 : ${doc.data().차량번호}</div>
        //             <div>모델명 : ${doc.data().모델명}</div>
        //             <div>가능한 요일 : ${doc.data().요일}</div>
        //             <div>주차 장소 : ${doc.data().주차장소}</div>
        //             <div>대여료 : ${doc.data().대여료}</div>
        //             <div>주행료 : ${doc.data().주행료}</div>
        //             <div>등록날짜 : ${doc.data().날짜 && doc.data().날짜.toDate()}</div>
        //             <div><img src=${doc.data().이미지} alt='이미지'/></div>
        //           </div>`;
        //           document.getElementById("container mt-3").insertAdjacentHTML("afterend",
        //           템플릿);
        //           })
        // })
        
          useEffect(() => {
            (async () => {
               // console.log(carNumber);
            if (props.contract) {
                    // let temp = await props.contract.methods.getReservedDates(차량.carNumber).call();
                    // setExcludeDates(temp.map(dateString => parseISO(dateString)));
                    db.collection('product').where("차량번호","==", carNumber).get().then((결과)=>{
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
                }
            })();
        })
        async function Register() {
            
                    //   const storage = firebase.storage();
                    //   var file = document.querySelector('#image').files[0];
                    //   var storageRef = storage.ref();
                    //   var 저장할경로 = storageRef.child('image/' + file.name);
                    //   var 업로드작업 = 저장할경로.put(file)
              
                    //   업로드작업.on( 'state_changed', 
                    //       // 변화시 동작하는 함수 
                    //       null, 
                          //에러시 동작하는 함수
                        //   (error) => {
                        //   console.error('실패사유는', error);
                        //   }, 
                          // 성공시 동작하는 함수
                        //   () => {
                        //   업로드작업.snapshot.ref.getDownloadURL().then((url) => {
                        //       console.log('업로드된 경로는', url);
                        //       var 저장할거 = {
                        //   차량번호 : carNumber,
                        //   모델명 : modelName,
                        //   요일 : dayOfWeek,
                        //   주차장소 : location,
                        //   대여료 : rentalFee,
                        //   주행료 : drivingFee,
                        //   날짜 : new Date(),
                        //   이미지 : url
                        //   }
                          db.collection('product').where("차량번호","==", carNumber).get().then((result)=>{
                            result.forEach((doc)=>{
                                doc.ref.update({후기:review})
                            })
                              console.log(result);
                              setTimeout(()=>window.location.href = "/registration/success",500)
                          }).catch(()=>{
                              console.log()
                          })
                    //   );
                        }
        
    

  return (
    <div>
      <h1>리뷰해보세요</h1>
      <div id="container mt-3"></div> 
      <input placeholder="리뷰" onChange={ (e)=>{ setReview(e.target.value)}}></input>
      <button onClick={Register}>후기 등록하기</button>
    </div>
    
      
  );
}

export default Review;