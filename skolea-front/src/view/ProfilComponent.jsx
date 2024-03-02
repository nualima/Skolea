// Import des bibliothèques et composants nécessaires
import { Container } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { UserContext } from "../context";

// Composant pour afficher les détails du profil utilisateur
const ProfilDetails = () => {
  const { userData } = useContext(UserContext);

  // États pour gérer les données du formulaire et le mode d'édition
  const [isEditing, setIsEditing] = useState(false);
  // Initialisation des états à des valeurs vides
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [birthday, setBirthday] = useState("");

  // Mise à jour des états basés sur userData chaque fois que userData change
  useEffect(() => {
    setUsername(userData?.username || "");
    setFullName(`${userData?.firstname || ""} ${userData?.lastname || ""}`);
    setEmail(userData?.email || "");
    setPhoneNumber(userData?.phoneNumber || "");
    setAddress(userData?.address || "");
    setRole(userData?.role || "");
    setPhoneNumber(userData?.phoneNumber || "");
    setEducationLevel(userData?.educationLevel || "");
    setBirthday(userData?.birthday || "");
    setFullName(userData?.name || "");
    setEmail(userData?.email || "");
    setRole(userData?.role || "");
  }, [userData]);

  // Gestionnaires d'événements pour les modifications des champs du formulaire
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleFullNameChange = (event) => setFullName(event.target.value);
  // Et ainsi de suite pour les autres gestionnaires...

  // Gestionnaire d'événement pour la soumission du formulaire en mode édition
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEditing(false); // Désactive le mode édition après la soumission
  };
  const userRole = userData?.role || "Role not defined";

  return (
    <>
      <Container style={{ marginTop: "150px" }}>
        <section style={{ backgroundColor: "#eee" }}>
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: "150px" }}
                    />
                    <h5 className="my-3">{userData?.name || "John Smith"}</h5>
                    <p className="text-muted mb-1">{role}</p>
                    <p className="text-muted mb-4">
                      {userData?.city || "City"} -{" "}
                      {userData?.country || "Country"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    {isEditing ? (
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
                        {/* Ajoutez d'autres champs de formulaire ici */}
                        <button type="submit" className="btn btn-primary">
                          Sauvegarder
                        </button>
                      </Form>
                    ) : (
                      // Affichage des détails du profil
                      <div>
                        <p className="mb-0">Full Name</p>
                        <p className="text-muted mb-0">{fullName}</p>
                        <hr />
                        <p className="mb-0">Email</p>
                        <p className="text-muted mb-0">{email}</p>
                        <hr />
                        <p className="mb-0">Birthday</p>
                        <p className="text-muted mb-0">{birthday}</p>
                        <hr />
                        <p className="mb-0">phoneNumber </p>
                        <p className="text-muted mb-0">{phoneNumber}</p>
                        <hr />
                        <p className="mb-0">
                          {" "}
                          {userRole === "teacher"
                            ? "Subjects: " + userData?.subjects.join(", ")
                            : "Education Level: " + educationLevel}
                        </p>
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

export default ProfilDetails;
