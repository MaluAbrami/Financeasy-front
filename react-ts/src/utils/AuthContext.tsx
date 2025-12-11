import { createContext, useEffect, useState, type ReactNode } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loading: true,
  login: () => {},
  logout: () => {},
});

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children } : Props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    // carregar login salvo
    useEffect(() => {
      const saved = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(saved);
      setLoading(false); // marca fim do carregamento
    }, []);

    function login() {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
    }

    function logout() {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, loading, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}