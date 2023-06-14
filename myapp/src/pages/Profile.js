import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
} from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";

function Profile(props) {
  const [filteredCars, setFilteredCars] = useState();
  const [account, setAccount] = useState();
  const [rentedCar, setRentedCar] = useState();
  const [b, setB] = useState([]);
  const [l, setL] = useState();

  const navigate = useNavigate();
  const mainRef = useRef(null);

  const getRequestAccount = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return account;
  };

  const [iconTabs, setIconTabs] = useState(1);
  const [plainTabs, setPlainTabs] = useState(1);

  const toggleNavs = (e, state, index) => {
    e.preventDefault();
    if (state === "iconTabs") {
      setIconTabs(index);
    } else if (state === "plainTabs") {
      setPlainTabs(index);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const acc = await getRequestAccount();
        setAccount(acc);
        const borlen = await props.contract.methods
          .getAccountBorrowLength(acc)
          .call();
        if (borlen == 0) {
          setRentedCar(undefined);
        } else {
          const bor = await props.contract.methods.getBorrow(acc).call();
          if (bor.returnDate != "" || bor.addr == "0x0000000000000000000000000000000000000000") {
            setRentedCar(undefined);
          } else {
            setRentedCar(bor);
          }
        }

        const cars = await props.contract.methods.getAllCars().call();
        props.setCars(cars);
        setFilteredCars(
          cars.filter((x) => x.owner.toUpperCase() == account.toUpperCase())
        );

        const b = await props.contract.methods.getAllBorrow(acc).call();
        setB(b);
        const l = await props.contract.methods.getAllLend(acc).call();
        setL(l);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [props.contract, account, props.setCars]);

  function convertWeiToEth(wei) {
    const eth = wei / 10 ** 18;
    return eth;
  }

  function maskCarNumber(carNumber) {
    const maskedNumber = carNumber.substring(0, carNumber.length - 3) + "***";
    return maskedNumber;
  }

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainRef.current.scrollTop = 0;
  }, []);

  return (
    <>
      <DemoNavbar />
      <main className="profile-page" ref={mainRef}>
        <section className="section-profile-cover section-shaped my-0">
          {/* Circles background */}
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          {/* SVG separator */}
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
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/team-4-800x800.png")}
                        />
                      </a>
                    </div>
                  </Col>
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0">
                      <br />
                      <br />
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <br />
                    <br />
                    <br />
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>
                    {account}님{" "}
                    <span className="font-weight-light"></span>
                  </h3>
                  <hr />
                  <Row className="justify-content-center">
                  <Col className="mt-5 mt-lg-0" lg="10">

                    <div className="mb-3">

                    </div>
                    <div className="nav-wrapper">
                      <Nav
                        className="nav-fill flex-column flex-md-row"
                        id="tabs-icons-text"
                        pills
                        role="tablist"
                      >
                        <NavItem>
                          <NavLink
                            aria-selected={plainTabs === 1}
                            className={classnames("mb-sm-3 mb-md-0", {
                              active: plainTabs === 1,
                            })}
                            onClick={(e) =>
                              toggleNavs(e, "plainTabs", 1)
                            }
                            href="#pablo"
                            role="tab"
                          >
                            등록차량
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            aria-selected={plainTabs === 2}
                            className={classnames("mb-sm-3 mb-md-0", {
                              active: plainTabs === 2,
                            })}
                            onClick={(e) =>
                              toggleNavs(e, "plainTabs", 2)
                            }
                            href="#pablo"
                            role="tab"
                          >
                            빌린차량
                          </NavLink>
                        </NavItem>

                      </Nav>
                    </div>
                    <Card className="shadow">
                      <CardBody>
                        <TabContent activeTab={"plainTabs" + plainTabs}>
                          <TabPane tabId="plainTabs1">
                            <p className="description">
                              {filteredCars?.length > 0 ? (
                      filteredCars.map((car, i) => (
                        <div key={i}>
                          <span>{car.modelName}</span>
                          <span>{car.carNumber}</span>
                          <span>{car.owner}</span>
                          <span>{car.idx}</span>
                          <br />
                          <span>활성화: {car.isRentable}</span>
                          <Button
                            className="btn-1 ml-1"
                            color="warning"
                            outline
                            type="button"
                            onClick={() => {
                              props.contract.methods
                                .modifyCar(car.idx)
                                .send({ from: account })
                                .then(() => {
                                  console.log(car.isRentable);
                                  // 성공적으로 처리된 경우 실행할 로직
                                })
                                .catch((error) => {
                                  console.error("거래 취소", error);
                                  // 에러 처리 로직 추가
                                });
                            }}
                          >
                            차량 비활성화
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p>현재 등록된 차량이 없습니다.</p>
                    )}
                            </p>
                          </TabPane>
                          <TabPane tabId="plainTabs2">
                            <p className="description">
                                                  {rentedCar == undefined ? (
                      <p>현재 대여 중인 차량이 없습니다.</p>
                    ) : (
                      <div>
                        <p>{rentedCar}</p>
                        <Button
                          className="btn-1"
                          color="primary"
                          outline
                          type="button"
                          onClick={() => navigate("/return")}
                        >
                          반납하기
                        </Button>
                        <Button
                          className="btn-1 ml-1"
                          color="warning"
                          outline
                          type="button"
                          onClick={async () => {
                            const txHash = await props.web3.eth.sendTransaction(
                              {
                                from: account,
                                to: rentedCar.addr,
                                value: props.web3.utils.toWei(
                                  props.web3.utils.BN(rentedCar.totalFee),
                                  "ether"
                                ),
                              }
                            );
                            props.contract.methods
                              .cancelRental(account)
                              .send({ from: account });
                          }}
                        >
                          취소하기
                        </Button>
                      </div>
                    )}
                            </p>
                          </TabPane>
                        </TabContent>
                      </CardBody>
                    </Card>
                    </Col>
                    </Row>

                <div className="mt-5 py-5 border-top text-center">
                  <Row className="justify-content-center">
                  <Col className="mt-5 mt-lg-0" lg="10">
                      <p>
                          <p>빌린내역</p>
                          <Card className="shadow">
                            <br></br>
                        {b?.length > 0 ? (
                          b.map((car, i) => {
                            if (
                              car.addr ===
                              "0x0000000000000000000000000000000000000000"
                            ) {
                              return null; // 건너뛰기
                            }
                            return (
                              <div
                                key={i}
                                
                              >
                                <span>{car.modelName}</span>
                                <br />
                                <span>대여날짜: {car.rentalDate}</span>
                                <br />
                                <span>반납날짜: {car.returnDate}</span>
                                <br />
                                <span>차량주: {car.addr}</span>
                                <br />
                                <span>
                                  차량번호: {maskCarNumber(car.carNumber)}
                                </span>
                                <br />
                                <span>금액: {car.totalFee}</span>
                                <br />
                              </div>
                            );
                          })
                        ) : (
                          <p>내역 없음</p>
                            )}
                            <br></br>
                            </Card>
                          <hr />
                          

                          <p>빌려준 내역</p>
                          <Card className="shadow">
                            <br></br>
                        {l?.length > 0 ? (
                          l.map((car, i) => {
                            if (
                              car.addr ===
                              "0x0000000000000000000000000000000000000000"
                            ) {
                              return null; // 건너뛰기
                            }
                            return (
                              <div
                                key={i}
                                
                              >
                                <span>대여날짜: {car.rentalDate}</span>
                                <br />
                                <span>반납날짜: {car.returnDate}</span>
                                <br />
                                <span>
                                  차량번호: {car.carNumber} | {car.modelName}
                                </span>
                                <br />
                                <span>차용인: {car.addr}</span>
                                <br />
                                <span>금액: {car.totalFee}</span>
                                <br />
                              </div>
                            );
                          })
                        ) : (
                          <p>내역 없음</p>
                            )}
                            <br></br>
                            </Card>
                        </p>
                        

                    </Col>
                  </Row>
                </div>
                </div>
                </div>
            </Card>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}

export default Profile;
