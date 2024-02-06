// Importer les modules et dépendances nécessaires
import React, { createContext, useState, useEffect } from "react";
import LoginServices from "../services/loginServices";

// Créer un contexte (UserContext) pour gérer les données utilisateur
export const UserContext = createContext({
  userData: null,
  setUserData: () => {}, // Ajoutez cette ligne pour fournir une implémentation par défaut
});

// Créer un composant UserProvider pour gérer les données utilisateur et l'état d'authentification
export const UserProvider = ({ children }) => {
  // Initialiser une variable d'état pour stocker les données utilisateur
  const [userData, setUserData] = useState(null);

  // Fonction pour vérifier si l'utilisateur est authentifié
  const checkAuthentication = async () => {
    // Récupérer le jeton d'authentification depuis le stockage local (localStorage)
    const token = localStorage.getItem("token");

    // Si un jeton est trouvé, tenter de le vérifier en effectuant une requête au serveur
    if (token) {
      try {
        // Appeler une fonction de service pour vérifier le jeton et récupérer les données utilisateur
        const response = await LoginServices.whoAmI(token);

        // Extraire les données utilisateur de la réponse et mettre à jour l'état
        if (response && response.userData) {
          setUserData(response.userData);
        }
      } catch (error) {
        // Gérer les erreurs qui surviennent lors de la vérification de l'authentification
        console.error(
          "Erreur lors de la vérification de l'authentification :",
          error
        );
        // Si une erreur survient, considérez à réinitialiser les données de l'utilisateur
        setUserData(null);
      }
    } else {
      // Si aucun jeton n'est trouvé, définir les données utilisateur sur null (l'utilisateur n'est pas authentifié)
      setUserData(null);
    }
  };

  const refreshUserData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await LoginServices.whoAmI(token);
        if (response && response.userData) {
          setUserData(response.userData); // Assure-toi de passer juste les données utilisateur
        } else {
          console.error(
            "Les données utilisateur ne sont pas dans la réponse attendue"
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur:",
          error
        );
      }
    }
  };

  // Utiliser le hook useEffect pour exécuter la vérification d'authentification lorsque le composant est monté
  useEffect(() => {
    checkAuthentication();
  }, []);

  // Fournir les données utilisateur et la fonction setUserData aux composants enfants via UserContext.Provider
  return (
    <UserContext.Provider value={{ userData, setUserData, refreshUserData }}>
      {children}
    </UserContext.Provider>
  );
};
