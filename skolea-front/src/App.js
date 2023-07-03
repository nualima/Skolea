import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
 import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar';
import ExampleNavbar from './components/ExempleNavbar';
import NavBarTest from "./components/NavBarTest"

import MainPage from './view/MainPage';
import NewUserForm from './view/NewUserForm';
import ProfileComponent from './view/ProfileComponent';
import Reservation from './view/reservation/Reservation';
import LoginPage from './view/login/LoginPage';
import ContactForm from './view/contact/ContactForm';

import Subject from './view/Subject';
import ThemeApp from './components/theme/ThemeApp';


function App() {
  return (
    <>
    <NavBarTest />
    <ThemeApp />
    
      <div>
        <Router>

          <Routes>

          <Route path="/" element={<MainPage />} />
            <Route path="/profilePage" element={<ProfileComponent />} />
            <Route path="/loginPage" element={<LoginPage />} />
            <Route path="reservation" element={<Reservation />} />
            <Route path="/newUserForm" element={<NewUserForm />} />
            <Route path="/subject" element={<Subject />} />
            <Route path="/contact" element={<ContactForm />} />

            

            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
          
        </Router>
      </div>
    </>
  );
}

export default App;
