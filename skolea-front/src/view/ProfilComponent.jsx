import React, { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { UserContext } from "../context";
import updateUserServices from "../services/updateUserServices";
import SubjectTag from "../components/subjectTag"; // Importez le composant SubjectTag

const ProfilDetails = () => {
  // États pour gérer les données du formulaire et le mode d'édition
  const { userData, setUserData } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [educationLevel, setEducationLevel] = useState("");

  // Mise à jour des états basés sur userData chaque fois que userData change
  useEffect(() => {
    setFullName(userData?.name || "");
    setEmail(userData?.email || "");
    setPhoneNumber(userData?.phoneNumber || "");
    setBirthday(userData?.birthday || "");
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = userData?.id;
    const userDetails = { fullName, email, phoneNumber, birthday };
    const token = localStorage.getItem("token");

    try {
      const response = await updateUserServices.updateUser(
        userId,
        userDetails,
        token
      );

      // Ici, on suppose que `response` contient l'objet utilisateur mis à jour
      // Y compris le `educationLevel` pour les étudiants
      const updatedUser = response.user || response; // ajustez selon la structure de la réponse de votre API

      setUserData(updatedUser); // Met à jour le contexte avec les données fraîchement mises à jour
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
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
                  <h5 className="my-3">{fullName}</h5>
                  <p className="text-muted mb-1">{userData?.role}</p>
                  {userData?.role === "professor" && (
                    <div className="text-muted mb-1">
                      <p>Subjects:</p>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center", 
                          alignItems: "center", 
                        }}
                      >
                        {userData.professor?.subjects?.length > 0
                          ? userData.professor.subjects.map(
                              (subject, index) => (
                                <SubjectTag key={index} subject={subject} />
                              )
                            )
                          : "None"}
                      </div>
                    </div>
                  )}
                  {userData?.role === "student" && (
                    <p className="text-muted mb-1">
                      Education Level:{" "}
                      {userData.student?.educationLevel || "Not specified"}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  {isEditing ? (
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label for="fullName">Full Name</Label>
                        <Input
                          type="text"
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="phoneNumber">Phone Number</Label>
                        <Input
                          type="text"
                          id="phoneNumber"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="birthday">Birthday</Label>
                        <Input
                          type="date"
                          id="birthday"
                          value={birthday}
                          onChange={(e) => setBirthday(e.target.value)}
                        />
                      </FormGroup>
                      <button type="submit" className="btn btn-primary">
                        Save Changes
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
                      <p className="mb-0">Birthday</p>
                      <p className="text-muted mb-0">{birthday}</p>
                      <hr />
                      <p className="mb-0">Phone Number</p>
                      <p className="text-muted mb-0">{phoneNumber}</p>
                      <hr />
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
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
  );
};

export default ProfilDetails;
