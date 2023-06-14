import React, { useEffect, useState,useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {Card,CardBody,CardImg,Container,Row,Col, Input,InputGroupAddon,InputGroupText,InputGroup,Button} from "reactstrap";
import DaumPost from "../components/DaumPost";
import {db} from '../index.js'
import "firebase/firestore"; 
import 'firebase/storage';
import firebase from "firebase/app";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter";



function Registration(props) {
    const navigate = useNavigate();
    const [carNumber, setCarNumber] = useState('');
    const [modelName, setModelName] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [location, setLocation] = useState('');
    const [rentalFee, setRentalFee] = useState('');
    const [drivingFee, setDrivingFee] = useState('');
  const [doubleSubmitFlag, setdoubleSubmitFlag] = useState(127);
  const [searchFocused, setSearchFocused] = useState(false);

    
  const [post, setPost] = useState(false);
  const mainRef = useRef(null);

    
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
                            이미지: url,

                            }
                      db.collection('product').add(저장할거).then((result)=>{
                          setTimeout(() => navigate(`/registration/success/${carNumber}`), 500);
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
            <Container className="py-lg-md d-flex">
              <div className="col px-0">
                <Row>
                  <Col lg="6">
                    <h1 className="display-3 text-white">
                      NeCar{" "}
                      <span>Registration Page</span>
                    </h1>
                    <div className="lead text-white">
                      차량 정보를 입력하고 등록해보세요. <br />
                    </div>
                    <div className="btn-wrapper"></div>
                  </Col>
                </Row>
              </div>
            </Container>
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
              <Col className="order-lg-2" lg="15">
                <Row className="row-grid">
      <div>
            <br></br><br></br><br></br><br></br>  
            <Input placeholder="차량 번호" type="text" onChange={ (e)=>{ setCarNumber(e.target.value)}}id="carNumber"></Input><br></br>
            <Input placeholder="모델명" type="text" onChange={ (e)=>{ setModelName(e.target.value)}}></Input><br></br>
            
           {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => {
  if ((doubleSubmitFlag >> (6 - index)) & 1) {
    return (
      <Button
        className="btn-1"
        color="primary"
        outline
        type="button"
        key={index}
        onClick={() => {
          console.log("f:", doubleSubmitFlag);
          setdoubleSubmitFlag(doubleSubmitFlag ^ (1 << (6 - index)));
          console.log("become:", doubleSubmitFlag);
          console.log("index:", index);
          var num = Number(dayOfWeek ?? 0) + (1 << (6 - index));
          setDayOfWeek(num);
          alert(day + "요일이 등록되었습니다.");
        }}
      >
        {day}
      </Button>
    );
  } else {
    return (
      <Button
        className="btn-1"
        color="primary"
        type="button"
        key={index}
        onClick={() => {
          console.log("t:", doubleSubmitFlag);
          alert(day + "요일은 이미 등록된 요일입니다.");
        }}
      >
        {day}
      </Button>
    );
  }
           })} 
           <br></br><small className="text-uppercase text-muted font-weight-bold">*대여가 가능한 요일을 선택해주세요.</small>
                      <br></br>


          


                        
                         <br></br> <InputGroup>
      <Input
        placeholder="주차 장소"
        value={location || ""}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        readOnly
        onFocus={() => setSearchFocused(true)} 
        onBlur={() => setSearchFocused(false)} 
      />
      <InputGroupAddon addonType="append">
        <Button className="btn-1" color="primary" outline type="button" onClick={() => setPost(!post)}>검색</Button>
      </InputGroupAddon>
                      </InputGroup>


            {
                post == true ? 
                    <span>
                    <DaumPost address={location} setAddress={setLocation}></DaumPost>
                    </span> 
                : null
            }

            <br></br><Input placeholder="대여료" onChange={ (e)=>{ setRentalFee(e.target.value)}}></Input><br></br>


            <Input placeholder="주행료" onChange={ (e)=>{ setDrivingFee(e.target.value)}}></Input>

            <br></br><Input type='file' accept='image/jpg,image/png,image/jpeg,image/gif' id="image"></Input>

                                  <br />
            <br />
            <br />
            <br />

                      <br />
                      <Row className="row-grid justify-content-end">
            <Button className="btn-1" color="success" outline type="button" onClick={()=>{writeProduct();Register();}}>차량 등록하기</Button></Row>
      </div>

</Row>
              </Col>
            </Row>
            <br></br><br></br><br></br>

              
            </Card>
            
            
          </Container>

        </section>
      </main>
      <SimpleFooter />
    </>
  );
}

export default Registration;
