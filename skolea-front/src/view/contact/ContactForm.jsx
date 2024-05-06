import React, { useState } from "react";
import { Card, Container, TextField, Button } from "@mui/material";
import MessageService from "./../../services/messageServices";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formRole, setFormRole] = useState("Send");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormRole("Submitting...");

    try {
      // Définir les IDs statiques pour l'expéditeur et le destinataire
      const senderId = 1; // ID de l'expéditeur
      const receiverId = 2; // ID du destinataire
      const content = `Nom: ${formData.name}, Email: ${formData.email}, Message: ${formData.message}`;

      // Utiliser le service pour envoyer le message
      await MessageService.createMessage(senderId, receiverId, content);

      setFormRole("Submitted");
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
      alert("Failed to send message. Please try again.");
      setFormRole("Error");
    }
  };

  return (
    <Container>
      <Card style={{ padding: "20px", marginTop: "20px" }}>
        <form onSubmit={onSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            style={{ marginBottom: "20px" }}
          />
          <Button type="submit" variant="contained" color="primary">
            {formRole}
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default ContactForm;
