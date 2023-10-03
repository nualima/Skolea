// Import des bibliothèques et composants nécessaires
import { Container } from '@mui/material';
import React, { useState } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';

// Composant pour afficher les détails du profil utilisateur
const ProfileDetails = ({ user }) => {
  // États pour gérer les données du formulaire et le mode d'édition
  const [isEditing, setIsEditing] = useState(false); // Indique si l'utilisateur est en mode édition
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [fullName, setFullName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [address, setAddress] = useState(undefined);

  // Gestionnaires d'événements pour les modifications des champs du formulaire
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  // Gestionnaire d'événement pour la soumission du formulaire en mode édition
  const handleSubmit = (event) => {
    event.preventDefault();
    // Effectuer les actions nécessaires pour sauvegarder les modifications
    // Par exemple, vous pouvez envoyer les données au backend via une requête API
    setIsEditing(false); // Désactive le mode édition après la soumission
  };

  return (
    <>
    <Container style={{marginTop:"150px"}}>
      <section style={{ backgroundColor: '#eee' }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: '150px' }}
                  />
                  <h5 className="my-3">John Smith</h5>
                  <p className="text-muted mb-1">teacher</p>
                  <p className="text-muted mb-4">Antibes - France</p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  {isEditing ? ( // Si l'utilisateur est en mode édition, affiche le formulaire
                    <Form onSubmit={handleSubmit}>
                      {/* Champs de formulaire éditables */}
                      <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                          type="text"
                          id="username"
                          value={username}
                          onChange={handleUsernameChange}
                        />
                      </FormGroup>
                      <button type="submit" className="btn btn-primary">
                        Sauvegarder
                      </button>
                    </Form>
                  ) : ( // Si l'utilisateur n'est pas en mode édition, affiche les détails du profil
                    <div>
                      <p className="mb-0">Full Name</p>
                      <p className="text-muted mb-0">{fullName}</p>
                      <hr />
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setIsEditing(true)}
                      >
                        Modifier
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </Container>
    </>
  );
};

export default ProfileDetails;
