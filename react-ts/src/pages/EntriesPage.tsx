import { MainLayout } from "../layout/MainLayout";
import { Card } from "../components/Card/Card";
import { Button } from "../components/Button/Button";
import { Table } from "../components/Table/Table";
import { Link } from "react-router-dom";

export function EntriesPage() {
    const mockEntries = [
    { date: "2025-02-08", description: "Salário", type: "Entrada", amount: "R$ 5.000,00" },
    { date: "2025-02-10", description: "Mercado", type: "Saída", amount: "R$ 320,00" },
    { date: "2025-02-11", description: "Transporte", type: "Saída", amount: "R$ 45,00" }
    ];

    const columns = [
    { label: "Data", key: "date" },
    { label: "Descrição", key: "description" },
    { label: "Tipo", key: "type" },
    { label: "Valor", key: "amount" },
    ];

    return (
        <MainLayout>
            <h1>Lançamentos</h1>

            <Card>
                <Table columns={columns} data={mockEntries}></Table>
            </Card>

            <Link to={"/entries/new"}>
                <Button label="Novo lançamento"/>
            </Link>
        </MainLayout>
    );
}