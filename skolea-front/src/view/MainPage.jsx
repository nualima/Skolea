import React from 'react';
import { Link, Route } from 'react-router-dom';


import NavBar from '../components/NavBar';
import ExempleNavbar from '../components/ExempleNavbar';
// import Slides from '../components/banner/Slides';
import Proposals from '../components/proposals/Proposals';
import Carousels from '../components/carousel/Carousels';
import IndexHeader from '../components/header/IndexHeader';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  // Button,

} from "reactstrap";





const MainPage = () => {


  return (
    <div className="App">
      {/* <Slides />  */}

      <Carousels />
      <ExempleNavbar   />
      {/* <IndexHeader /> */}
      {/* <nav>
        <Link to="/profilePage" > profilepage </Link> //
        <Link to="/loginPage">loginpage</Link> //
        <Link to="/subject">Subject</Link> //
        <Link to="/NewUserForm" > New User Form </Link> //
        <Link to="/Reservation" > Reservation </Link> //
      </nav> */}
      <div style={{
        marginTop:"100px"
      }}>

        <Container >
          <Row>
            <Col>
              <Card>
                <Proposals />
                <Proposals />
                <Proposals />
                <Proposals />
                <Proposals />
                <Proposals />

                <Proposals />

              </Card>




            </Col>
          </Row>
        </Container>

      </div>
    </div>
  );
};

export default MainPage;