import { useContext, type ReactNode } from "react";
import { Link } from "react-router-dom";
import "./MainLayout.module.css"
import { AuthContext } from "../utils/AuthContext";
import { Button } from "../components/Button/Button";
import { User } from "lucide-react";
import { TableActionButton } from "../components/Table/TableActionButton";

type Props = {
    children : ReactNode;
}

export function MainLayout({ children }: Props) {
    const { isLoggedIn, logout } = useContext(AuthContext);

    return (
        <div className="body">
            <header>
                <h3>Financeasy</h3>

            <ul>
                {/* <li>
                    { isLoggedIn && <Link to={"/home"}>Início</Link> }
                </li>
                <li>
                    { isLoggedIn && <Link to={"/entries"}>Lançamentos</Link> }
                </li> */}
                <li>
                    { !isLoggedIn && <Link to={"/login"}>Entrar</Link> }
                </li>
                <li>
                    { isLoggedIn && <Link to={"/user"}><TableActionButton icon={<User size={24} />}></TableActionButton></Link> }
                </li>
            </ul>

            </header>

            <main>{children}</main>
        </div>
    );
}