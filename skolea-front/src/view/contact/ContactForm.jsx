import React, { useState } from 'react';
import { Card, Container } from '@mui/material';

const ContactForm = () => {
  // Utilisation du hook useState pour gérer l'état du formulaire
  const [formrole, setFormrole] = useState('Send');

  // Gestionnaire de soumission du formulaire
  const onSubmit = async (e) => {
    e.preventDefault();
    // Mettre à jour le statut du formulaire pendant la soumission
    setFormrole('Submitting...');

    try {
      const { name, email, message } = e.target.elements;
      // Création d'un objet avec les données du formulaire
      const nameValue = name.value;
      const emailValue = email.value;
      const messageValue = message.value;
  

      // Ici, vous pouvez envoyer les données à votre backend ou effectuer une autre action requise
      // par exemple, une requête HTTP pour enregistrer les données

      // Une fois l'action effectuée avec succès, vous pouvez mettre à jour le statut du formulaire
      setFormrole('Submitted');
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
      // Gérer les erreurs qui peuvent survenir lors de la soumission du formulaire
      setFormrole('Error');
    }
  };

  return (
    <>
      {/* Un espace vide pour déplacer le formulaire vers le haut */}
      <div style={{ marginTop: '750px' }}></div>

      <Container>
        <Card style={{ padding: '50px' }}>
          <div className="container mt-5">
            <h2 className="mb-3">Contactez-nous</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  Nom
                </label>
                <input className="form-control" type="text" id="name" required />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input className="form-control" type="email" id="email" required />
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
