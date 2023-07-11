import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./loginPage.css";
import { Card } from "@mui/material";
import LoginServices from "../../services/loginServices";
import { UserContext } from "../../context";

 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  
  


  const onButtonClick = async () => {
    // Set initial error values to empty
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 8) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    try {
      const { success, data, errors, error } = await LoginServices.login(email, password);
      

      if (success) {
        navigate("/home");
        setUserData(userData); // Mettre à jour les informations de l'utilisateur


        
        window.reload();

        // Authentication successful, do something with the data (e.g., store token, navigate to another page)

      } else if (errors) {
        // Handle validation errors
        setEmailError(errors.emailError);
        setPasswordError(errors.passwordError);
      } else {
        // Handle general login error
        console.error("Error during login:", error);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="mainContainer">
      <Card style={{ padding: "25px" }}>
        <div className="titleContainer">
          <div>Login</div>
        </div>
        <br />
        <div className="inputContainer">
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className="inputBox"
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className="inputContainer">
          <input
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className="inputBox"
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className="inputContainer">
          <input className="inputButton" type="button" onClick={onButtonClick} value="Log in" />
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
