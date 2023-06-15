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
    <>

      <Col>
        <Card body className="text-center" outline color="secondary">
          <CardBody>
            <CardTitle>salut</CardTitle>
            <Row>

              <div>
                <h2>Ce qu'on propose :</h2>
                <div className="proposal-icons">
                  <div className="proposal-icon">
                    <FaChalkboardTeacher size={50} />
                    <p>Cours en ligne</p>
                  </div>
                  <div className="proposal-icon">
                    <FaUserFriends size={50} />
                    <p>Professeurs expérimentés</p>
                  </div>
                  <div className="proposal-icon">
                    <FaGraduationCap size={50} />
                    <p>Obtention de diplôme</p>
                  </div>
                  <div className="proposal-icon">
                    <FaBookOpen size={50} />
                    <p>Accompagnement personnalisé</p>
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
      `}
                </style>
              </div>
            </Row>
          </CardBody>
        </Card>

      </Col>
    </>

  );
}

export default Proposals;
