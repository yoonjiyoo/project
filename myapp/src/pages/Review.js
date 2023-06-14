import { useParams} from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import { Card, CardBody, CardImg, Container, Row, Col, Input, InputGroupAddon, InputGroupText, InputGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter, } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter";
import DaumPost from "../components/DaumPost";
import {db} from '../index.js'
import "firebase/firestore"; 
import 'firebase/storage';
import firebase from "firebase/app";
import useWeb3 from "../hooks/useWeb3";




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
    /*const [modelName, setModelName] = useState();
    const [dayOfWeek, setDayOfWeek] = useState();
    const [location, setLocation] = useState();
    const [rentalFee, setRentalFee] = useState();
    const [drivingFee, setDrivingFee] = useState();*/
    const navigate = useNavigate();
    const inputRev = useRef();
  const [post, setPost] = useState(false);
    const [carInfo, setCarInfo] = useState(null);
  const [imgInfo, setImgInfo] = useState(null);
  const [web3, account, contract] = useWeb3();

    

    
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
        
          /*useEffect(() => {
            // (async () => {
            // if (props.contract) {
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
                                console.log("no");
                            
                        })
                    })
            //     }
            // })();
        })*/
  
  
  
   useEffect(() => {
    const getCarInfo = async () => {
      if (contract && carNumber) {
        const cars = await contract.methods.getAllCars().call();
        const car = cars.find((c) => c.carNumber === carNumber);
        setCarInfo(car);
      }
    };

    getCarInfo();
  }, [carNumber, contract]);



   useEffect(() => {
    db.collection('product')
      .where("차량번호", "==", carNumber)
      .get()
      .then((result) => {
        if (!result.empty) {
          const doc = result.docs[0];
          setImgInfo(doc.data());
        }
      });
   }, [carNumber]);
  
  
  
  
        async function Register() {
            
                        //   db.collection('product').where("차량번호","==", carNumber).get().then((result)=>{
                        //     result.forEach((doc)=>{
                        //         doc.ref.update({후기:review})
                        //     })
                        //       console.log(result);
                        //       setTimeout(()=>window.location.href = "/registration/success",500)
                        //   }).catch(()=>{
                        //       console.log()
                        //   })
                        
                        // console.log("rev",inputRev.current.value);
                        // setReview(inputRev.current.value);
                        // console.log("review",review);
                        const test = inputRev.current.value;
                        var 저장할거 = {
                            차량번호 : carNumber,
                            후기 : test
                            }
                        db.collection('reviewCar').add(저장할거).then((result)=>{
                            console.log(result);
                            setTimeout(()=>window.location.href = "/",500)
                        }).catch(()=>{
                            console.log()
                        })
                        }
                    
        
    
  const mainRef = useRef(null);
  

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
                      <span>Review Page</span>
                    </h1>
                    <div className="lead text-white">
                      이용해주셔서 감사합니다! <br></br>이용한 차량의 후기를 등록해보세요.
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
              <Col className="order-lg-2" lg="8">
    <div><br></br><br></br><br></br><br></br>

      <CardImg top src={imgInfo?.이미지} alt="Car Image" />
                  <CardBody>
                    <h3>차량 정보</h3>
                    <p>차량번호: {carInfo?.carNumber}</p>
                    <p>모델명: {carInfo?.modelName}</p>
                    <p>주차 위치: {carInfo?.location}</p>
                    <p>대여료: {carInfo?.rentalFee}</p>
                    <p>주행료: {carInfo?.drivingFee}</p>
                    <br />
                    <br />
                    <br />
                    <div className="text-center">
                      </div>
                    <br />
                    <br />
                    <br />
                  </CardBody>
                      
                      <InputGroup>
      <input placeholder="리뷰" ref={inputRev}></input>
      <button onClick={()=>{Register();}}>리뷰 등록하기</button></InputGroup>
    </div>
    

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



export default Review;
