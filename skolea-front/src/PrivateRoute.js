import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context";
import NotFound from "./view/notFound/NotFound";

const PrivateRoute = ({ element, roles, ...rest }) => {
  const { userData } = useContext(UserContext);
  const userRole = userData && userData.role ? userData.role : null;

  if (!userRole || (roles && !roles.includes(userRole))) {
    // Rediriger vers la page de login si l'utilisateur n'est pas connecté ou n'a pas le bon rôle
    return <Navigate to="/NotFound" />;
  }

  return element;
};

export default PrivateRoute;
