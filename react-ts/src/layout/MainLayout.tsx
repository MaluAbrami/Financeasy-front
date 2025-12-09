import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./MainLayout.module.css"

type Props = {
    children : ReactNode;
}

export function MainLayout({ children }: Props) {
    return (
        <div className="body">
            <header
                style={{
                height: "60px",
                backgroundColor: "#2D2E32",
                color: "white",
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                fontSize: "18px",
                fontWeight: "bold",
                }}
            >
                <h1>Financeasy</h1>

            <ul>
                <li>
                    <Link to={"/"}>Início</Link>
                </li>
                <li>
                    <Link to={"/entries"}>Lançamentos</Link>
                </li>
                <li>
                    <Link to={"/login"}>Entrar</Link>
                </li>
            </ul>

            </header>

            <main style={{ flex: 1, padding: "20px" }}>{children}</main>
        </div>
    );
}