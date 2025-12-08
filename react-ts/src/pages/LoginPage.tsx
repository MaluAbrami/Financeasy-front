import React, { useState } from "react";
import { MainLayout } from "../layout/MainLayout";
import { Card } from "../components/Card/Card";
import { Button } from "../components/Button/Button";
import { userApi } from "../api/userApi";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        try {
        const response = await userApi.login({ email, password })

        const token = response.data;

        localStorage.setItem("authToken", token);

        alert("Login realizado com sucesso!");
        } catch (error) {
        alert("Credenciais inválidas ou erro no login.");
        }
    }

    return (
        <MainLayout>
            <h1>Login</h1>

            <Card>
                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                    <label>Email</label><br />
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: "8px", width: "100%" }}
                    required
                    />
                </div>

                <div>
                    <label>Senha</label><br />
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: "8px", width: "100%" }}
                    required
                    />
                </div>

                <Button label="Entrar" type="submit" />
                </form>
            </Card>
        </MainLayout>
  );
}