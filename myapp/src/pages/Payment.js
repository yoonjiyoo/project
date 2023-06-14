import { useParams} from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import { Card, CardBody, CardImg, Container, Row, Col, Input, InputGroupAddon, InputGroupText, InputGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter, } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter";



function Payment(props) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedCar, setSelectedCar] = useState();
  const [formattedDate, setFormattedDate] = useState();
  const [account, setAccount] = useState();
  const [modal, setModal] = useState(false); // Add modal state
  const mainRef = useRef(null);


    const getRequestAccount = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return account;
  };

  
  const handleCancel = () => {
    navigate(-1);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleOkButtonClick = () => {
    navigate("/");
  };

  useEffect(() => {
    (async () => {
      try {
        setAccount(await getRequestAccount());

        setSelectedCar(props.cars && props.cars.find((x) => x.idx === id));

        const selectedDate = location.state.selectedDate;
        const offset = selectedDate && selectedDate.getTimezoneOffset() * 60000;
        const offsetDate = new Date(selectedDate.getTime() - offset);
        setFormattedDate(offsetDate.toISOString().split('T')[0]);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handlePayment = async () => {
    try {
      const length = await props.contract.methods.getAccountBorrowLength(account).call();

      let flag;
      if (length !== 0) {
        const bor = await props.contract.methods.getBorrow(account).call();
        if (bor.returnDate === "" && bor.addr !== "0x0000000000000000000000000000000000000000") {
          flag = false;
        } else {
          flag = true;
        }
      }

      if (length === 0 || flag) {
        await props.web3.eth.sendTransaction({
          from: account,
          to: selectedCar.owner,
          value: props.web3.utils.toWei(props.web3.utils.BN(selectedCar.rentalFee), "ether")
        });

        await props.contract.methods.startRental(selectedCar.idx, formattedDate).send({ from: account });

        setModal(true); // Open the modal

        console.log("대여 가능");
      } else {
        console.log("대여가 불가능함. 반납을 먼저 진행할 것");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Payment Successful</ModalHeader>
          <ModalBody>
          결제가 완료되었습니다. <br></br>
          빌린 차량의 관리는 마이페이지에서 가능합니다. <br></br>
          확인버튼을 누르면 홈으로 이동합니다.<br></br>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleOkButtonClick}>확인</Button>
          </ModalFooter>
      </Modal>
      

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
                      <span>Payment Page</span>
                    </h1>
                    <div className="lead text-white">
                      결제 정보를 확인한 뒤 결제해주세요. 
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
                      
                        <br></br><br></br><br></br><br></br><br></br>
      <div>
            <p>대여인 : {selectedCar?.owner.toUpperCase()}</p>
            <p>대여자 : {account?.toUpperCase()}</p>
            <p>모델명 : {selectedCar?.modelName}</p>
            <p>날짜 : {formattedDate}</p>
            <p>대여료 : {selectedCar?.rentalFee}</p>
            <p>주행료 : {selectedCar?.drivingFee}</p>
            <p>합계 : {Number(selectedCar?.rentalFee) + Number(selectedCar?.drivingFee)}</p>
            <br></br><br></br>
            <div className="text-center">
                                                    <Button className="btn-1" color="success" outline type="button" onClick={handlePayment}>결제하기</Button>
                                                    <Button className="btn-1 ml-1" color="warning" outline type="button" onClick={handleCancel}> 취소하기 </Button>
                        </div>        
                      </div>
                                            </div>
                      </Row>
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


export default Payment;
