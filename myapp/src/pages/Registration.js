import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DaumPost from "../components/DaumPost";
import {db} from '../index.js'
import "firebase/firestore"; 
import 'firebase/storage';
import firebase from "firebase/app";

function Registration(props) {
    const navigate = useNavigate();
    const [carNumber, setCarNumber] = useState('');
    const [modelName, setModelName] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [location, setLocation] = useState('');
    const [rentalFee, setRentalFee] = useState('');
    const [drivingFee, setDrivingFee] = useState('');
    const [doubleSubmitFlag, setdoubleSubmitFlag] = useState(1111111);
    
    const [post, setPost] = useState(false);
    
    const writeProduct = () => {
        if (carNumber == ''){
            alert('차량 번호는 필수입니다.');
            return;
          }
          if (modelName == '') {
            alert('모델명은 필수입니다.');
            return;
          }
          if (dayOfWeek == ''){
            alert('요일은 필수입니다.');
            return;
          }
          if (location == ''){
            alert('위치는 필수입니다.');
            return;
          }
          if (rentalFee == '') {
            alert('대여료는 필수입니다.');
            return;
          }
          if (drivingFee == '') {
            alert('주행료는 필수입니다.');
            return;
          }
    }

    async function Register() {
        if (props.web3 && props.contract) {
            try {
                const accounts = await props.web3.eth.getAccounts();
                const cars = await props.contract.methods.getAllCars().call();
                props.setCars(cars);
                if (props.cars.filter(x => x.carNumber == carNumber).length == 0) {
                    await props.contract.methods.addCar(
                      carNumber, 
                      modelName, 
                      dayOfWeek,
                      location,
                      rentalFee,
                      drivingFee,
                    ).send({ from: accounts[0] });
                };
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
                            이미지 : url
                            }
                      db.collection('product').add(저장할거).then((result)=>{
                          setTimeout(()=>window.location.href = "/registration/success",500)
                      }).catch(()=>{
                          console.log()
                      })
                      });
                      }
                  )
              } catch (error) {
            console.error(error);
        }
    }
}
    // useEffect(() => {
    //     console.log("dof:",dayOfWeek);
    //     console.log("dsc:",doubleSubmitFlag)
    //   }, [dayOfWeek]);
      
  return (
      <div>
            <p>
            <input placeholder="차량 번호" onChange={ (e)=>{ setCarNumber(e.target.value)}}id="carNumber"></input>
            </p>
            <p>
            <input placeholder="모델명" onChange={ (e)=>{ setModelName(e.target.value)}}></input>
            </p>
            <p>
            <p>
            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                <button key={index} onClick={() => 
                    
                    {
                        if(!((doubleSubmitFlag>>(6-index))&1)){
                            console.log("t:",doubleSubmitFlag)
                            alert(day+"요일은 이미 등록된 요일입니다.")
                        }else{
                            console.log("f:",doubleSubmitFlag)
                            setdoubleSubmitFlag(doubleSubmitFlag^(1 << (6-index)));
                            console.log("become:",doubleSubmitFlag)
                            console.log("index:",index)
                            var num =Number(dayOfWeek??0) + (1 << (6-index))
                            setDayOfWeek(num)
                            alert(day+"요일이 등록되었습니다.")
                        }
                    }
                }>{day}</button>
            ))}
        </p>
            </p>
            <p>
            <input placeholder="주차 장소" value={location || ''} onChange={ (e)=>{ setLocation(e.target.value)}}readOnly></input>
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
            <input type='file' accept='image/jpg,image/png,image/jpeg,image/gif' id="image"></input>
          </p>
            <button onClick={()=>{writeProduct();Register();}}>차량 등록하기</button>
      </div>
  );
}

export default Registration;
