import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "reactstrap";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

import backgroundImg from "../assets/img/theme/Background.jpg";
import Image1 from "../assets/img/theme/Image1.png";
import Image2 from "../assets/img/theme/Image2.png";
import Image3 from "../assets/img/theme/Image3.png";
import Image4 from "../assets/img/theme/Image4.png";

import './Index.css';

const Index = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainRef.current.scrollTop = 0;
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    const images = document.querySelectorAll(".animated-image");

    images.forEach((image) => {
      observer.observe(image);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <DemoNavbar />
      <main ref={mainRef}>
        <div className="position-relative">
          <section className="section section-hero section-shaped">
            <div className="shape shape-style-1 shape-default">
              <img src={backgroundImg} alt="Image" style={{ width: "100%" }} />
            </div>
            <Container className="shape-container d-flex align-items-center py-lg">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col className="text-center" lg="12">
                    <img
                      alt="..."
                      className="img-fluid"
                      src={require("../assets/img/brand/argon-react-white.png")}
                      style={{ width: "200px" }}
                    />
                    <p className="lead text-white">
                      <b>NeCar</b> is a P2P car sharing platform. <br />
                      Join us in car sharing, <br />
                      which can contribute to the <b>environment</b> and <b>society</b>. <br />
                      We overcome the limitations of the P2P sharing economy <br />
                      with <b>blockchain</b> technology. <br></br>
                      *설명 수정 필요
                    </p>
                  </Col>
                </Row>
              </div>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
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
        </div>
        <section className="section">
          <Container>
            <section className="section section-lg">
              <Container>
                <Row className="row-grid justify-content-center">
                  <Col className="text-center" lg="8">
                    <div className="animated-image">
                    <div className="display-3">
                        성인남녀 1,200명에게 물었습니다. {" "}
                      </div>
                    </div>
<br></br><br></br><br></br><br></br><br></br>
                      <span className="display-4">
                        <img
                          className="animated-image"
                          src={Image1}
                          alt="Image"
                          style={{ width: "50%" }}
                      />
                      <br></br><br></br><br></br>
                        <img
                          className="animated-image"
                          src={Image2}
                          alt="Image"
                          style={{ width: "50%" }}
                        />
                      </span>
                    <br></br><br></br><br></br><br></br><br></br>
                    <p className="animated-image">
                      <div className="lead">
                      자가용 소유자 <b>90%</b>는 차량을 하루에 <b>2시간</b>도 이용하지 않습니다.<br></br>
                      자차 소유자 대상 ‘차량 구매 후 불만족하는 이유’에 대한 질문은 <br></br>
                      <b>지출 비용 대비 낮은 효율성 60%</b>, <br></br>
                      주차 스트레스 45.7% 순으로 집계됐습니다.
</div><br></br><br></br><br></br>
                    </p>
                    <Row>
                      <Col md="6" className="mb-4">
                        <img
                          className="animated-image"
                          src={Image3}
                          alt="Image"
                          style={{ width: "100%" }}
                        />
                      </Col>
                      <Col md="6" className="mb-4">
                        <img
                          className="animated-image"
                          src={Image4}
                          alt="Image"
                          style={{ width: "110%" }}
                        />
                      </Col>
                    </Row>
                                          <p className="animated-image">
                      <div className="lead">
                        멘트 수정이나 이미지 변경 등... <br></br>
                        뷰포트에 따라 등장하는 애니메이션은 구현 완료 
</div><br></br><br></br><br></br></p>
                  </Col>
                </Row>
              </Container>
            </section>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
};

export default Index;
