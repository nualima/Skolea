import { Container } from '@mui/material';
import React from 'react';
import { useState } from 'react';

import { Form, FormGroup, Input, Label, } from 'reactstrap';


// Un composant pour afficher les informations de base de l'utilisateur
const ProfileDetails = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [fullName, setFullName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [address, setAddress] = useState(undefined);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Effectuer les actions nécessaires pour sauvegarder les modifications

    // Par exemple, vous pouvez envoyer les données au backend via une requête API

    setIsEditing(false);
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
                  {isEditing ? (
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                          type="text"
                          id="username"
                          value={username}
                          onChange={handleUsernameChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                          type="password"
                          id="password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="fullName">Full Name</Label>
                        <Input
                          type="text"
                          id="fullName"
                          value={fullName}
                          onChange={handleFullNameChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          type="email"
                          id="email"
                          value={email}
                          onChange={handleEmailChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="phone">Phone</Label>
                        <Input
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={handlePhoneChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="address">Address</Label>
                        <Input
                          type="text"
                          id="address"
                          value={address}
                          onChange={handleAddressChange}
                        />
                      </FormGroup>
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </Form>
                  ) : (
                    <div>
                      <p className="mb-0">Full Name</p>
                      <p className="text-muted mb-0">{fullName}</p>
                      <hr />
                      <p className="mb-0">Email</p>
                      <p className="text-muted mb-0">{email}</p>
                      <hr />
                      <p className="mb-0">Phone</p>
                      <p className="text-muted mb-0">{phone}</p>
                      <hr />
                      <p className="mb-0">Address</p>
                      <p className="text-muted mb-0">{address}</p>
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
