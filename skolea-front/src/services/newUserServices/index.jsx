import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; 

const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export { createUser };