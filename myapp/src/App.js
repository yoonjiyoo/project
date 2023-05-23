// import React from "react";
import "./App.css";
import CarSharing from "./components/CarSharing";
import useWeb3 from "./hooks/useWeb3";
import { Routes, Route, Link } from 'react-router-dom';
import Rent from "./pages/Rent";
import Detail from "./pages/Detail";
import Main from "./pages/Main";
import Return from "./pages/Return";
import React, { useState, useEffect } from "react";
import Registration from "./pages/Registration"
import { useNavigate } from "react-router-dom";
import Payment from "./pages/Payment";


//import { useSelector } from "react-redux"

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

function App() {
  // let a = useSelector((state)=>{
  //   return state
  // })
  // console.log(a)

  const [web3, account, contract] = useWeb3();
  const [cars, setCars] = useState();
  const navigate = useNavigate();


  useEffect(() => {
    async function getCount() {
        if (contract) {
          let c = await contract.methods.getAllCars().call();
          setCars(c);

        }
    }
    getCount();
  }, [contract]);

  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };



  if (!account) return <h1>메타마스크를 연결해주세요</h1>;
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/registration" element={<Registration web3={web3} account={account} contract={contract} cars={cars} setCars={setCars} />} />
        <Route path="/registration/success" element={
            <div>
                success! 
                <button onClick={()=>navigate("/")}>확인</button>

            </div>} />
        <Route path="/search" element={<Rent contract={contract} cars={cars} setCars={setCars}/>} />
        <Route path="/search/:id" element={<Detail cars={cars} web3={web3} contract={contract} />} />
        <Route path="/search/:id/payment" element={<Payment cars={cars} web3={web3} contract={contract} account={account}/>} />
        <Route path="/return" element={<Return contract={contract} web3={web3}/>} />
        <Route path="*" element={<div>없는 페이지</div>} />
      </Routes>

          {/* <Kakao/> */}

          {/* <form className="inputForm" onSubmit={handleSubmit}>
              <input
                placeholder="Search Place..."
                onChange={onChange}
                value={inputText}
              />
              <button type="submit">검색</button>
            </form>
            <MapContainer searchPlace={place} /> */}
      {/*<CarSharing web3={web3} account={account} contract={contract}/>
        <button onClick={notify}>Notify!</button>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
  />*/}
    </div>
  )
    //   {/* <Link to="/detail"></Link>
    //   <Routes>
    //     <Route path="/" element={<div>메인페이지임</div>} />
    //     <Route path="/rent" element={<Rent contract={contract}/>} />
    //     <Route path="/rent/:id" element={<Detail arr={arr}/>}/>
    //   </Routes> */}
    //   {/* <CarSharing web3={web3} account={account} contract={contract}/> */}
}


export default App;