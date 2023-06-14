import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardImg, Container, Row, Col } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter";
import { db } from '../index.js';
import "firebase/firestore"; 
import 'firebase/storage';

function Rent(props) {
  const [filteredCars, setFilteredCars] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (props.contract) {
        const cars = await props.contract.methods.getAllCars().call();
        setFilteredCars(cars);

        const urls = await Promise.all(
          cars.map((car) => getImageUrl(car.carNumber))
        );
        setImageUrls(urls);
      }
    }
    fetchData();
  }, [props.contract]);

  async function getImageUrl(carNumber) {
    try {
      const doc = await db.collection('product').where("차량번호", "==", carNumber).get();
      if (!doc.empty) {
        const imageUrl = doc.docs[0].data().이미지;
        return imageUrl;
      }
      return null;
    } catch (error) {
      console.error("Error getting image URL:", error);
      return null;
    }
  }

  return (
    <>
      <DemoNavbar />
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
                  <span>Rent Page</span>
                </h1>
                <div className="lead text-white">
                  대여를 희망하는 자동차를 선택해주세요. 
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
            <polygon className="fill-white" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </section>
      <section className="section section-lg pt-lg-0 mt--200">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xl="10">
              <Row className="row-grid">
                {filteredCars.map((car, i) => (
                  car.isRentable && (
                    <Col xl="4" lg="6" md="6" key={i} className="mb-4">
                      <Card className="card-lift--hover shadow border-0">
                        <Link to={`/search/${car.idx}`}>
                          {imageUrls[i] && <CardImg alt="..." src={imageUrls[i]} />}
                        </Link>
                        <CardBody className="card-body-fix-height">
                          <h5 className="card-title">{car.modelName}</h5>
                          <div className="card-text">대여료: {car.rentalFee}</div>
                        </CardBody>
                      </Card>
                    </Col>
                  )
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <SimpleFooter />
    </>
  );
}

export default Rent;
