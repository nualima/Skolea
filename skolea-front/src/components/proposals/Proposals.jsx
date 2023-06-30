import React from 'react';
import { FaChalkboardTeacher, FaGraduationCap, FaBookOpen, FaUserFriends } from 'react-icons/fa';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardTitle,
} from "reactstrap";

function Proposals() {
  return (
    <div style={{  marginBottom: '60px', }}>
      <Col>
        <Row>
          <div>
            <h2 style={{ marginTop: '50px', marginBottom: '50px', }}>Ce qu'on propose :</h2>
            <div className="proposal-icons" style={{ marginLeft: '70px', marginRight: '70px'}}>
              <div className="proposal-icon">
                <div className="circle">
                  <FaChalkboardTeacher size={50} />
                  <p>Cours en ligne</p>
                </div>
              </div>
              <div className="proposal-icon">
                <div className="circle">
                  <FaUserFriends size={50} />
                  <p>Professeurs expérimentés</p>
                </div>
              </div>
              <div className="proposal-icon">
                <div className="circle">
                  <FaGraduationCap size={50} />
                  <p>Obtention de diplôme</p>
                </div>
              </div>
              <div className="proposal-icon">
                <div className="circle">
                  <FaBookOpen size={50} />
                  <p>Accompagnement personnalisé</p>
                </div>
              </div>
            </div>

            <style jsx>{`
              .proposal-icons {
                display: flex;
                justify-content: space-between;
              }

              .proposal-icon {
                text-align: center;
              }

              .circle {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                background-color: white;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }
            `}
            </style>
          </div>
        </Row>
      </Col>
    </div>
  );
}

export default Proposals;
