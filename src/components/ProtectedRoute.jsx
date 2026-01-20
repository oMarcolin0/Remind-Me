// components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuth = Boolean(localStorage.getItem("token")); // exemplo simples
  const location = useLocation();

  if (!isAuth) {
    // redireciona para login e guarda a rota requisitada
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
