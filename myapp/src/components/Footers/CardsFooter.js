/*!

=========================================================
* Argon Design System React - v1.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardImg,
  NavItem,
  NavLink,
  Nav,
  Container,
  Modal,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";



class CardsFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultModal: false
    };
  }

  toggleModal = (modal) => {
    this.setState((prevState) => ({
      [modal]: !prevState[modal]
    }));
  };
  render() {
    return (
      <>
        <footer className="footer has-cards">
          <Container>
            <Row className="row-grid align-items-center my-md">
              <Col lg="6">
                <h3 className="text-primary font-weight-light mb-2">
                  Thank you for supporting us!
                </h3>
                <h4 className="mb-0 font-weight-light">
                  Let's get in touch on any of contacts
                </h4>
              </Col>
              
            </Row>
            <hr />
            <Row className="align-items-center justify-content-md-between">
              <Col md="6">
                <div className="copyright">
                  <a
                    href=""
                    target="_blank"
                  >
                    2023 숙명여자대학교 시스템종합설계 Project
                  </a>
                </div>
              </Col>
<Col md="6">
  <Nav className="nav-footer justify-content-end">
    <NavItem>
      <NavLink
        href="#"
        onClick={() => this.toggleModal("teamModalOpen")} // Team 클릭 시 모달 토글
      >
        Team
      </NavLink>
      <Modal
        className="modal-dialog-centered"
        isOpen={this.state.teamModalOpen}
        toggle={() => this.toggleModal("teamModalOpen")}
      >
        <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                  팀 소개
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("teamModalOpen")}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body" style={{ textAlign: "center" }}>
                        <p>
                         이지스 팀<br></br>
컴퓨터과학전공 2013266 김민정<br></br>
컴퓨터과학전공 1916502 송기영<br></br>
경제학부, 컴퓨터과학전공 1814429 윤지유<br></br>

                </p>
                      </div>
                      <div className="modal-footer">

                <Button
                  className="ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("teamModalOpen")}
                >
                  Close
                </Button>
              </div>
      </Modal>
    </NavItem>

                  <NavItem>
                    <NavLink
                      href="#"
                      onClick={() => this.toggleModal("pjtModalOpen")}
                    >
                      About Project
                    </NavLink>
                    <Modal
        className="modal-dialog-centered"
        isOpen={this.state.pjtModalOpen}
        toggle={() => this.toggleModal("pjtModalOpen")}
      >
        <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                  About Project
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("pjtModalOpen")}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body" style={{ textAlign: "center" }}>
                        <p>
                          숙명여자대학교 23-1 시스템종합설계 프로젝트 페이지입니다.<br></br>
                          본 프로젝트는 ‘3단계 산학연협력 선도대학 육성사업(LINC3.0)’ 사업비로 제작하였습니다.<br></br>

                </p>
                      </div>
                      <div className="modal-footer">

                <Button
                  className="ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("pjtModalOpen")}
                >
                  Close
                </Button>
              </div>
      </Modal>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default CardsFooter;
