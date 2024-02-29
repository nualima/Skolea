import React, { useState } from "react";
import { Card, Container } from "@mui/material";

const ContactForm = () => {
  const [formrole, setFormrole] = useState("Send");

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormrole("Submitting...");

    const formData = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      message: e.target.elements.message.value,
      timestamp: new Date(), // Ajoutez le timestamp ici si nécessaire
    };

    try {
      // Remplacez 'http://localhost:3000/api/contact' par l'URL de votre API
      const response = await fetch(
        "http://localhost:3000/api/contactsubmissions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setFormrole("Submitted");
        // Gérer la réponse ici, par exemple, afficher un message de succès
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
      setFormrole("Error");
    }
  };

  return (
    <>
      {/* Un espace vide pour déplacer le formulaire vers le haut */}
      <div style={{ marginTop: "750px" }}></div>

      <Container>
        <Card style={{ padding: "50px" }}>
          <div className="container mt-5">
            <h2 className="mb-3">Contactez-nous</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  Nom
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="message">
                  Message
                </label>
                <textarea className="form-control" id="message" required />
              </div>
              <button className="btn btn-danger" type="submit">
                {formrole}
              </button>
            </form>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default ContactForm;
