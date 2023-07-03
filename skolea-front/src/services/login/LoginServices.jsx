import React from 'react';

const LoginServices = () => {

  async function login(username, password) {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    return data;
  }

  async function whoAmI(token) {
    const response = await fetch('http://localhost:8080/whoAmI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });

    const data = await response.json();
    return data;
  }

  return {
    login,
    whoAmI
  };
};

export default LoginServices;
