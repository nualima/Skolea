import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const Availability = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/availability", { date, startTime, endTime });
      alert("Disponibilité ajoutée avec succès!");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la disponibilité", error);
    }
  };

  return (
    <Container className="mt-5">
      <Card body>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="date">Date</Label>
            <Input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="startTime">Heure de début</Label>
            <Input
              type="time"
              name="startTime"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="endTime">Heure de fin</Label>
            <Input
              type="time"
              name="endTime"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </FormGroup>
          <Button type="submit" color="primary">
            Ajouter Disponibilité
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Availability;
