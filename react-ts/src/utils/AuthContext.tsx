import { createContext, useEffect, useState, type ReactNode } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
}); 

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children } : Props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // carregar login salvo
    useEffect(() => {
        const saved = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(saved);
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
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
}