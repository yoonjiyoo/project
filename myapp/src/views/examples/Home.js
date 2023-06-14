import React from "react";
import classnames from "classnames";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter";
import ReactDatetime from "react-datetime";

class Home extends React.Component {
  state = {};

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleReactDatetimeChange = (who, date) => {
    if (
      this.state.startDate &&
      who === "endDate" &&
      new Date(this.state.startDate._d + "") > new Date(date._d + "")
    ) {
      this.setState({
        startDate: date,
        endDate: date
      });
    } else if (
      this.state.endDate &&
      who === "startDate" &&
      new Date(this.state.endDate._d + "") < new Date(date._d + "")
    ) {
      this.setState({
        startDate: date,
        endDate: date
      });
    } else {
      this.setState({
        [who]: date
      });
    }
  };

  getClassNameReactDatetimeDays = (date) => {
    if (
      this.state.startDate &&
      this.state.endDate &&
      this.state.startDate._d + "" !== this.state.endDate._d + ""
    ) {
      if (
        new Date(this.state.endDate._d + "") > new Date(date._d + "") &&
        new Date(this.state.startDate._d + "") < new Date(date._d + "")
      ) {
        return " middle-date";
      }
      if (this.state.endDate._d + "" === date._d + "") {
        return " end-date";
      }
      if (this.state.startDate._d + "" === date._d + "") {
        return " start-date";
      }
    }
    return "";
  };

  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
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
                        <span>Rent Page</span>
                      </h1>
                      <p className="lead text-white">
                        차량 대여를 희망하는 날짜를 선택해주세요. <br></br>
                        시작과 끝 날짜를 고르고 검색을 누르면 됩니다.
                      </p>
                      <div className="btn-wrapper">
                        
                      </div>
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
          <section className="section section-lg pt-lg-0 mt--200">
            <Container>
              <Row className="justify-content-center">
                <Col lg="8">
                  <Row className="row-grid">
                    <Col lg="6">
                      <Card>
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="ni ni-check-bold" />
                          </div>
                          <h6 className="text-primary text-uppercase">
                            시작 날짜를 고르세요
                          </h6>
                          <p className="description mt-3">
                            <FormGroup>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-calendar-grid-58" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <ReactDatetime
                                  inputProps={{
                                    placeholder: "Start Date"
                                  }}
                                  value={this.state.startDate}
                                  timeFormat={false}
                                  onChange={(e) =>
                                    this.handleReactDatetimeChange(
                                      "startDate",
                                      e
                                    )
                                  }
                                  renderDay={(
                                    props,
                                    currentDate,
                                    selectedDate
                                  ) => {
                                    let classes = props.className;
                                    classes +=
                                      this.getClassNameReactDatetimeDays(
                                        currentDate
                                      );
                                    return (
                                      <td {...props} className={classes}>
                                        {currentDate.date()}
                                      </td>
                                    );
                                  }}
                                />
                              </InputGroup>
                            </FormGroup>
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="6">
                      <Card>
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                            <i className="ni ni-check-bold" />
                          </div>
                          <h6 className="text-primary text-uppercase">
                            종료 날짜를 고르세요
                          </h6>
                          <p className="description mt-3">
                            <FormGroup>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-calendar-grid-58" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <ReactDatetime
                                  inputProps={{
                                    placeholder: "End Date"
                                  }}
                                  className="rdtPickerOnRight"
                                  value={this.state.endDate}
                                  timeFormat={false}
                                  onChange={(e) =>
                                    this.handleReactDatetimeChange(
                                      "endDate",
                                      e
                                    )
                                  }
                                  renderDay={(
                                    props,
                                    currentDate,
                                    selectedDate
                                  ) => {
                                    let classes = props.className;
                                    classes +=
                                      this.getClassNameReactDatetimeDays(
                                        currentDate
                                      );
                                    return (
                                      <td {...props} className={classes}>
                                        {currentDate.date()}
                                      </td>
                                    );
                                  }}
                                />
                              </InputGroup>
                            </FormGroup>
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col lg="8">
                  <br></br><br></br>
                  <Button
                    block
                    className="btn-white"
                    color="default"
                    href="/search-page"
                    size="lg"
                  >
                    Search
                  </Button>
                </Col>
              </Row>
              <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Home;
