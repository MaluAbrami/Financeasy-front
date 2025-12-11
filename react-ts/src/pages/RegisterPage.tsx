import React, { useState } from "react";
import { MainLayout } from "../layout/MainLayout";
import { Button } from "../components/Button/Button";
import { userApi } from "../api/userApi";
import styles from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginButton } from "../components/Button/LoginButton";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await userApi.register({ email, password });

      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      alert("Ocorreu um erro.");
    }
  }

  return (
    <div className={styles.principalContainer}>
      <div className={styles.loginCard}>
        <h1>Cadastrar</h1>
        <form onSubmit={handleRegister}>
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
          <div className={styles.containerButton}>
            <LoginButton label="Enviar" type="submit" />
          </div>
          <Link to={"/login"}>Já possui uma conta? Entre agora</Link>
        </form>
      </div>
    </div>
  );
}
