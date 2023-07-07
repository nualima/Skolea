import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Remplacez par l'URL de votre backend

const LoginServices = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });

      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  whoAmI: async (token) => {
    try {
      const response = await axios.post(`${BASE_URL}/whoAmI`, {
        token,
      });

      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error during whoAmI:', error);
      throw error;
    }
  },
};

export default LoginServices;
