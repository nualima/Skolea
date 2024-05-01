import axios from "axios";

const BASE_URL = "http://localhost:8080/api/messages"; // Assurez-vous que l'URL de base est correcte

const MessageService = {
  getConversationsByUserId: async (userId) => {
    console.log("Fetching conversations for userID:", userId);
    return axios
      .get(`${BASE_URL}/user/${userId}`)
      .then((response) => {
        console.log("Data received:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
        throw error;
      });
  },
  getAllMessages: async () => {
    return axios.get(`${BASE_URL}/`).then((response) => response.data);
  },

  createMessage: async (senderId, receiverId, content) => {
    return axios
      .post(`${BASE_URL}/`, {
        senderId,
        receiverId,
        content,
        timestamp: new Date(),
      })
      .then((response) => response.data);
  },

  getConversationBetweenTwoUsers: async (userOneId, userTwoId) => {
    return axios
      .get(`${BASE_URL}/conversation/${userOneId}/${userTwoId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching conversation:", error);
        throw error;
      });
  },
};

export default MessageService;
