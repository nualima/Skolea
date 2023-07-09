import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context';




import NavBar from '../components/NavBar';
import ExempleNavbar from '../components/ExempleNavbar';
// import Slides from '../components/banner/Slides';
import Proposals from '../components/proposals/Proposals';
import ThemeApp from '../components/theme/ThemeApp';
import IndexHeader from '../components/header/IndexHeader';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  // Button,

} from "reactstrap";
import Carrousel from '../components/caroussel/Carrousel';
import Footer from '../components/footer/Footer';





const MainPage = () => {


  const { userData } = useContext(UserContext); 
  const userStatue = userData ? userData.statue : null;
  console.log(`cadeau ${userData}`)
  console.log(userStatue)

  




  return (
    <div className="App">
      {/* <Slides />  */}

      <ExempleNavbar   />
      {/* <IndexHeader /> */}
      
      <div style={{
        marginTop:"100px"
      }}>

          <Row>
            <Col>
              <Card>
              {/* {userData.statue && <h1>Bonjour {userData.username}</h1>} */}
              bonjour {userStatue}
                <Proposals />
                <Carrousel />
                <Footer />


              </Card>




            </Col>
          </Row>

      </div>
    </div>
  );
};

export default MainPage;