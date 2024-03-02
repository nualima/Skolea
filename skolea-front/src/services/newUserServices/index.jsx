import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Remplacez par l'URL de votre backend

// Fonction pour créer un nouvel utilisateur
const createUser = async (userData) => {
  try {
    // Envoyer une requête POST au backend pour créer un nouvel utilisateur
    const response = await axios.post(`${BASE_URL}/api/users/signup`, userData);

    // Retourner les données de la réponse (par exemple, un message de succès)
    return response.data;
  } catch (error) {
    // Gérer les erreurs en cas de problème lors de la création de l'utilisateur
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    throw error; // Propager l'erreur pour la gestion ultérieure
  }
};

export { createUser };
