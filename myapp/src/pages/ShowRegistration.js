import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardBody, CardImg, Container, Row, Col, Button } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter";
import { db } from '../index.js';
import useWeb3 from "../hooks/useWeb3";

function ShowRegistration() {
  const { carNumber } = useParams();
  const [carInfo, setCarInfo] = useState(null);
  const [imgInfo, setImgInfo] = useState(null);
  const [web3, account, contract] = useWeb3();

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
  

  const mainRef = useRef(null);
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/");
  };


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
                      <span>Registration Success!</span>
                    </h1>
                    <div className="lead text-white">
                      등록 성공했습니다! 등록된 정보를 확인해보세요.
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
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <CardImg top src={imgInfo?.이미지} alt="Car Image" />
                  <CardBody>
                    <h3>차량 정보</h3>
                    <p>차량번호: {carInfo?.carNumber}</p>
                    <p>모델명: {carInfo?.modelName}</p>
                    <p>주차 위치: {carInfo?.location}</p>
                    <p>대여가능 요일: {carInfo?.dayOfWeek}</p>
                    <p>대여료: {carInfo?.rentalFee}</p>
                    <p>주행료: {carInfo?.drivingFee}</p>
                    <br />
                    <br />
                    <br />
                    <div className="text-center">
                    <Button
                      className="btn-1 ml-1"
                      color="success"
                      outline
                      type="button"
                      onClick={goToMainPage}
                    >
                      홈으로 돌아가기
                      </Button>
                      </div>
                    <br />
                    <br />
                    <br />
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}

export default ShowRegistration;
