import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Remplacez par l'URL de base de votre API

const MessageService = {
  getAllMessages: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/messages`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des messages :', error);
      throw error;
    }
  },

  createMessage: async (senderId, receiverId, content) => {
    try {
      const response = await axios.post(`${BASE_URL}/messages`, {
        senderId,
        receiverId,
        content,
        timestamp: new Date(), // Vous pouvez aussi gérer le timestamp côté serveur
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du message :', error);
      throw error;
    }
  },

  getConversationBetweenTwoUsers: async (userOneId, userTwoId) => {
    try {
      const response = await axios.get(`${BASE_URL}/messages/conversation/${userOneId}/${userTwoId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la conversation :', error);
      throw error;
    }
  },

};

export default MessageService;
