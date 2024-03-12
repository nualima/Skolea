import React, { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { UserContext } from "../context";

const ProfilDetails = () => {
  const { userData } = useContext(UserContext);

  // États pour gérer les données du formulaire et le mode d'édition
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
    setUsername(userData?.username || "");
    setFullName(userData?.name || "");
    setEmail(userData?.email || "");
    setPhoneNumber(userData?.phoneNumber || "");
    setBirthday(userData?.birthday || "");
    if (userData?.role === "professor") {
      setSubjects(userData?.professor?.subjects || []);
    } else if (userData?.role === "student") {
      setEducationLevel(userData?.student?.educationLevel || "");
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, intégrez la logique pour soumettre les modifications
    setIsEditing(false);
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
                    <p className="text-muted mb-1">
                      Subjects:{" "}
                      {userData.professor?.subjects?.join(", ") || "None"}
                    </p>
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
