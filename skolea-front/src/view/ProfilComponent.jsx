import React, { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { UserContext } from "../context";
import updateUserServices from "../services/updateUserServices";
import SubjectTag from "../components/subjectTag";

const ProfilDetails = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [educationLevel, setEducationLevel] = useState("");
  const [price, setPrice] = useState(""); // Ajout de price

  useEffect(() => {
    setFullName(userData?.name || "");
    setEmail(userData?.email || "");
    setPhoneNumber(userData?.phoneNumber || "");
    setBirthday(userData?.birthday || "");
    setEducationLevel(userData?.student?.educationLevel || "");

    if (
      userData?.role === "professor" &&
      userData.Professors?.length > 0 &&
      userData.Professors[0].Subjects
    ) {
      setSubjects(userData.Professors[0].Subjects.map((sub) => sub.name) || []);
      setPrice(userData.Professors[0].price || "");
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = {
      name: fullName,
      email,
      phoneNumber,
      birthday,
      ...(userData?.role === "professor" && { price }), // Inclure le prix uniquement pour les professeurs
    };

    const token = localStorage.getItem("token");
    try {
      const response = await updateUserServices.updateUser(
        userData?.id,
        userDetails,
        token
      );
      setUserData(response.user || response);
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
                    <div>
                      <p>Subjects:</p>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {subjects.length > 0
                          ? subjects.map((subject, index) => (
                              <SubjectTag key={index} subject={subject} />
                            ))
                          : "None"}
                      </div>
                    </div>
                  )}
                  {userData?.role === "student" && (
                    <FormGroup>
                      <p className="text-muted">{educationLevel}</p>{" "}
                      {/* Afficher comme texte plutôt que comme champ modifiable */}
                    </FormGroup>
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
                      {userData?.role === "professor" && (
                        <FormGroup>
                          <Label for="price">Hourly Rate (€/hr)</Label>
                          <Input
                            type="number"
                            id="price"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            step="0.01"
                          />
                        </FormGroup>
                      )}
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
                      {userData?.role === "professor" && (
                        <>
                          <p className="mb-0">Hourly Rate (€/hr)</p>
                          <p className="text-muted mb-0">{price}</p>
                          <hr />
                        </>
                      )}

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
