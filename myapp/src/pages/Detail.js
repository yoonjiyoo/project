import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';
import {db} from '../index.js'
import "firebase/firestore"; 
import 'firebase/storage';

// import MapContainer from "../App";

function Detail(props) {
  const { id } = useParams();
  const 차량 = props.cars?.find((x) => x.idx === id);
  const navigate = useNavigate();


  const minDate = new Date(); // 예약 가능한 가장 빠른 날짜를 설정합니다.
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 14); // 예약 가능한 가장 늦은 날짜를 설정합니다.
  const [excludeDates, setExcludeDates] = useState(null);

  // 솔리디티에서 예약 금지 배열 가져오기
  // min~max 배열 만들기
  // 두 배열에서 중복되는 원소 찾기 = 진정한 예약 금지 뱅려
  // 해당 배열 excludeDates에 넣기 
  // 달력 끝~ 이 상태에서 버튼 누르면 결제 창으로 넘어감
  // 돈 보내면 차량의 예약 배열에 해당 날짜 값 넣어주기~
  
  //const excludeDates = ['2023-05-21', '2023-05-30'];
  // const excludeDates = ['2023-05-25', '2023-05-26'].map(dateString => parseISO(dateString));
  //console.log(차량.carNumber);
  //const excludeDates = props.contract.methods.getReservedDates(차량?.carNumber).call();
  //console.log(excludeDates);
  //setExcludeDates(excludeDates?.map(dateString => parseISO(dateString)));
  //console.log(props.contract.methods.getReservedDates(차량.carNumber).call());

  useEffect(() => {
    async function getCount() {
        if (props.contract) {
            // setFilteredCars(props.cars); // 새로고침하면 빈 리스트됨 
            // setFilteredCars(await props.contract.methods.getAllCars().call());
            let temp = await props.contract.methods.getReservedDates(차량.carNumber).call();
            setExcludeDates(temp.map(dateString => parseISO(dateString)));
        }
    }
    getCount();
    db.collection('product').where("차량번호","==", 차량.carNumber).get().then((결과)=>{
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
              <div>후기 : ${doc.data().후기}</div>
            </div>`;
            document.getElementById("container mt-3").insertAdjacentHTML("afterend",
            템플릿);
            })
  })
  }, [props.contract]);

  const [selectedDate, setSelectedDate] = useState(null);

  function 시작종료배열로(minDate, maxDate) {
    const dateArray = [];
    let currentDate = minDate;
  
    while (currentDate <= maxDate) {
      dateArray.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(dateArray);
    return dateArray;
  }
  
  function ReservationCalendar() {
    // const [selectedDate, setSelectedDate] = useState(null);
  
    const isWeekdayDisabled = (date) => {
      const day = date.getDay();
      return props.cars[id].dayOfWeek & (1 << (6-day));
      //return day === 0 || day === 6;
    };
  
    const isReservedDateDisabled = (date) => {
      

      //console.log(props.contract.methods.getReservedDates().call());
      //const reserveDates = props.contract.methods.getReservedDates().call();
      //return ['2023-05-01', '2023-05-10', '2023-05-15'];
      //const reservedDates = ['2023-05-01', '2023-05-10', '2023-05-15'];

      //const formattedDate = date.toISOString().split('T')[0];
      //return reservedDates.includes(formattedDate);
    };

  
    return (
      <div>
        <h1>예약 달력</h1>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          filterDate={isWeekdayDisabled}
          excludeDates={excludeDates}
          minDate={minDate}
          maxDate={maxDate}
          dateFormat="yyyy-MM-dd"
        />
      </div>
    );
  }


  const send = async () => {
    // const accounts = await props.web3.eth.getAccounts();
      // await props.web3.eth.sendTransaction({
      //   from: accounts[0],
      //   to: props.cars[id].owner,
      //   value: props.web3.utils.toWei(props.web3.utils.BN(props.cars[id].rentalFee), "ether")
      // });
      

      // 달력에서 가능한 날만 선택 가능하게 ...
      navigate("/search/"+id+"/payment", { state : { selectedDate : selectedDate} });
    };

  return (
    <div>
      <ReservationCalendar/>
      {props.cars !== undefined ? (
        <div>

          <h1>{차량?.modelName}</h1>
          <p><span>{차량?.carNumber}</span></p>
          <div id="container mt-3"></div> 
          <button onClick={send}>예약하기</button>
        </div>
      ) : (
        null
      )}
    </div>
  );
}

export default Detail;