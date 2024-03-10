import React, { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Input, Label } from "reactstrap";
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

  // Mise à jour des états basés sur userData chaque fois que userData change
  useEffect(() => {
    setUsername(userData?.username || "");
    setFullName(userData?.name || "");
    setEmail(userData?.email || "");
    setPhoneNumber(userData?.phoneNumber || "");
    setBirthday(userData?.birthday || "");
    if (userData?.role === "professor") {
      setSubjects(userData?.professor?.subjects || []);
    }
  }, [userData]);

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
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  {isEditing ? (
                    <Form onSubmit={() => setIsEditing(false)}>
                      <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                          type="text"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </FormGroup>
                      {/* Ajoutez d'autres champs de formulaire ici */}
                      <button type="submit" className="btn btn-primary">
                        Sauvegarder
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
                      {userData?.role === "professor" ? (
                        <>
                          <p className="mb-0">Subjects</p>
                          <p className="text-muted mb-0">
                            {subjects.length > 0
                              ? subjects.join(", ")
                              : "Aucune matière pour l'instant"}
                          </p>
                        </>
                      ) : (
                        <p className="mb-0">Role: {userData?.role}</p>
                      )}
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
  );
};

export default ProfilDetails;
