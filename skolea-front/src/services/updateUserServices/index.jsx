// updateUserServices.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const updateUserServices = {
  updateUser: async (userId, userDetails, token) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/users/updateUser/${userId}`, userDetails, {
        headers: {
          Authorization: `Bearer ${token}`, // Assurer que le token est envoyé pour l'authentification
        },
      });

      // Extraire les données de la réponse
      const data = response.data;

      // Retourner les données mises à jour de l'utilisateur
      return data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil utilisateur :', error);
      throw error;
    }
  },
};

export default updateUserServices;
