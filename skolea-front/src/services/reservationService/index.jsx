import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Assurez-vous que cette URL est correcte

const searchTeachers = async (subject, city) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/professors/search`, {
      params: { subject, city }
    });
    return response.data; // Retourne les données reçues de l'API
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export default {
  searchTeachers,
};
