import React from "react";
import { Container, Row } from "reactstrap";

// core components
import DemoNavbar from "../components/Navbars/DemoNavbar.js";
import SimpleFooter from "../components/Footers/SimpleFooter.js";

// index page sections
import Hero from "./IndexSections/Hero.js";
import Carousel from "./IndexSections/Carousel.js";
import Download from "./IndexSections/Download.js";

class Index extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <Hero />
          <section className="section">
            <Container>
          <Download />
            </Container>
          </section>

          <Carousel />


        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Index;
