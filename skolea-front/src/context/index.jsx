// Importer les modules et dépendances nécessaires
import { useEffect, useState } from "react";
import { createContext } from 'react';
import LoginServices from "../services/loginServices";

// Créer un contexte (UserContext) pour gérer les données utilisateur
export const UserContext = createContext();

// Créer un composant UserProvider pour gérer les données utilisateur et l'état d'authentification
export const UserProvider = ({ children }) => {
  // Initialiser une variable d'état pour stocker les données utilisateur
  const [userData, setUserData] = useState(null);

  // Fonction pour vérifier si l'utilisateur est authentifié
  const checkAuthentication = async () => {
    // Récupérer le jeton d'authentification depuis le stockage local (localStorage)
    const token = localStorage.getItem('token');

    // Si un jeton est trouvé, tenter de le vérifier en effectuant une requête au serveur
    if (token) {
      try {
        // Appeler une fonction de service pour vérifier le jeton et récupérer les données utilisateur
        const response = await LoginServices.whoAmI(token);

        // Extraire les données utilisateur de la réponse et mettre à jour l'état
        const userData = response.userData;
        setUserData(userData);
      } catch (error) {
        // Gérer les erreurs qui surviennent lors de la vérification de l'authentification
        console.error('Erreur lors de la vérification de l\'authentification :', error);
      }
    } else {
      // Si aucun jeton n'est trouvé, définir les données utilisateur sur null (l'utilisateur n'est pas authentifié)
      setUserData(null);
    }
  };

  // Utiliser le hook useEffect pour exécuter la vérification d'authentification lorsque le composant est monté
  useEffect(() => {
    checkAuthentication();
  }, []);

  // Fournir les données utilisateur aux composants enfants via UserContext.Provider
  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
  );
};
