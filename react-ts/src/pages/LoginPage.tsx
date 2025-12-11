import React, { useContext, useState } from "react";
import { MainLayout } from "../layout/MainLayout";
import { Button } from "../components/Button/Button";
import { userApi } from "../api/userApi";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await userApi.login({ email, password });

      const token = response.data;

      localStorage.setItem("authToken", token);
      login();

      navigate("/home");
    } catch (error) {
      alert("Credenciais inválidas ou erro no login.");
    }
  }

  return (
    <MainLayout>
      <div className={styles.principalContainer}>
        <div className={styles.loginCard}>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <div>
              <label>Email</label>
              <br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Senha</label>
              <br />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Button label="Entrar" type="submit" />
            </div>
            <Link to={"/register"}>Não possui uma conta? Cadastre-se</Link>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
