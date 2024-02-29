import axios from 'axios';

const BASE_URL = 'http://localhost:8080';


const LoginServices = {
  login: async (email, password) => {
    try {
      // Envoyer une requête POST au backend pour authentifier l'utilisateur
      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
        password,
      });

      // Extraire les données de la réponse
      const data = response.data;
      console.log(data + "/service/index.jsx l.17");

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
      // Envoyer une requête GET au backend avec le token dans les headers
      const response = await axios.get(`${BASE_URL}/api/users/whoAmI`, {
        headers: {
          Authorization: `Bearer ${token}`, // Utilisation du token dans le header d'autorisation
        },
      });
  
      // Extraire les données de la réponse
      const data = response.data;
  
      // Retourner les informations de l'utilisateur
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
      throw error;
    }
  },
};

export default LoginServices;
