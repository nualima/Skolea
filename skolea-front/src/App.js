import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
 import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from './view/MainPage';
import NewUserForm from './view/NewUserForm';
import ProfileComponent from './view/ProfileComponent';
import Reservation from './view/Reservation';
import LoginPage from './view/login/LoginPage';

import Subject from './view/Subject';


function App() {
  return (
    <>
      <div>
        <Router>

          <Routes>

            <Route path="/profilePage" element={<ProfileComponent />} />
            <Route path="/mainPage" element={<MainPage />} />
            <Route path="/loginPage" element={<LoginPage />} />
            <Route path="reservation" element={<Reservation />} />
            <Route path="/newUserForm" element={<NewUserForm />} />
            <Route path="/subject" element={<Subject />} />
            <Route path="/home/reservation" component={Reservation} />
            <Route path="*" element={<Navigate to="/mainPage" />} />

          </Routes>
          
        </Router>
      </div>
    </>
  );
}

export default App;
