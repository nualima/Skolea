// Dans votre fichier UserContext.js
import { useEffect, useState } from "react";
import { createContext } from 'react';
import LoginServices from "../services/loginServices";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const checkAuthentication = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        
        const response = await LoginServices.whoAmI(token);
        const userData = response.userData;
        setUserData(userData);
      

      } catch (error) {
        console.error('Error during authentication check:', error);
      }
    } else {
      setUserData(null);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
  );
};
