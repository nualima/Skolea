import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n';


import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </UserProvider>
);

reportWebVitals();
