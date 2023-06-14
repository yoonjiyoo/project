import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardImg, Container, Row, Col, Input, InputGroupAddon, InputGroupText, InputGroup, Button } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter";


function Return(props) { // 차량 반납 - 반납용 페이지를 따로 만들거라면 상관없는데, 마이페이지 안에서 반납 이루어지게 할거라면 수정해서 components로 넘길 예정 
    const [account, setAccount] = useState();
    const [mileage, setMileage] = useState();
    const navigate = useNavigate();

    
    const getRequestAccount = async () => {
        const [account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        return account;
    };

    const dateDiff = (d1, d2) => {
        const oneDay = 24 * 60 * 60 * 1000; // 1일을 밀리초로 표현
        const date1 = new Date(d1);
        const date2 = new Date(d2);
        const diff = Math.round(Math.abs((date1 - date2) / oneDay));
        return diff;
    }
  const mainRef = useRef(null);
    
    const handleReturn = async () => {
        
        try {
            setAccount(await getRequestAccount());
            
            // 1. 반납할 차량이 있는지
            // 2. 반납 기한을 지켰는지 (당일 대여, 당일 반납)
            const ren = await props.contract.methods.getBorrow(account).call();
            if (ren.returnDate != "") {
                console.log("반납할 차량이 없음"); // 확인을 위해 임시로 구성, 실제 반납할 차량이 없다면 버튼 비활성화, 또는 안내 메세지 화면에 노출 
            } else {
                const cars = await props.contract.methods.getAllCars().call();
                const selectedCar = cars.find(x => x.carNumber === ren.carNumber); // ==를 ===로 변경
                const today = new Date().toISOString().split('T')[0];

                const totalDrivingFee = selectedCar.drivingFee * mileage;
                let lateFee = 0;
                if (today > ren.rentalDate) { // 하루 연체될 때마다 대여료의 1% 부과 
                    lateFee = selectedCar.rentalFee * 0.01 * (dateDiff(ren.rentalDate, today));
                } 

                const txHash = await props.web3.eth.sendTransaction({
                    from: account,
                    to: selectedCar.owner,
                    value: props.web3.utils.toWei(props.web3.utils.BN(totalDrivingFee + lateFee), "ether")
                });
                const txHash2 = txHash.transactionHash;
                await props.contract.methods.endRental(account, today, totalDrivingFee + lateFee).send({ from: account });
                navigate("/review/"+ren.carNumber);  // "/review/"+carNumber --> "/review/"+ren.carNumber로 변경
            }
        } catch (e) {
            console.log(e);
        }
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
                      <span>Return Page</span>
                    </h1>
                    <div className="lead text-white">
                      주행거리를 km단위로 입력해주세요. <br></br><br />
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
                      
                        <br></br><br></br><br></br>
      <div>


        <div>

                <Input placeholder="주행거리" onChange={ (e)=>{ setMileage(e.target.value)}}></Input>
                                    
                                                    <br></br><br></br>
            <Button
                  className="btn-1 ml-1"
                  color="success"
                  outline
                  type="button" onClick={handleReturn}>반납하기</Button>
                                                </div>
                                                          <div id="container mt-3"></div> 
                      </div>
                      </div>
                      </Row>
              </Col>
            </Row>
            <br></br><br></br><br></br><br></br><br></br><br></br>

              
            </Card>
            
            
          </Container>

        </section>
      </main>
      <SimpleFooter />
      </>
    );
}

export default Return;
