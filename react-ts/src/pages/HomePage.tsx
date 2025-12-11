import { MainLayout } from "../layout/MainLayout";
import { Button } from "../components/Button/Button";
import { Card } from "../components/Card/Card";
import { Link } from "react-router-dom";

export function HomePage() {
    return (
        <MainLayout>
            <h1>Dashboard Financeiro</h1>
            <p>Bem-vindo(a) ao seu controle financeiro pessoal!</p>

            <Card>
                <h2>Resumo do mês</h2>
                <p>Entradas: R$ 0,00</p>
                <p>Saídas: R$ 0,00</p>
                <p>Saldo: R$ 0,00</p>
            </Card>            

            <br />

            <Link to={"/entries"}>
                <Button label="Ver lançamentos"></Button>
            </Link>
            
        </MainLayout>
    );
}