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

const { kakao } = window;
function MapContainer({searchPlace}) {
  useEffect(()=>{
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  
    const ps = new kakao.maps.services.Places(); 

    ps.keywordSearch(searchPlace, placesSearchCB); 

      function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {

          var coords = new kakao.maps.LatLng(data[0].y, data[0].x);

          var marker = new kakao.maps.Marker({
              map: map,
              position: coords
          });

          map.setCenter(coords);
            // let bounds = new kakao.maps.LatLngBounds();

            //     for (let i=0; i<data.length; i++) {
            //         displayMarker(data[i]);    
            //         bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            //     }       

                // map.setBounds(bounds);
        } 
    }

        function displayMarker(place) {
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x) 
            });
        }
  
  }, [searchPlace]);

  return (
      <div id="map" style={{
        width: '500px',
        height: '400px'
      }}></div>
  )
}

function Detail(props) {
  const navigate = useNavigate();

  const { id } = useParams();
  const selectedCar = props.cars?.find((x) => x.idx === id);

  const minDate = new Date();
  const maxDate = new Date(minDate.getTime() + 14 * 24 * 60 * 60 * 1000);
  const [selectedDate, setSelectedDate] = useState(null);
  const [excludeDates, setExcludeDates] = useState(null);

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
      if (selectedCar) {
          try {
              const fetchExcludeDates = async() => {
                  if (props.contract) {
                      let dates = await props.contract.methods.getAllRenDates(selectedCar.carNumber).call();
                      setExcludeDates(dates.map(dateString => parseISO(dateString)));
                  }
              }

              const fetchImage = () => {
                  db.collection('product')
                      .where("차량번호","==", selectedCar.carNumber)
                      .get()
                      .then((result) => {
                          if (!result.empty) {
                              const doc = result.docs[0];
                              const imageUrl = doc.data().이미지; 
                              setImageUrl(imageUrl);
                          }
                      });
              }

              db.collection('reviewCar').where("차량번호","==", selectedCar.carNumber).get().then((결과)=>{
    
                결과.forEach((doc)=>{
                    var 템플릿 = `<div>
                        <div>${doc.data().후기}</div>
                      </div>`;
                      document.getElementById("container mt-3").insertAdjacentHTML("afterend",
                      템플릿);
                      })
                      var 템플릿0 = `
                        <h3>후기 </h3>
                      `;
                document.getElementById("container mt-3").insertAdjacentHTML("afterend",템플릿0);
            })

              fetchExcludeDates();
              fetchImage();
          } catch(e) {
              console.log(e);
          }
      }
  }, [selectedCar]);

  
  function ReservationCalendar() {
      const filterUnavailableDates = (date) => {
          const day = date.getDay();
          return props.cars[id].dayOfWeek & (1 << (6-day));
      };
  
      return (
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            filterDate={filterUnavailableDates}
            excludeDates={excludeDates}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      );
  }

  return (
      <div>
          <div>
              {imageUrl && <img src={imageUrl} alt="차량 이미지" style={{ width: "90%" }}/>}
          </div>

          <h1>{selectedCar?.modelName}</h1>
          <span>{selectedCar?.owner}</span>
          
          <MapContainer searchPlace={selectedCar?.location} />

          <ReservationCalendar/>
          <button onClick={() => {
              navigate("/search/"+id+"/payment", { state : { selectedDate : selectedDate} });
          }}>예약하기</button>
          <div id="container mt-3"></div> 
    </div>
  );
}

export default Detail;
