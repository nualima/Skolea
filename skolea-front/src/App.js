import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider, UserContext } from "./context";

import DefaultNavBar from "./components/navBar/DefaultNavBar";
import MainPage from "./view/MainPage";
import NewUserForm from "./view/NewUserForm";
import ProfilComponent from "./view/ProfilComponent";
import Reservation from "./view/reservation/Reservation";
import SearchResults from "./view/reservation/SearchResults";
import LoginPage from "./view/login/LoginPage";
import Availability from "./view/availability/Availability";
import ListUsers from "./view/listUsers/ListUsers";
import NotFound from "./view/notFound/NotFound";
import ThemeApp from "./components/theme/ThemeApp";
import ChatPage from "./view/chat/chatPage/ChatPage";
import ContactForm from "./view/contact/ContactForm";
import ConversationsPage from "./view/chat/listConversationPage/ConversationsPage";
import PrivateRoute from "./PrivateRoute"; // Assure-toi que ce chemin est correct

function App() {
  const { userData } = useContext(UserContext);
  const userRole = userData && userData.role ? userData.role : null;

  return (
    <UserProvider>
      <Router>
        <DefaultNavBar />
        <ThemeApp />
        <div>
          <Routes>
            <Route path="/home" element={<MainPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/profil" element={<ProfilComponent />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/signUp" element={<NewUserForm />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Routes protégées */}
            <Route
              path="/availability"
              element={<PrivateRoute element={<Availability />} roles={["teacher", "admin"]} />}
            />
            <Route
              path="/reservation"
              element={<PrivateRoute element={<Reservation />} roles={["student", "admin"]} />}
            />
            <Route
              path="/reservation/search"
              element={<PrivateRoute element={<SearchResults />} roles={["student", "admin"]} />}
            />
            <Route
              path="/users"
              element={<PrivateRoute element={<ListUsers />} roles={["admin"]} />}
            />
            <Route
              path="/conversationPage"
              element={<PrivateRoute element={<ConversationsPage />} roles={["admin", "teacher", "student"]} />}
            />
            <Route
              path="/conversation/:userOneId/:otherUserId"
              element={<PrivateRoute element={<ChatPage />} roles={["admin", "teacher", "student"]} />}
            />

            {/* Route par défaut */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
