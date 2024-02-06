import React, { useState } from 'react';
import {
  Container, Row, Col, Form, FormGroup, Label, Input, Button
} from 'reactstrap';

function Reservation() {
  const [reservation, setReservation] = useState({
    name: '',
    email: '',
    date: '',
    numberOfPeople: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(reservation); // Ici, tu peux intégrer l'envoi des données à un serveur, etc.
    alert('Réservation soumise !');
  };

  return (
    <Container>
      <p>salut</p>
      <Row className="my-5">
        <Col md={{ size: 6, offset: 3 }}>
          <h2>Réserver une séance</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Nom</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={reservation.name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={reservation.email}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={reservation.date}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="numberOfPeople">Nombre de personnes</Label>
              <Input
                id="numberOfPeople"
                name="numberOfPeople"
                type="number"
                value={reservation.numberOfPeople}
                onChange={handleChange}
                min="1"
              />
            </FormGroup>
            <Button type="submit" color="primary">Réserver</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Reservation;
