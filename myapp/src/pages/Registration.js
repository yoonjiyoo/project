import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DaumPost from "../components/DaumPost";

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
                  navigate("/registration/success");
              } else {
                  
              }
            } catch (error) {
                console.error(error);
            }
        }
    }

  return (
      <div>
            <p>
            <input placeholder="차량 번호" onChange={ (e)=>{ setCarNumber(e.target.value)}}></input>
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
            <button onClick={Register}>차량 등록하기</button>
      </div>
  );
}

export default Registration;