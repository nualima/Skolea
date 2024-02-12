import React from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../context";

import Proposals from "../components/proposals/Proposals";

import {
  Row,
  Col,
  Card,
  // Button,
} from "reactstrap";
import Carrousel from "../components/caroussel/Carrousel";
import Footer from "../components/footer/Footer";

const MainPage = () => {
  const { userData  } = useContext(UserContext);
  const userrole = userData ? userData.role : null;

  // Cet effet réagit aux changements de userData
  useEffect(() => {
    console.log("Les données utilisateur ont été mises à jour.", userData);
  }, [userData]);

  return (
    <div className="App">
      <div
        style={{
          marginTop: "850px",
        }}
      >
        <Row>
          <Col>
            <Card>
              salut {userrole}
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
