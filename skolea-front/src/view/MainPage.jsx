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
      <ExempleNavbar />
      {/* <IndexHeader /> */}
      <nav>
        {/* salut */}
        <Link to="/profilePage" > profilepage </Link> //
        <Link to="/loginPage">loginpage</Link> //
        <Link to="/subject">Subject</Link> //
        <Link to="/NewUserForm" > New User Form </Link> //
        <Link to="/Reservation" > Reservation </Link> //
      </nav>
      <Container >
        <Row>
          <Col>
            <Card body className="text-center" outline color="secondary">
              <CardBody>

                <Proposals />
                <Proposals />
                <Proposals />
                <Proposals />

                

                
              </CardBody>
            </Card>

          </Col>
        </Row>
      </Container>






    </div>
  );
};

export default MainPage;