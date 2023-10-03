import { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext, UserProvider } from './context';

import DefaultNavBar from "./components/navBar/DefaultNavBar"

import MainPage from './view/MainPage';
import NewUserForm from './view/NewUserForm';
import ProfileComponent from './view/ProfileComponent';
import Reservation from './view/reservation/Reservation'
import LoginPage from './view/login/LoginPage';
import ContactForm from './view/contact/ContactForm';

import Subject from './view/Subject';
import Availability from './view/availability/Availability';
import ListUsers from './view/listUsers/ListUsers';
import NotFound from './view/notFound/NotFound';
import ThemeApp from './components/theme/ThemeApp';

import LoginServices from './services/loginServices';

function App() {

  const { userData } = useContext(UserContext); 
  const userStatue = userData && userData.statue ? userData.statue : null;


  

  return (
    <Router>
      <UserProvider>


        <DefaultNavBar />
        <ThemeApp />
        <div>
          <Routes>
    
            <Route path="/home" element={<MainPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/profile" element={<ProfileComponent />} />
            {userStatue === 'student' && (
            <Route path="/reservation" element={<Reservation />} />

            )}
            {userStatue === 'teacher' && (
              <Route path="/availability" element={<Availability />} />
            )}
            {userStatue === 'admin' && (
              <Route path="/users" element={<ListUsers />} />
            )}
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/signUp" element={<NewUserForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/subject" element={<Subject />} />
            <Route path="*" element={<NotFound />} />


          </Routes>
        </div>
      </UserProvider>

    </Router>
  );
}

export default App;
