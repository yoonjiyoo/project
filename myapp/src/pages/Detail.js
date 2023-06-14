import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { Card, CardBody, CardImg, FormGroup, Container, Row, Col, Input, InputGroupAddon, InputGroupText, InputGroup, Button } from "reactstrap";
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatetime from "react-datetime";
import moment from 'moment';
import { parseISO } from 'date-fns';
import { db } from '../index.js';
import "firebase/firestore"; 
import 'firebase/storage';
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter";

// import MapContainer from "../App";

const { kakao } = window;

function MapContainer({ searchPlace }) {
  useEffect(() => {
    var container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
    var options = { // 지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 3 // 지도의 레벨(확대, 축소 정도)
    };
    var map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  
    const ps = new kakao.maps.services.Places(); 

    ps.keywordSearch(searchPlace, placesSearchCB); 

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {

        var coords = new kakao.maps.LatLng(data[0].y, data[0].x);

        var marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });

        map.setCenter(coords);
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
      height: '400px',
      margin: '0 auto' // 가운데 정렬을 위한 스타일 추가
    }}></div>
  )
}

function Detail(props) {
  const [post, setPost] = useState(false);
  const mainRef = useRef(null);

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
            .where("차량번호", "==", selectedCar.carNumber)
            .get()
            .then((result) => {
              if (!result.empty) {
                const doc = result.docs[0];
                const imageUrl = doc.data().이미지; 
                setImageUrl(imageUrl);
              }
            });
        }

        db.collection('reviewCar').where("차량번호", "==", selectedCar.carNumber).get().then((결과) => {
          결과.forEach((doc) => {
            var 템플릿 = `<div>
              <div>${doc.data().후기}</div><hr></hr>
            </div>`;
            document.getElementById("container mt-3").insertAdjacentHTML("afterend", 템플릿);
          })
          var 템플릿0 = `
            <h3>후기</h3><br></br>
          `;
          document.getElementById("container mt-3").insertAdjacentHTML("afterend", 템플릿0);
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
      <div className="text-center">
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
    <>
      <DemoNavbar />
      <main ref={mainRef}>
        <div className="position-relative">
          <section className="section section-lg section-shaped pb-250">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
        </div>
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="8">
                  <br></br><br></br><br></br><br></br>
                  <div className="text-center">
                    {imageUrl && <img src={imageUrl} alt="차량 이미지" style={{ width: "80%" }} />}
                  </div>
                  <h1 className="text-center">{selectedCar?.modelName}</h1>
                  <p className="text-center">{selectedCar?.location}</p>
                  <hr />
                  <div className="text-center">
                    <span>{selectedCar?.owner}</span>
                  </div>
                  <MapContainer searchPlace={selectedCar?.location} />
                   <div className="text-center mt-3">
                    <InputGroup className="d-flex justify-content-center">
                      <ReservationCalendar />
                      <Button color="primary" onClick={() => {
                        navigate("/search/"+id+"/payment", { state: { selectedDate : selectedDate } });
                      }}>예약하기</Button>
                    </InputGroup>
                  </div>
                  <br></br><hr></hr><br></br>
                  <div id="container mt-3"></div>
                </Col>
              </Row>
              <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            </Card>
          </Container>
        </section>
      </main>
      <br></br><br></br><br></br>
      <SimpleFooter />
    </>
  );
}

export default Detail;