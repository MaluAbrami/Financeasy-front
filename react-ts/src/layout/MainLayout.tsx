import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./MainLayout.module.css"

type Props = {
    children : ReactNode;
}

export function MainLayout({ children }: Props) {
    return (
        <div className="body">
            <header>
                <h3>Financeasy</h3>

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

            <main>{children}</main>
        </div>
    );
}