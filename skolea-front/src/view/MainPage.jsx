import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../context';




import Proposals from '../components/proposals/Proposals';


import {
  Row,
  Col,
  Card,
  // Button,

} from "reactstrap";
import Carrousel from '../components/caroussel/Carrousel';
import Footer from '../components/footer/Footer';





const MainPage = () => {


  const { userData } = useContext(UserContext); 
  const userStatue = userData ? userData.statue : null;
  

  
  return (
    <div className="App">
      
      <div style={{
        marginTop:"850px"
      }}>

          <Row>
            <Col>
              <Card>
                salut {userStatue} 
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