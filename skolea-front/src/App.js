import { useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext, UserProvider } from "./context";

import DefaultNavBar from "./components/navBar/DefaultNavBar";
import MainPage from "./view/MainPage";
import NewUserForm from "./view/NewUserForm";
import ProfilComponent from "./view/ProfilComponent";
import Reservation from "./view/reservation/Reservation";
import LoginPage from "./view/login/LoginPage";
import ContactForm from "./view/contact/ContactForm";
import Availability from "./view/availability/Availability";
import ListUsers from "./view/listUsers/ListUsers";
import NotFound from "./view/notFound/NotFound";
import ThemeApp from "./components/theme/ThemeApp";

function App() {
  // Récupérer les données utilisateur depuis le contexte
  const { userData } = useContext(UserContext);

  // Extraire le statut de l'utilisateur (student, teacher, admin)
  const userStatus = userData && userData.status ? userData.status : null;
  console.log(userStatus);

  return (
    <Router>
      <UserProvider>
        {" "}
        {/* Barre de navigation */} <DefaultNavBar />{" "}
        {/* Composant pour gérer le thème de l'application */} <ThemeApp />
        <div>
          <Routes>
            {" "}
            {/* Routes pour différentes pages de l'application */}{" "}
            <Route path="/home" element={<MainPage />} />{" "}
            <Route path="/" element={<MainPage />} />{" "}
            <Route path="/profil" element={<ProfilComponent />} />{" "}
            {/* Route pour la réservation, disponible uniquement pour les étudiants */}{" "}
            {/* {userStatus === "student" && (
              <Route path="/reservation" element={<Reservation />} />
            =)}{" "} */}
            {/* Route pour la disponibilité, disponible uniquement pour les enseignants */}{" "}
            {/* {userStatus === "teacher" && (
              <Route path="/availability" element={<Availability />} />
            )}{" "} */}
            {/* Route pour la gestion des utilisateurs, disponible uniquement pour les administrateurs */}{" "}
            {userStatus === "admin" && (
              <Route path="/users" element={<ListUsers />} />
            )}{" "}
            <Route path="/contact" element={<ContactForm />} />{" "}
            <Route path="/signUp" element={<NewUserForm />} />{" "}
            <Route path="/login" element={<LoginPage />} />{" "}
            <Route path="/availability" element={<Availability />} />{" "}
            <Route path="/reservation" element={<Reservation />} />
            <Route path="*" element={<NotFound />} />{" "}
          </Routes>{" "}
        </div>{" "}
      </UserProvider>{" "}
    </Router>
  );
}

export default App;
