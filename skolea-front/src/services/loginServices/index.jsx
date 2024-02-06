import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Remplacez par l'URL de votre backend

// Service LoginServices pour gérer les opérations de connexion
const LoginServices = {
  // Méthode pour effectuer la connexion
  login: async (username, password) => {
    try {
      // Envoyer une requête POST au backend pour authentifier l'utilisateur
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });

      // Extraire les données de la réponse
      const data = response.data;
      console.log(data);

      // Stocker le jeton (token) dans le stockage local (localStorage)
      localStorage.setItem('token', data.token);

      // Retourner les données de l'utilisateur authentifié
      return data;
    } catch (error) {
      // Gérer les erreurs en cas de problème de connexion
      console.error('Erreur lors de la connexion :', error);
      throw error;
    }
  },

  // Méthode pour obtenir les informations de l'utilisateur authentifié
  whoAmI: async (token) => {
    try {
      // Envoyer une requête POST au backend pour obtenir les informations de l'utilisateur
      const response = await axios.post(`${BASE_URL}/whoAmI`, {
        token,
      });

      // Extraire les données de la réponse
      const data = response.data;

      // Retourner les informations de l'utilisateur
      return data;
    } catch (error) {
      // Gérer les erreurs en cas de problème lors de la récupération des informations de l'utilisateur
      console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
      throw error;
    }
  },
};

export default LoginServices;
