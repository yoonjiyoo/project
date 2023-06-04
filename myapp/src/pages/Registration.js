import React, { useState } from "react";
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
function Registration(props) {
    const [carNumber, setCarNumber] = useState();
    const [modelName, setModelName] = useState();
    const [dayOfWeek, setDayOfWeek] = useState();
    const [location, setLocation] = useState();
    const [rentalFee, setRentalFee] = useState();
    const [drivingFee, setDrivingFee] = useState();
    const navigate = useNavigate();

    const [post, setPost] = useState(false);

    function getCurrentDateTime() {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
      
        const formattedDateTime = `${year}${month}${day}${hours}${minutes}`;
        return formattedDateTime;
    }

    async function Register() {
        if (props.web3 && props.contract) {
            try {
              const accounts = await props.web3.eth.getAccounts();
              console.log(accounts[0]);
              props.setCars(await props.contract.methods.getAllCars().call()); // 시간 텀이 지나야 이전 결과가 반영된 
              console.log(props.cars);
              console.log(props.cars.filter(x => x.carNumber == carNumber));
              if (props.cars.filter(x => x.carNumber == carNumber).length == 0) {
                  await props.contract.methods.addCar(
                      carNumber, 
                      modelName, 
                      dayOfWeek,
                      location,
                      rentalFee,
                      drivingFee,
                      getCurrentDateTime()
                  ).send({ from: accounts[0] });
                  const storage = firebase.storage();
                  var file = document.querySelector('#image').files[0];
                  var storageRef = storage.ref();
                  var 저장할경로 = storageRef.child('image/' + file.name);
                  var 업로드작업 = 저장할경로.put(file)
          
                  업로드작업.on( 'state_changed', 
                      // 변화시 동작하는 함수 
                      null, 
                      //에러시 동작하는 함수
                      (error) => {
                      console.error('실패사유는', error);
                      }, 
                      // 성공시 동작하는 함수
                      () => {
                      업로드작업.snapshot.ref.getDownloadURL().then((url) => {
                          console.log('업로드된 경로는', url);
                          var 저장할거 = {
                      차량번호 : carNumber,
                      모델명 : modelName,
                      요일 : dayOfWeek,
                      주차장소 : location,
                      대여료 : rentalFee,
                      주행료 : drivingFee,
                      날짜 : new Date(),
                      이미지 : url
                      }
                      db.collection('product').add(저장할거).then((result)=>{
                          console.log(result);
                          setTimeout(()=>window.location.href = "/registration/success",500)
                      }).catch(()=>{
                          console.log()
                      })
                      });
                      }
                  );
              } else {
                  
              }
            } catch (error) {
                console.error(error);
            }
        }
    }
    async function Register2() {
        //const db = firebase.firestore();
       
        
    }

  return (
      <div>
            <p>
            <input placeholder="차량 번호" onChange={ (e)=>{ setCarNumber(e.target.value)}}id="carNumber"></input>
            </p>
            <p>
            <input placeholder="모델명" onChange={ (e)=>{ setModelName(e.target.value)}}></input>
            </p>
            <p>
            <input placeholder="가능한 요일" onChange={ (e)=>{ setDayOfWeek(e.target.value)}}></input>
            </p>
            <p>
            <input placeholder="주차 장소" value={location || ''} onChange={ (e)=>{ setLocation(e.target.value)}}></input>
            <button onClick={()=>setPost(!post) }>우편번호 검색</button>
            </p>
            {
                post == true ? 
                    <span>
                    <DaumPost address={location} setAddress={setLocation}></DaumPost>
                    </span> 
                : null
            }
            <p>
            <input placeholder="대여료" onChange={ (e)=>{ setRentalFee(e.target.value)}}></input>
            </p>
            <p>
            <input placeholder="주행료" onChange={ (e)=>{ setDrivingFee(e.target.value)}}></input>
            </p>
            <p>
            <input type='file' 
          accept='image/jpg,image/png,image/jpeg,image/gif' 
          id="image"
          ></input>
          </p>
            {/* <button onClick={Register}>차량 등록하기</button> */}
            <button onClick={Register}>차량 등록하기</button>
      </div>
  );
}

export default Registration;