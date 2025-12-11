import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if(loading) {
    return <div>Carregando...</div>;
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
}